import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier

# Sample training data (you can expand this)
X_train = np.array([
    [3, 1, 1],  # Low flow, sad mood, mild cramps
    [5, 2, 2],  # Medium flow, neutral mood, moderate cramps
    [7, 3, 3]   # High flow, happy mood, severe cramps
])

y_train = np.array(["low", "medium", "high"])  # Target categories

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, "health_recommendation_model.pkl")
print("Model trained and saved!")
