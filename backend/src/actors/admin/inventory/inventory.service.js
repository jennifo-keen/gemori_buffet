const { pool } = require("../../../config/db"); // Giả định bạn dùng pg pool

const getInventory = async (filter) => {
    let whereClause = "";

    // Check filter để tránh lỗi SQL Injection và xử lý "Tất cả"
    if (filter === "Hết hàng") {
        whereClause = "WHERE i.stock_quantity = 0";
    } else if (filter === "Sắp hết") {
        whereClause = "WHERE i.stock_quantity <= i.min_quantity AND i.stock_quantity > 0";
    } else if (filter === "Còn hàng") {
        whereClause = "WHERE i.stock_quantity > i.min_quantity";
    }

    const query = `
        SELECT 
            i.*, 
            m.name as menu_name, 
            m.category as type,
            CASE 
                WHEN i.stock_quantity = 0 THEN 'error'
                WHEN i.stock_quantity <= i.min_quantity THEN 'warning'
                ELSE 'neutral'
            END as status_type
        FROM public.inventory i
        JOIN public.menus m ON i.menu_id = m.id
        ${whereClause}
        ORDER BY i.updated_at DESC
    `;

    const result = await pool.query(query);
    return result.rows;
};

const getInventoryStats = async () => {
    const query = `
        SELECT 
            COUNT(*) FILTER (WHERE stock_quantity = 0)::INT as out_of_stock,
            COUNT(*) FILTER (WHERE stock_quantity <= min_quantity AND stock_quantity > 0)::INT as low_stock
        FROM public.inventory
    `;
    const result = await pool.query(query);
    return result.rows[0];
};

const updateStock = async (id, changeAmount, type) => {
    // type là 'import' thì cộng, 'export' thì trừ
    const adjustment = type === 'import' ? changeAmount : -changeAmount;

    const query = `
        UPDATE public.inventory 
        SET 
            stock_quantity = stock_quantity + $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 
        RETURNING *;
    `;

    const result = await pool.query(query, [adjustment, id]);
    return result.rows[0];
};

const updateMinQuantity = async (id, minQuantity) => {
    const query = `
        UPDATE public.inventory 
        SET 
            min_quantity = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 
        RETURNING *;
    `;
    const result = await pool.query(query, [minQuantity, id]);
    return result.rows[0];
};

module.exports = { getInventory, getInventoryStats, updateStock, updateMinQuantity };