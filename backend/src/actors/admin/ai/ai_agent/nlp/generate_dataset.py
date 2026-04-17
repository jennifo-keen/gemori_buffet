import json
import random

dataset = []

# ===== HELPER =====
def add(intent_list, sql):
    for t in intent_list:
        dataset.append({"text": t, "sql": sql})

def random_date():
    d = random.randint(1, 28)
    m = random.randint(1, 12)
    y = 2026
    return f"{y}-{m:02d}-{d:02d}"

# ===== INTENTS =====

# 1. REVENUE TODAY
revenue_today = [
    "doanh thu hôm nay", "hôm nay bán được bao nhiêu", "hôm nay kiếm được bao nhiêu tiền",
    "tổng tiền hôm nay là bao nhiêu", "hôm nay thu được bao nhiêu", "tiền hôm nay bao nhiêu",
    "hôm nay doanh thu sao", "hôm nay có lời không", "tổng thu hôm nay",
    "hôm nay bán ổn không", "thu nhập hôm nay", "doanh số hôm nay",
    "check doanh thu hôm nay", "hôm nay kiếm được nhiêu", "hôm nay có bao nhiêu tiền",
    "tổng doanh số hôm nay", "doanh thu hiện tại hôm nay", "hôm nay lời bao nhiêu",
    "xem doanh thu hôm nay", "tình hình hôm nay thế nào"
]

# 2. REVENUE YESTERDAY
revenue_yesterday = [
    "doanh thu hôm qua", "hôm qua bán được bao nhiêu", "hôm qua kiếm được bao nhiêu tiền",
    "hôm qua thu bao nhiêu", "tổng tiền hôm qua", "doanh số hôm qua",
    "hôm qua lời bao nhiêu", "check hôm qua thu được bao nhiêu",
    "doanh thu ngày hôm qua", "hôm qua bán ổn không",
    "hôm qua kiếm ổn không", "thu nhập hôm qua", "tiền hôm qua bao nhiêu",
    "tổng thu hôm qua", "hôm qua có bao nhiêu tiền",
    "xem doanh thu hôm qua", "hôm qua làm ăn sao",
    "hôm qua thu được nhiêu", "hôm qua doanh thu bao nhiêu", "hôm qua ổn không"
]

# 3. REVENUE MONTH
revenue_month = [
    "doanh thu tháng này", "tháng này kiếm được bao nhiêu",
    "tháng này bán được bao nhiêu tiền", "tổng thu tháng này",
    "doanh số tháng này", "tháng này lời bao nhiêu",
    "tháng này thu bao nhiêu", "check doanh thu tháng này",
    "tháng này làm ăn sao", "tháng này có lời không",
    "tổng tiền tháng này", "thu nhập tháng này",
    "tháng này kiếm ổn không", "xem doanh thu tháng này",
    "doanh thu hiện tại tháng", "tháng này bán ổn không",
    "tháng này thu nhiêu tiền", "tháng này lời lỗ sao",
    "tháng này kiếm được nhiêu", "tình hình tháng này"
]

# 4. REVENUE YEAR
revenue_year = [
    "doanh thu năm nay", "năm nay kiếm được bao nhiêu",
    "tổng thu năm nay", "doanh số năm nay",
    "năm nay lời bao nhiêu", "năm nay thu bao nhiêu",
    "check doanh thu năm nay", "năm nay làm ăn sao",
    "năm nay có lời không", "tổng tiền năm nay",
    "thu nhập năm nay", "năm nay kiếm ổn không",
    "xem doanh thu năm nay", "năm nay bán được nhiêu",
    "doanh thu hiện tại năm", "năm nay thu nhiêu tiền",
    "năm nay lời lỗ sao", "năm nay kinh doanh sao",
    "tình hình năm nay thế nào", "năm nay có bao nhiêu tiền"
]

# 5. ORDER TODAY
order_today = [
    "hôm nay có bao nhiêu đơn", "bao nhiêu đơn hôm nay",
    "số lượng đơn hôm nay", "hôm nay có mấy order",
    "hôm nay có bao nhiêu khách", "hôm nay có bao nhiêu bill",
    "tổng đơn hôm nay", "hôm nay order nhiều không",
    "check số đơn hôm nay", "hôm nay bán được bao nhiêu đơn",
    "đếm số đơn hôm nay", "số order hôm nay",
    "hôm nay có đông không", "lượng khách hôm nay",
    "bao nhiêu người ăn hôm nay", "hôm nay có mấy bàn order",
    "hôm nay có bao nhiêu lượt đặt", "hôm nay có nhiều đơn không",
    "thống kê đơn hôm nay", "tổng số order hôm nay"
]

# 6. TABLE STATUS
table_status = [
    "bàn nào đang trống", "bàn nào đang order", "bàn nào đã đóng",
    "danh sách bàn đang sử dụng", "bàn nào còn trống",
    "còn bàn nào không", "bàn nào đang có khách",
    "bàn nào chưa dùng", "check trạng thái bàn",
    "liệt kê bàn đang hoạt động", "bàn nào đang mở",
    "bàn nào đang phục vụ", "tình trạng các bàn",
    "các bàn hiện tại ra sao", "bàn nào đã thanh toán",
    "bàn nào đang chờ", "bàn nào còn trống hôm nay",
    "bàn nào đang có người ăn", "check bàn trống",
    "xem trạng thái bàn"
]

# 7. ORDER STATUS
order_status = [
    "đơn nào chưa thanh toán", "đơn nào đã thanh toán",
    "đơn nào đang xử lý", "liệt kê đơn hôm nay",
    "đơn gần đây", "order mới nhất",
    "đơn nào đang mở", "đơn nào chưa xong",
    "check đơn hàng", "danh sách order",
    "có bao nhiêu đơn chưa thanh toán",
    "đơn nào pending", "đơn nào completed",
    "xem đơn gần nhất", "order nào chưa đóng",
    "order nào đã đóng", "check trạng thái đơn",
    "liệt kê order hôm nay", "đơn nào chưa trả tiền",
    "order đang hoạt động"
]

# 8. PAYMENT STATUS
payment_status = [
    "có bao nhiêu thanh toán thành công", "bao nhiêu thanh toán thất bại",
    "payment nào bị fail", "check payment",
    "tình trạng thanh toán", "bao nhiêu đơn đã trả tiền",
    "bao nhiêu đơn chưa trả", "payment pending",
    "payment failed", "payment refunded",
    "check thanh toán hôm nay", "danh sách thanh toán",
    "payment gần đây", "xem payment mới",
    "tổng payment", "payment theo trạng thái",
    "thanh toán thành công bao nhiêu",
    "bao nhiêu giao dịch lỗi", "payment nào chưa hoàn tất",
    "check trạng thái payment"
]

# 9. VOUCHER
voucher = [
    "voucher nào còn dùng được", "voucher nào hết hạn",
    "danh sách voucher", "voucher còn bao nhiêu",
    "voucher nào active", "voucher nào còn hiệu lực",
    "check voucher", "voucher đang áp dụng",
    "voucher nào hết hạn hôm nay",
    "voucher nào còn hạn", "voucher giảm bao nhiêu",
    "xem voucher", "voucher còn usable",
    "voucher nào đã hết", "voucher đang chạy",
    "liệt kê voucher", "voucher nào còn số lượng",
    "voucher nào còn dùng", "voucher nào đã dùng hết",
    "check khuyến mãi"
]

# 10. INVENTORY
inventory = [
    "món sắp hết", "tồn kho thấp", "cảnh báo tồn kho",
    "món nào sắp hết hàng", "món nào gần hết",
    "check tồn kho thấp", "món nào cần nhập thêm",
    "nguyên liệu sắp hết", "món nào thiếu hàng",
    "còn món nào ít không", "món nào sắp hết hôm nay",
    "tồn kho hiện tại", "kiểm tra tồn kho",
    "còn hàng không", "món nào cần bổ sung",
    "món nào gần hết kho", "món nào sắp hết nguyên liệu",
    "check stock", "món nào dưới mức tối thiểu",
    "cảnh báo hàng tồn"
]

# ===== SQL =====

SQL = {
    "revenue_today": "SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE(paid_at)=CURRENT_DATE",
    "revenue_yesterday": "SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE(paid_at)=CURRENT_DATE - INTERVAL '1 day'",
    "revenue_month": "SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('month', paid_at)=DATE_TRUNC('month', CURRENT_DATE)",
    "revenue_year": "SELECT COALESCE(SUM(amount),0) FROM payments WHERE DATE_TRUNC('year', paid_at)=DATE_TRUNC('year', CURRENT_DATE)",
    "order_today": "SELECT COUNT(*) FROM orders WHERE DATE(order_time)=CURRENT_DATE",
    "table_status": "SELECT table_code, status FROM tables",
    "order_status": "SELECT id, status FROM orders ORDER BY order_time DESC",
    "payment_status": "SELECT status, COUNT(*) FROM payments GROUP BY status",
    "voucher": "SELECT code, is_active, quantity, start_date, end_date FROM vouchers",
    "inventory": "SELECT m.name, i.stock_quantity FROM inventory i JOIN menus m ON i.menu_id=m.id WHERE i.stock_quantity <= i.min_quantity",
}

payment_method_popular = [
    "phương thức thanh toán nào được dùng nhiều nhất",
    "khách hay trả bằng gì",
    "payment method phổ biến",
    "cách thanh toán nào được dùng nhiều",
    "khách thường thanh toán bằng gì",
    "thanh toán bằng tiền mặt hay chuyển khoản nhiều hơn",
    "payment nào phổ biến nhất",
    "khách hay dùng momo hay tiền mặt",
    "phương thức trả tiền phổ biến",
    "cách thanh toán hot nhất",
    "thanh toán nào được dùng nhiều nhất",
    "phương thức thanh toán chủ yếu",
    "khách trả bằng gì nhiều",
    "payment nào được dùng nhiều",
    "tỷ lệ thanh toán theo phương thức",
    "payment method nào nhiều nhất",
    "check phương thức thanh toán",
    "khách thường trả kiểu gì",
    "payment phổ biến nhất là gì",
    "đa số khách trả bằng gì"
]
SQL["payment_method_popular"] = """
SELECT payment_method, COUNT(*) as total
FROM payments
GROUP BY payment_method
ORDER BY total DESC
LIMIT 1
"""

voucher_popular = [
    "voucher nào được dùng nhiều nhất",
    "voucher phổ biến nhất",
    "mã giảm giá nào được dùng nhiều",
    "voucher nào hot nhất",
    "voucher nào được sử dụng nhiều",
    "khách hay dùng voucher nào",
    "voucher nào nhiều người dùng",
    "voucher nào đang hot",
    "voucher nào dùng nhiều nhất",
    "mã giảm giá nào phổ biến",
    "voucher được dùng nhiều nhất là gì",
    "voucher nào được áp dụng nhiều",
    "voucher nào được dùng nhiều hôm nay",
    "check voucher hot",
    "voucher nào nhiều lượt dùng",
    "voucher phổ biến",
    "voucher nào được sử dụng nhiều nhất",
    "voucher nào được khách dùng nhiều",
    "voucher hot nhất hiện tại",
    "voucher nào nhiều người xài"
]
SQL["voucher_popular"] = """
SELECT v.code, COUNT(o.id) as total
FROM orders o
JOIN vouchers v ON o.voucher_id = v.id
WHERE o.voucher_id IS NOT NULL
GROUP BY v.code
ORDER BY total DESC
LIMIT 1
"""
# ===== ADD STATIC =====

add(revenue_today, SQL["revenue_today"])
add(revenue_yesterday, SQL["revenue_yesterday"])
add(revenue_month, SQL["revenue_month"])
add(revenue_year, SQL["revenue_year"])
add(order_today, SQL["order_today"])
add(table_status, SQL["table_status"])
add(order_status, SQL["order_status"])
add(payment_status, SQL["payment_status"])
add(voucher, SQL["voucher"])
add(inventory, SQL["inventory"])
add(payment_method_popular, SQL["payment_method_popular"])
add(voucher_popular, SQL["voucher_popular"])

# ===== DYNAMIC TOP DISH =====
for i in range(100):
    n = random.randint(1, 10)
    dataset.append({
        "text": f"top {n} món bán chạy",
        "sql": f"""SELECT m.name, SUM(oi.quantity)
FROM order_items oi
JOIN menus m ON oi.menu_id=m.id
GROUP BY m.name
ORDER BY SUM(oi.quantity) DESC
LIMIT {n}"""
    })

# ===== DYNAMIC MONTH =====
for i in range(200):
    m = random.randint(1, 12)
    y = 2026
    dataset.append({
        "text": f"doanh thu tháng {m} năm {y}",
        "sql": f"""
SELECT COALESCE(SUM(amount),0)
FROM payments
WHERE EXTRACT(MONTH FROM paid_at) = {m}
AND EXTRACT(YEAR FROM paid_at) = {y}
"""
    })

# ===== RANGE DATE =====
for i in range(300):
    d1 = random_date()
    d2 = random_date()
    dataset.append({
        "text": f"doanh thu từ {d1} đến {d2}",
        "sql": f"""
SELECT COALESCE(SUM(amount),0)
FROM payments
WHERE DATE(paid_at) BETWEEN '{d1}' AND '{d2}'
"""
    })

# ===== SAVE =====
with open("semantic_dataset.json", "w", encoding="utf-8") as f:
    json.dump(dataset, f, ensure_ascii=False, indent=2)

print("✅ Generated:", len(dataset))