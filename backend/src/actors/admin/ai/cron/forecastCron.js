const cron = require("node-cron");
const { runForecast } = require("../forecastService");

(async () => {
    console.log("🚀 Run forecast on startup...");
    await runForecast();
})();

cron.schedule("0 */2 * * *", async () => {
    console.log("⏰ Running AI forecast...");
    await runForecast();

});