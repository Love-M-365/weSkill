from flask import Flask, request, jsonify
import joblib
import spacy

app = Flask(__name__)

# Load the sentiment model
model = joblib.load("C:\\Users\\devma\\OneDrive\\Documents\\Desktop\\weSkill\\sentiment_model.pkl")
nlp = spacy.load("en_core_web_sm")

# Synonym mapping
synonym_mapping = {
    "creative": ["creative", "creativity", "excellent creation", "innovative", "imaginative"],
    "dedicated": ["dedicated", "hardworking", "effort", "commitment"],
    "professional": ["professional", "expert", "specialist", "skilled"],
    "efficient": ["efficient", "quick", "fast", "time-saving"],
    "friendly": ["friendly", "kind", "polite", "helpful"],
    "reliable": ["reliable", "trustworthy", "consistent", "dependable", "responsible", "loyal", "faithful", "steadfast"],
    "best": ["best", "amazing", "fantastic", "loved", "great", "wonderful", "outstanding", "exceptional", "superb", "remarkable"],
    "leadership": ["leader", "leadership", "influential", "inspiring", "mentor", "guiding", "motivating", "captain", "role model"],
    "teamwork": ["team player", "collaborative", "cooperative", "supportive", "cohesive", "group-oriented", "works well with others"],
    "innovative": ["innovative", "pioneering", "groundbreaking", "revolutionary", "cutting-edge", "forward-thinking", "inventive"],
    "good communication": ["communication", "articulate", "expressive", "eloquent", "persuasive", "clear", "concise", "good speaker"],
    "problem-solving": ["problem solver", "solution-oriented", "troubleshooter", "resourceful", "analytical", "strategic thinker"],
    "value for money": ["value for money", "affordable", "cost-effective", "budget-friendly", "worth the price", "economical", "reasonable price", "great deal", "good investment", "bang for the buck"]
}

keyword_badges = {word.lower(): badge for badge, words in synonym_mapping.items() for word in words}

# Function to check negation
def is_negated(doc, phrase):
    words = phrase.split()
    for i, token in enumerate(doc):
        if token.text.lower() == words[0]:
            if all(i + j < len(doc) and doc[i + j].text.lower() == words[j] for j in range(len(words))):
                if any(ancestor.text.lower() in ["not", "never", "no"] for ancestor in token.ancestors):
                    return True
                if i > 0 and doc[i - 1].text.lower() in ["not", "never", "no"]:
                    return True
    return False

# Function to predict sentiment
def predict_sentiment(text):
    return model.predict([text])[0]

# Function to generate badges
def generate_badges(review, sentiment):
    if sentiment == "Positive":
        doc = nlp(review.lower())
        badges = {badge for keyword, badge in keyword_badges.items() if keyword in review.lower() and not is_negated(doc, keyword)}
        return list(badges) if badges else ["No Specific Badge"]
    return ["No Badges"]

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    review = data.get("text", "")

    sentiment = predict_sentiment(review)
    badges = generate_badges(review, sentiment)

    return jsonify({"sentiment": sentiment, "badges": badges})

if __name__ == "__main__":
    app.run(port=5001, debug=True)
