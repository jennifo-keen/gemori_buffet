import sys
import json
import pandas as pd
import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from datetime import datetime, timedelta
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

data = json.loads(sys.argv[1])
df = pd.DataFrame(data)

# ===== FEATURE =====
df['item_order_time'] = pd.to_datetime(df['item_order_time'])
df['hour'] = df['item_order_time'].dt.hour
df['day'] = df['item_order_time'].dt.day
df['day_of_week'] = df['item_order_time'].dt.dayofweek

# encode menu
le = LabelEncoder()
df['menu_encoded'] = le.fit_transform(df['menu_id'])

# ===== TRAIN =====
X = df[['hour', 'day', 'day_of_week', 'menu_encoded']]
y = df['quantity']

model = RandomForestRegressor()
model.fit(X, y)

# ===== PREDICT 2H TỚI =====
now = datetime.now()
future_times = [
    (now + timedelta(hours=1)).replace(minute=0, second=0, microsecond=0),
    (now + timedelta(hours=2)).replace(minute=0, second=0, microsecond=0)
]

results = []

for time in future_times:
    for menu_id in df['menu_id'].unique():
        encoded = le.transform([menu_id])[0]

        pred = model.predict([[time.hour, time.day, time.weekday(), encoded]])[0]

        results.append({
            "menu_id": menu_id,
            "forecast_date": time.strftime("%Y-%m-%d %H:00:00"),
            "quantity": max(0, int(pred))
        })

# ===== TÍNH % =====
final = []
df_res = pd.DataFrame(results)

for time in df_res['forecast_date'].unique():
    temp = df_res[df_res['forecast_date'] == time]
    total = temp['quantity'].sum()

    for _, row in temp.iterrows():
        percent = (row['quantity'] / total * 100) if total > 0 else 0

        final.append({
            "menu_id": row['menu_id'],
           "forecast_date": row['forecast_date'],
            "predicted_quantity": row['quantity'],
            "predicted_percent": int(percent)
        })

print(json.dumps(final))