const { spawn } = require("child_process");
const { pool } = require("../../../config/db");
const path = require("path");

const runForecast = async () => {
    console.log("🚀 Bắt đầu chạy dự đoán...");

    // 1. Lấy data 30 ngày gần nhất
    const result = await pool.query(`
        SELECT menu_id, quantity, item_order_time
        FROM order_items
        WHERE item_order_time >= NOW() - INTERVAL '30 days'
    `);

    const data = result.rows;

    return new Promise((resolve, reject) => {
        // Fix đường dẫn: forecastService.js cùng folder với forecast.py
        const pyPath = path.join(__dirname, "../ai/ai/forecast.py");

        // Gọi Python bằng lệnh 'py' (Windows)
        const py = spawn("python3", [pyPath, JSON.stringify(data)]);

        let output = "";
        let errorOutput = "";

        py.stdout.on("data", (chunk) => {
            output += chunk.toString();
        });

        py.stderr.on("data", (chunk) => {
            errorOutput += chunk.toString();
        });

        py.on("close", async (code) => {
            if (code !== 0) {
                console.error("❌ Python Error Exit Code:", code, errorOutput);
                return reject(new Error("Python script failed"));
            }

            let predictions;
            try {
                // Làm sạch output (xóa khoảng trắng thừa)
                const cleanOutput = output.trim();
                if (!cleanOutput) {
                    console.error("❌ Python không trả về dữ liệu");
                    return resolve([]); // Trả về mảng rỗng để không lỗi vòng lặp
                }
                predictions = JSON.parse(cleanOutput);
            } catch (e) {
                console.error("❌ JSON parse lỗi. Output thực tế:", output);
                return reject(e);
            }

            // --- FIX LỖI "NOT ITERABLE" ---
            if (Array.isArray(predictions) && predictions.length > 0) {
                for (let item of predictions) {
                    try {
                        await pool.query(`
                            INSERT INTO forecast_results(menu_id, forecast_date, predicted_quantity, predicted_percent)
                            VALUES ($1, $2, $3, $4)
                            ON CONFLICT (menu_id, forecast_date)
                            DO UPDATE SET
                                predicted_quantity = EXCLUDED.predicted_quantity,
                                predicted_percent = EXCLUDED.predicted_percent
                        `, [
                            item.menu_id,
                            item.forecast_date,
                            item.predicted_quantity,
                            item.predicted_percent
                        ]);
                    } catch (dbErr) {
                        console.error("❌ Lỗi lưu DB cho món:", item.menu_id, dbErr.message);
                    }
                }
                console.log(`✅ Đã cập nhật ${predictions.length} dự đoán vào DB.`);
            } else {
                console.log("⚠️ Không có dự đoán nào được tạo ra.");
            }

            resolve(predictions);
        });

        py.on("error", (err) => {
            console.error("❌ Không thể chạy file Python:", err.message);
            reject(err);
        });
    });
};

module.exports = { runForecast };