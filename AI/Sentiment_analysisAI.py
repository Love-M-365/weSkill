import pandas as pd
import joblib
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

import pandas as pd

# Load dataset
df = pd.read_csv("C:\\Users\\devma\\OneDrive\\Documents\\Desktop\\weSkill\\AI\\DataSet.csv")

# Check if data is properly loaded
print(df.head())

# Load trained model
model = joblib.load("C:\\Users\\devma\\OneDrive\\Documents\\Desktop\\weSkill\\sentiment_model.pkl")

# Load SpaCy model for text processing
nlp = spacy.load("en_core_web_sm")

synonym_mapping = {
    "creative": ["creative", "creativity", "excellent creation", "innovative", "imaginative", "original", "artistic", "visionary", "inspired"],
    "dedicated": ["dedicated", "hardworking", "effort", "commitment", "devoted", "persistent", "determined", "focused", "diligent"],
    "professional": ["professional", "expert", "specialist", "skilled", "competent", "qualified", "experienced", "proficient", "adept"],
    "efficient": ["efficient", "quick", "fast", "time-saving", "productive", "effective", "organized", "streamlined", "punctual"],
    "friendly": ["friendly", "kind", "polite", "helpful", "supportive", "approachable", "warm", "welcoming", "generous", "empathetic"],
    "reliable": ["reliable", "trustworthy", "consistent", "dependable", "responsible", "loyal", "faithful", "steadfast"],
    "best": ["best", "amazing", "fantastic", "loved", "great", "wonderful", "outstanding", "exceptional", "superb", "remarkable"],
    "leadership": ["leader", "leadership", "influential", "inspiring", "mentor", "guiding", "motivating", "captain", "role model"],
    "teamwork": ["team player", "collaborative", "cooperative", "supportive", "cohesive", "group-oriented", "works well with others"],
    "innovative": ["innovative", "pioneering", "groundbreaking", "revolutionary", "cutting-edge", "forward-thinking", "inventive"],
    "communication": ["communicative", "articulate", "expressive", "eloquent", "persuasive", "clear", "concise", "good speaker"],
    "problem-solving": ["problem solver", "solution-oriented", "troubleshooter", "resourceful", "analytical", "strategic thinker"]
}

# Convert to lowercase for easier matching
keyword_badges = {word.lower(): badge for badge, words in synonym_mapping.items() for word in words}

# Sentiment prediction function
def predict_sentiment(review):
    return model.predict([review])[0]  # Predict using trained model

def generate_badges(review, sentiment):
    if sentiment == "Positive":
        badges = [badge for keyword, badge in keyword_badges.items() if keyword in review.lower()]
        return badges if badges else ["No Specific Badge"]
    else:
        return ["No Badges"]


# Example Reviews
reviews = [
    "The work which I received was really pathetic",
    "I appreciate the dedication and effort of Ish",
    "Ish has excellent creativity and original ideas",
    "The specialist did an expert job in this project",
    "He is very friendly and kind towards others",
    "Ish is a problem solver",
    "Great work, value for money is satified",
    "Suman is rude in nature"
]

for review in reviews:
    sentiment = predict_sentiment(review)
    badges = generate_badges(review, sentiment)

    print(f"Review: {review}")
    print(f"Predicted Sentiment: {sentiment}")
    print(f"Assigned Badges: {', '.join(badges)}\n")

