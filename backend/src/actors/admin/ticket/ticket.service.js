const { pool } = require("../../../config/db");

const getAllTickets = async () => {
    const query = 'SELECT * FROM public.buffet_tickets ORDER BY code ASC';
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
const deleteTicket = async (id) => {
    const query = 'DELETE FROM public.buffet_tickets WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0]; // Trả về ticket vừa xóa để xác nhận
};

module.exports = {
    getAllTickets,
    updateStatus,
    createTicket,
    deleteTicket
};