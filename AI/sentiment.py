from transformers import pipeline
import pandas as pd

# Load sentiment analysis pipeline
sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

# Define keyword-based badge rules
BADGE_KEYWORDS = {
    "Time Efficient": ["fast", "quick", "efficient", "timely", "on time"],
    "Creative": ["innovative", "creative", "unique", "outstanding", "original"],
    "Customer Friendly": ["helpful", "friendly", "supportive", "kind", "polite"],
    "Detail Oriented": ["thorough", "detailed", "meticulous", "precise", "careful"],
    "High Quality": ["amazing", "excellent", "fantastic", "superb", "best"],
    "Unreliable": ["late", "delayed", "unresponsive", "careless", "unreliable"],
    "Rude": ["rude", "impolite", "arrogant", "unprofessional", "bad attitude"],
    "Unprofessional": ["scam", "cheat", "fraud", "fake", "poor service"]
}

# Function to assign badges based on keywords
def assign_badge(review):
    review_lower = review.lower()
    badges = [badge for badge, keywords in BADGE_KEYWORDS.items() if any(word in review_lower for word in keywords)]
    return ", ".join(badges) if badges else "No Specific Badge"

# Sample reviews for testing
test_reviews = [
    "The service was fast and efficient. I really appreciate their timely response!",
    "They were very rude and unprofessional. Worst experience ever!",
    "Such a creative approach! Their work was truly innovative and unique.",
    " Nice work, timely submitted"
    "The response was delayed, and they were completely unresponsive. Very unreliable!"
    "Freelancer was responsive and delivered quickly"
]

# Create DataFrame for structured output
df = pd.DataFrame(test_reviews, columns=["Review"])

# Apply sentiment analysis
df["Sentiment"] = df["Review"].apply(lambda x: sentiment_pipeline(x)[0]["label"])
df["Score"] = df["Review"].apply(lambda x: sentiment_pipeline(x)[0]["score"])
df["Badge"] = df["Review"].apply(assign_badge)

# Print results
print(df)

# Save output to CSV (optional)
df.to_csv("sentiment_results_with_badges.csv", index=False)

