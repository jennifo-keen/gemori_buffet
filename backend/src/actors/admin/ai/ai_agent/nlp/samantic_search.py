import json
import sys
import unicodedata
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def normalize(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    return ''.join(c for c in text if unicodedata.category(c) != 'Mn')

# load dataset
with open("ai_agent/semantic_dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

texts = [normalize(d["text"]) for d in data]
sqls = [d["sql"] for d in data]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)

# nhận input từ Node
input_data = json.loads(sys.argv[1])
question = normalize(input_data["question"])

q_vec = vectorizer.transform([question])

scores = cosine_similarity(q_vec, X)[0]
best_idx = scores.argmax()

print(json.dumps({
    "sql": sqls[best_idx],
    "confidence": float(scores[best_idx])
}))