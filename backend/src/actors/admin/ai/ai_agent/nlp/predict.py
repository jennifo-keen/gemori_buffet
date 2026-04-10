import sys
import json
import re
from datetime import datetime

def extract_date(text):
    match = re.search(r'(\d{1,2})/(\d{1,2})/(\d{4})', text)

    if match:
        day, month, year = match.groups()
        try:
            date_obj = datetime(int(year), int(month), int(day))
            return date_obj.strftime("%Y-%m-%d")
        except:
            return None

    return None


try:
    data = json.loads(sys.argv[1])
    question = data["question"].lower()

    date = extract_date(question)

    # ===== INTENT =====
    if "doanh thu" in question and date:
        intent = "revenue_by_date"
    elif "hôm nay" in question and "doanh thu" in question:
        intent = "revenue_today"
    elif "hôm qua" in question:
        intent = "revenue_yesterday"
    elif "tháng này" in question and "so với" in question:
        intent = "revenue_compare_month"
    elif "hôm nay" in question and "so với" in question:
        intent = "revenue_compare_day"
    elif "món" in question and "chạy" in question:
        intent = "top_dish"
    else:
        intent = "unknown"

    print(json.dumps({
        "intent": intent,
        "entities": {
            "date": date
        },
        "confidence": 0.95
    }))

except Exception as e:
    print(json.dumps({
        "error": str(e)
    }))