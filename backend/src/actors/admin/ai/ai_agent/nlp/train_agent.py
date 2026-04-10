import json
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# load dataset
with open("dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = [d["text"] for d in data]
labels = [d["label"] for d in data]

# vectorize
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# train model
model = LogisticRegression()
model.fit(X, labels)

# save
pickle.dump(model, open("intent_model.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

print("✅ Train xong model")