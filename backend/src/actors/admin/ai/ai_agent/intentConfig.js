module.exports = {
    revenue_today: {
        query: "revenue_today",
        type: "single",
        template: "💰 Hôm nay: {total} VND"
    },

    revenue_yesterday: {
        query: "revenue_yesterday",
        type: "single",
        template: "💰 Hôm qua: {total} VND"
    },

    revenue_month: {
        query: "revenue_month",
        type: "single",
        template: "📅 Tháng này: {total} VND"
    },

    order_count: {
        query: "order_count",
        type: "single",
        template: "📦 Có {total} đơn"
    },

    top_dish: {
        query: "top_dish",
        type: "list",
        template: "🔥 Top món: {list}"
    },

    low_dish: {
        query: "low_dish",
        type: "list",
        template: "⚠️ Món bán ít: {list}"
    },

    forecast: {
        query: "forecast",
        type: "list",
        template: "📈 Nên chuẩn bị: {list}"
    },

    inventory_low: {
        query: "inventory_low",
        type: "list",
        template: "⚠️ Sắp hết: {list}"
    }
};