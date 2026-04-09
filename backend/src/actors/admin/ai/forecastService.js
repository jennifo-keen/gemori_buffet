const { spawn } = require("child_process");
const { pool } = require("../../../config/db");
const path = require("path");


const runForecast = async () => {
    // 1. lấy data gần 30 ngày (🔥 tối ưu)
    const result = await pool.query(`
    SELECT menu_id, quantity, item_order_time
    FROM order_items
    WHERE item_order_time >= NOW() - INTERVAL '30 days'
  `);

    const data = result.rows;

    return new Promise((resolve, reject) => {
        // forecastService.js đang ở backend/src/actors/admin/ai/
        const pyPath = path.resolve(__dirname, "ai", "forecast.py");

            //Chưa host thì dùng py, nếu host thì đổi lại mở cmt cái dưới
        const py = spawn("py", [pyPath, JSON.stringify(data)]);
        // const py = spawn("python3", [pyPath, JSON.stringify(data)]);

        let output = "";

        py.stdout.on("data", (data) => {
            output += data.toString();
        });

        py.stderr.on("data", (err) => {
            console.error("Python error:", err.toString());
        });

        py.on("close", async () => {
            if (!output || output.trim() === "") {
                console.error("❌ Python không trả dữ liệu");
                return reject(new Error("No output from Python"));
            }

            let predictions;
            try {
                predictions = JSON.parse(output);
            } catch (e) {
                console.error("❌ JSON parse lỗi, output nhận được:", output);
                return reject(e);
            }


            for (let item of predictions) {
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
            }

            resolve(predictions);
        });

        py.on("error", reject);
    });
};

module.exports = { runForecast };