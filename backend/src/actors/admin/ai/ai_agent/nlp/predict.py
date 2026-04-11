import sys, json, re, pickle, unicodedata
from datetime import datetime

model = pickle.load(open("intent_model.pkl", "rb"))
vectorizer = pickle.load(open("vectorizer.pkl", "rb"))

def normalize(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    return ''.join(c for c in text if unicodedata.category(c) != 'Mn')

def extract_number(text):
    m = re.search(r'\d+', text)
    return int(m.group()) if m else None

def extract_date_range(text):
    matches = re.findall(r'(\d{1,2}/\d{1,2}/\d{4})', text)
    return matches[0], matches[1] if len(matches) >= 2 else (None, None)

try:
    data = json.loads(sys.argv[1])
    q = normalize(data["question"])

    top_n = extract_number(q)
    start_date, end_date = extract_date_range(q)

    # RULE
    if start_date and end_date:
        intent = "revenue_range"

    elif "top" in q and top_n:
        intent = "top_dish_limit"

    elif "tuan nay" in q and "tuan truoc" in q:
        intent = "compare_week"

    else:
        X = vectorizer.transform([q])
        intent = model.predict(X)[0]
        conf = max(model.predict_proba(X)[0])

        print(json.dumps({
            "intent": intent,
            "entities": {
                "top_n": top_n,
                "start_date": start_date,
                "end_date": end_date
            },
            "confidence": float(conf)
        }))
        sys.exit()

    print(json.dumps({
        "intent": intent,
        "entities": {
            "top_n": top_n,
            "start_date": start_date,
            "end_date": end_date
        },
        "confidence": 0.95
    }))

except Exception as e:
    print(json.dumps({"error": str(e)}))