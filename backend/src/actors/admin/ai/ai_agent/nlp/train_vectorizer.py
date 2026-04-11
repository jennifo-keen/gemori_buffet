import json
import pickle
import unicodedata
from sklearn.feature_extraction.text import TfidfVectorizer

def normalize(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    return ''.join(c for c in text if unicodedata.category(c) != 'Mn')

with open("./semantic_dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = [normalize(d["text"]) for d in data]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

pickle.dump(vectorizer, open("./vectorizer.pkl", "wb"))
pickle.dump(X, open("./matrix.pkl", "wb"))
pickle.dump(data, open("./data.pkl", "wb"))

print("✅ Vectorizer trained & saved")