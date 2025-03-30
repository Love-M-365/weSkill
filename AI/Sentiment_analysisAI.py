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
    "good communication": ["communication", "articulate", "expressive", "eloquent", "persuasive", "clear", "concise", "good speaker"],
    "problem-solving": ["problem solver", "solution-oriented", "troubleshooter", "resourceful", "analytical", "strategic thinker"],
    "value for money": ["value for money", "affordable", "cost-effective", "budget-friendly", "worth the price", "economical", "reasonable price", "great deal", "good investment", "bang for the buck"]
}


# Convert to lowercase for easier matching
keyword_badges = {word.lower(): badge for badge, words in synonym_mapping.items() for word in words}


# Function to check if a word is negated
def is_negated(doc, phrase):
    words = phrase.split()  # Split multi-word phrases
    for i, token in enumerate(doc):
        if token.text.lower() == words[0]:  # Match first word in phrase
            # Ensure the whole phrase matches
            if all(i + j < len(doc) and doc[i + j].text.lower() == words[j] for j in range(len(words))):
                # Check if any negation word appears before or affects the phrase
                for ancestor in token.ancestors:
                    if ancestor.dep_ in ("neg", "aux") and ancestor.text.lower() in ("not", "never", "no", "could", "could have", "nor", "neither"):
                        return True
                # Check negation words before the phrase
                if i > 0 and doc[i - 1].text.lower() in ("not", "never", "no", "could", "could have", "nor", "neither"):
                    return True
    return False

# Sentiment prediction function
def predict_sentiment(review):
    return model.predict([review])[0]  # Predict using trained model

# Function to generate badges while ignoring negated words
def generate_badges(review, sentiment):
    if sentiment == "Positive":
        doc = nlp(review.lower())  # Process the review with spaCy
        badges = {badge for keyword, badge in keyword_badges.items() 
                  if keyword in review.lower() and not is_negated(doc, keyword)}
        return list(badges) if badges else ["No Specific Badge"]
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
    "Suman is rude in nature",
    "working with ram was an absolute pleasure they delievered high quality work on time . this communication was clear and he was always open to feedback ",
    "communication could have been  a bit more responsive but overall they deleivered what was promised",
    "work was not on time"
]

for review in reviews:
    sentiment = predict_sentiment(review)
    badges = generate_badges(review, sentiment)

    print(f"Review: {review}")
    print(f"Predicted Sentiment: {sentiment}")
    print(f"Assigned Badges: {', '.join(badges)}\n")

