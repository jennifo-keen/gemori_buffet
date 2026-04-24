const { pool } = require("../../../config/db");

const getAllTickets = async () => {
    const query = `
        SELECT t.*, 
            COALESCE(json_agg(json_build_object('id', m.id, 'name', m.name)) FILTER (WHERE m.id IS NOT NULL), '[]') as menus
        FROM public.buffet_tickets t
        LEFT JOIN public.buffet_ticket_menus btm ON t.id = btm.buffet_ticket_id
        LEFT JOIN public.menus m ON btm.menu_id = m.id
        GROUP BY t.id
        ORDER BY t.id DESC;
    `;
    const { rows } = await pool.query(query);
    return rows;
};

const updateStatus = async (id, isActive) => {
    const query = 'UPDATE public.buffet_tickets SET is_active = $1 WHERE id = $2 RETURNING *';
    const { rows } = await pool.query(query, [isActive, id]);
    return rows[0];
};

const createTicket = async (ticketData) => {
    const { name, price, description, image_url } = ticketData;

    // Câu lệnh SQL INSERT
    const query = `
        INSERT INTO public.buffet_tickets (name, price, description, image_url, is_active)
        VALUES ($1, $2, $3, $4, true)
        RETURNING *;
    `;

    // Ép kiểu price sang Number để DB không báo lỗi kiểu dữ liệu
    const values = [name, Number(price), description, image_url];
    const { rows } = await pool.query(query, values);

    return rows[0];
};

const updateTicket = async (id, ticketData) => {
    const { name, price, description, image_url, menu_ids } = ticketData;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // 1. Update thông tin vé chính
        const updateTicketQuery = `
    UPDATE public.buffet_tickets 
    SET 
       name = COALESCE(NULLIF($1, ''), name),
price = COALESCE($2, price),
description = COALESCE(NULLIF($3, ''), description),
image_url = COALESCE($4, image_url)
    WHERE id = $5
    RETURNING *;
`;
        const ticketRes = await client.query(updateTicketQuery, [
            name ?? null,
            price ? Number(price) : null,
            description ?? null,
            image_url ?? null,
            id
        ]);

        // 2. Xử lý bảng trung gian: Xóa cũ - Thêm mới
        if (Array.isArray(menu_ids)) {

            if (menu_ids.length > 0) {
                await client.query(
                    'DELETE FROM public.buffet_ticket_menus WHERE buffet_ticket_id = $1',
                    [id]
                );

                await client.query(`
            INSERT INTO public.buffet_ticket_menus (buffet_ticket_id, menu_id)
            SELECT $1, unnest($2::uuid[])
        `, [id, menu_ids]);

            } else {
                // ❌ KHÔNG DELETE nếu không có menu mới
                console.log("⚠️ Skip update menus vì rỗng");
            }
        }


        await client.query('COMMIT');
        return ticketRes.rows[0];
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

const deleteTicket = async (id) => {
    const query = 'DELETE FROM public.buffet_tickets WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Trả về ticket vừa xóa để xác nhận
};

module.exports = {
    getAllTickets,
    updateStatus,
    updateTicket,
    createTicket,
    deleteTicket
};