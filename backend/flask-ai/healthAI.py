from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

app = Flask(__name__)
CORS(app)

# Load the trained AI model
model = joblib.load("health_recommendation_model.pkl")

# Define category mappings for recommendations
EXERCISE_MAP = {
    "low": "Gentle Yoga, Walking",
    "medium": "Moderate Yoga, Light Stretching",
    "high": "Restorative Yoga, Relaxation"
}

DIET_MAP = {
    "low": "Hydrating Foods, Iron-rich foods",
    "medium": "Leafy Greens, Protein-rich foods",
    "high": "Warm Soups, Herbal Teas"
}

@app.route("/predict-health", methods=["POST"])
def predict_health():
    try:
        data = request.json
        
        # Extract the correct fields
        flow_intensity = int(data["flowIntensity"])
        period_length = int(data["periodLength"])
        mood = int(data["mood"])
        cramp_intensity = int(data["crampIntensity"])

        # Predict health recommendation using ML model
        prediction = model.predict([[flow_intensity, period_length, mood, cramp_intensity]])
        category = prediction[0]  # The predicted category (e.g., "low", "medium", "high")

        # Get recommendations based on prediction
        exercise = EXERCISE_MAP.get(category, "General Yoga")
        diet = DIET_MAP.get(category, "Balanced Diet")

        response = {
            "exercise": exercise,
            "diet": diet,
            "mentalHealthTip": "Practice meditation and deep breathing for relaxation."
        }
        
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5002)
