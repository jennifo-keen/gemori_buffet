import json
import random

dataset = []

# ===== TEMPLATE TEXT =====
revenue_today = [
    "doanh thu hôm nay",
    "hôm nay bán được bao nhiêu",
    "hôm nay kiếm được bao nhiêu tiền",
    "tổng tiền hôm nay là bao nhiêu",
    "hôm nay thu được bao nhiêu"
]

revenue_yesterday = [
    "doanh thu hôm qua",
    "hôm qua bán được bao nhiêu",
    "hôm qua kiếm được bao nhiêu tiền"
]

revenue_month = [
    "doanh thu tháng này",
    "tháng này kiếm được bao nhiêu",
    "tháng này bán được bao nhiêu tiền"
]

revenue_year = [
    "doanh thu năm nay",
    "năm nay kiếm được bao nhiêu",
]

order_today = [
    "hôm nay có bao nhiêu đơn",
    "bao nhiêu đơn hôm nay",
    "số lượng đơn hôm nay"
]

top_dish = [
    "top món bán chạy",
    "món bán chạy nhất",
    "top {n} món hôm nay",
]

low_dish = [
    "món bán ít",
    "món nào bán ít nhất",
]

inventory = [
    "món sắp hết",
    "tồn kho thấp",
    "cảnh báo tồn kho"
]

compare_day = [
    "so sánh hôm nay và hôm qua",
    "hôm nay tăng hay giảm so với hôm qua"
]

compare_month = [
    "so sánh tháng này và tháng trước",
    "tháng này tăng hay giảm so với tháng trước"
]

compare_year = [
    "so sánh năm nay và năm trước"
]

range_query = [
    "doanh thu từ {d1} đến {d2}",
    "tính doanh thu từ ngày {d1} đến ngày {d2}"
]

# ===== SQL TEMPLATE =====

SQL = {
    "revenue_today": "SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE DATE(paid_at)=CURRENT_DATE",
    "revenue_yesterday": "SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE DATE(paid_at)=CURRENT_DATE - INTERVAL '1 day'",
    "revenue_month": "SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE DATE_TRUNC('month', paid_at)=DATE_TRUNC('month', CURRENT_DATE)",
    "revenue_year": "SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE DATE_TRUNC('year', paid_at)=DATE_TRUNC('year', CURRENT_DATE)",

    "order_today": "SELECT COUNT(*) as total FROM orders WHERE DATE(order_time)=CURRENT_DATE",

    "top_dish": "SELECT m.name, SUM(oi.quantity) as total FROM order_items oi JOIN menus m ON oi.menu_id=m.id WHERE DATE(oi.item_order_time)=CURRENT_DATE GROUP BY m.name ORDER BY total DESC LIMIT 5",

    "low_dish": "SELECT m.name, SUM(oi.quantity) as total FROM order_items oi JOIN menus m ON oi.menu_id=m.id WHERE DATE(oi.item_order_time)=CURRENT_DATE GROUP BY m.name ORDER BY total ASC LIMIT 5",

    "inventory": "SELECT m.name, i.stock_quantity FROM inventory i JOIN menus m ON i.menu_id=m.id WHERE i.stock_quantity <= i.min_quantity",

    "compare_day": """SELECT 
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE(paid_at)=CURRENT_DATE) as today,
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE(paid_at)=CURRENT_DATE - INTERVAL '1 day') as yesterday""",

    "compare_month": """SELECT 
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('month', paid_at)=DATE_TRUNC('month', CURRENT_DATE)) as current,
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('month', paid_at)=DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')) as previous""",

    "compare_year": """SELECT 
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('year', paid_at)=DATE_TRUNC('year', CURRENT_DATE)) as current,
    (SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('year', paid_at)=DATE_TRUNC('year', CURRENT_DATE - INTERVAL '1 year')) as previous""",

    "range": "SELECT COALESCE(SUM(amount),0) as total FROM payments WHERE DATE(paid_at) BETWEEN '{d1}' AND '{d2}'"
}

# ===== GENERATE =====

def random_date():
    d = random.randint(1, 28)
    m = random.randint(1, 12)
    y = 2026
    return f"{d:02d}/{m:02d}/{y}"

# simple intents
for text in revenue_today:
    dataset.append({"text": text, "sql": SQL["revenue_today"]})

for text in revenue_yesterday:
    dataset.append({"text": text, "sql": SQL["revenue_yesterday"]})

for text in revenue_month:
    dataset.append({"text": text, "sql": SQL["revenue_month"]})

for text in revenue_year:
    dataset.append({"text": text, "sql": SQL["revenue_year"]})

for text in order_today:
    dataset.append({"text": text, "sql": SQL["order_today"]})

for text in low_dish:
    dataset.append({"text": text, "sql": SQL["low_dish"]})

for text in inventory:
    dataset.append({"text": text, "sql": SQL["inventory"]})

for text in compare_day:
    dataset.append({"text": text, "sql": SQL["compare_day"]})

for text in compare_month:
    dataset.append({"text": text, "sql": SQL["compare_month"]})

for text in compare_year:
    dataset.append({"text": text, "sql": SQL["compare_year"]})

# 🔥 generate dynamic top N
for i in range(1, 50):
    n = random.randint(1, 10)
    text = random.choice(top_dish).replace("{n}", str(n))
    sql = SQL["top_dish"].replace("LIMIT 5", f"LIMIT {n}")
    dataset.append({"text": text, "sql": sql})

# 🔥 generate date range
for i in range(200):
    d1 = random_date()
    d2 = random_date()
    text = random.choice(range_query).format(d1=d1, d2=d2)
    sql = SQL["range"].format(d1=d1, d2=d2)
    dataset.append({"text": text, "sql": sql})

# ===== SAVE =====
with open("semantic_dataset.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, ensure_ascii=False, indent=2)

print(f"✅ Generated {len(dataset)} samples")