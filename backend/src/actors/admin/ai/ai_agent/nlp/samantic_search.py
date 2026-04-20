import json
import sys
import pickle
import unicodedata
import os
from sklearn.metrics.pairwise import cosine_similarity

def normalize(text):
    text = text.lower()
    text = unicodedata.normalize('NFD', text)
    return ''.join(c for c in text if unicodedata.category(c) != 'Mn')

#LOAD
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

vectorizer = pickle.load(open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb"))
X = pickle.load(open(os.path.join(BASE_DIR, "matrix.pkl"), "rb"))
data = pickle.load(open(os.path.join(BASE_DIR, "data.pkl"), "rb"))

#INPUT
input_json = json.loads(sys.argv[1])
question = normalize(input_json["question"])

# VECTOR 
q_vec = vectorizer.transform([question])

# SIMILARITY
scores = cosine_similarity(q_vec, X)[0]
idx = scores.argmax()

# OUTPUT
print(json.dumps({
    "sql": data[idx]["sql"],
    "confidence": float(scores[idx])
}))