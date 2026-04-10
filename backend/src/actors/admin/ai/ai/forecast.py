import sys
import json
import joblib
import os
import warnings
from datetime import datetime, timedelta

# Tắt cảnh báo để đầu ra sạch
warnings.filterwarnings("ignore", category=UserWarning)

def main():
    # --- 1. ĐƯỜNG DẪN TUYỆT ĐỐI ---
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    MODEL_PATH = os.path.join(BASE_DIR, "models", "forecast_model.pkl")
    ENCODER_PATH = os.path.join(BASE_DIR, "models", "label_encoder.pkl")

    # --- 2. LOAD MODEL ---
    try:
        model = joblib.load(MODEL_PATH)
        le = joblib.load(ENCODER_PATH)
    except Exception as e:
        # Nếu lỗi load model, trả về mảng rỗng để Node không crash
        print(json.dumps([]))
        return

    # --- 3. XỬ LÝ DỮ LIỆU ĐẦU VÀO ---
    if len(sys.argv) < 2:
        print(json.dumps([]))
        return

    try:
        raw_data = json.loads(sys.argv[1])
        # Node gửi result.rows, ta cần lấy các menu_id duy nhất
        menu_ids = list(set([item['menu_id'] for item in raw_data if 'menu_id' in item]))
    except:
        print(json.dumps([]))
        return

    # --- 4. DỰ ĐOÁN ---
    now = datetime.now()
    next_hour = (now + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0)
    forecast_time_str = next_hour.strftime("%Y-%m-%d %H:00:00")

    results = []
    total_quantity = 0
    known_classes = set(le.classes_)

    for m_id in menu_ids:
        if m_id not in known_classes:
            continue
        try:
            encoded = le.transform([m_id])[0]
            features = [[next_hour.hour, next_hour.day, next_hour.weekday(), encoded]]
            pred = model.predict(features)[0]
            qty = max(0, int(round(pred)))
            
            results.append({
                "menu_id": m_id,
                "forecast_date": forecast_time_str,
                "predicted_quantity": qty
            })
            total_quantity += qty
        except:
            continue

    # --- 5. TÍNH % ---
    final_output = []
    for item in results:
        percent = (item["predicted_quantity"] / total_quantity * 100) if total_quantity > 0 else 0
        item["predicted_percent"] = int(round(percent))
        final_output.append(item)

    # Chỉ in duy nhất 1 chuỗi JSON này
    print(json.dumps(final_output))

if __name__ == "__main__":
    main()