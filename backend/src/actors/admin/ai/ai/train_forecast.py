import psycopg2
import pandas as pd
import joblib
import matplotlib.pyplot as plt
import os
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import mean_absolute_error

DATABASE_URL="postgresql://neondb_owner:npg_kfixZ7mJE3zS@ep-muddy-river-a1q6vlsv-pooler.ap-southeast-1.aws.neon.tech/gemori_bufet?sslmode=require&channel_binding=require"
def train_model():
    print("1. Đang kết nối DB và lấy dữ liệu món ăn...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        # Lấy dữ liệu từ bảng order_items
        query = "SELECT item_order_time, menu_id, quantity FROM order_items ORDER BY item_order_time ASC"
        df = pd.read_sql(query, conn)
        conn.close()
    except Exception as e:
        print(f"Lỗi kết nối DB: {e}")
        return

    if df.empty:
        print("Không có dữ liệu để train.")
        return

    # Tiền xử lý dữ liệu (Feature Engineering)
    df['item_order_time'] = pd.to_datetime(df['item_order_time'])
    df['hour'] = df['item_order_time'].dt.hour
    df['day'] = df['item_order_time'].dt.day
    df['day_of_week'] = df['item_order_time'].dt.dayofweek

    le = LabelEncoder()
    df['menu_encoded'] = le.fit_transform(df['menu_id'])

    #Chia Train (80%) và Test (20%)
    split_idx = int(len(df) * 0.8)
    train_df = df.iloc[:split_idx]
    test_df = df.iloc[split_idx:]

    X_train = train_df[['hour', 'day', 'day_of_week', 'menu_encoded']]
    y_train = train_df['quantity']
    X_test = test_df[['hour', 'day', 'day_of_week', 'menu_encoded']]
    y_test = test_df['quantity']

    #Huấn luyện Model
    print("🚀 2. Đang huấn luyện RandomForestRegressor...")
    model = RandomForestRegressor(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)

    #Đánh giá Accuracy (Sử dụng Score)
    train_score = model.score(X_train, y_train) * 100
    test_score = model.score(X_test, y_test) * 100
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)

    print(f"Kết quả: Train Acc: {train_score:.2f}% | Test Acc: {test_score:.2f}% | MAE: {mae:.2f}")

    #Vẽ biểu đồ so sánh thực tế và dự đoán (Cho 50 mẫu đầu tiên của bộ test)
    plt.figure(figsize=(12, 6))
    plt.plot(y_test.values[:50], label='Thực tế', color='blue', marker='o')
    plt.plot(y_pred[:50], label='Dự đoán', color='red', linestyle='--', marker='x')
    
    stats_text = (
        f"Đánh giá:\n"
        f"Train Score: {train_score:.2f}%\n"
        f"Test Score: {test_score:.2f}%\n"
        f"Sai lệch (MAE): {mae:.2f} món"
    )
    plt.text(0.98, 0.05, stats_text, transform=plt.gca().transAxes, 
             fontsize=10, verticalalignment='bottom', horizontalalignment='right',
             bbox=dict(boxstyle='round', facecolor='white', alpha=0.8))

    plt.title('So sánh Số lượng Thực tế vs Dự đoán')
    plt.legend()
    plt.savefig('forecast_accuracy.png')
    print("Đã lưu biểu đồ forecast_accuracy.png")

    #Lưu Model
    model_dir = 'models'
    if not os.path.exists(model_dir): os.makedirs(model_dir)
    
    joblib.dump(model, os.path.join(model_dir, 'forecast_model.pkl'))
    joblib.dump(le, os.path.join(model_folder if 'model_folder' in locals() else model_dir, 'label_encoder.pkl'))
    print("✨ Model và Encoder đã được lưu thành công vào folder 'models'.")

if __name__ == "__main__":
    train_model()