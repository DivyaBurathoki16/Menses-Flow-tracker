from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from sklearn.linear_model import LinearRegression  # For AI-based predictions

app = Flask(__name__)

# Function to Predict Next Period & Phases
def predict_next_period(last_period_date, avg_cycle_length):
    last_period_date = datetime.strptime(last_period_date, "%Y-%m-%d")
    next_period_date = last_period_date + timedelta(days=avg_cycle_length)

    phases = {
        "Menstrual Phase": (last_period_date, last_period_date + timedelta(days=5)),
        "Follicular Phase": (last_period_date + timedelta(days=6), last_period_date + timedelta(days=avg_cycle_length - 14)),
        "Ovulation Phase": (last_period_date + timedelta(days=avg_cycle_length - 14), last_period_date + timedelta(days=avg_cycle_length - 12)),
        "Luteal Phase": (last_period_date + timedelta(days=avg_cycle_length - 12), next_period_date),
    }

    return next_period_date.strftime("%Y-%m-%d"), {k: (v[0].strftime("%Y-%m-%d"), v[1].strftime("%Y-%m-%d")) for k, v in phases.items()}

# AI/ML-Based Prediction API
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    last_period_date = data.get("lastPeriodDate")
    cycle_length = int(data.get("cycleLength"))

    if not last_period_date or not cycle_length:
        return jsonify({"error": "Missing data"}), 400

    next_period_date, phases = predict_next_period(last_period_date, cycle_length)

    return jsonify({
        "nextPeriodDate": next_period_date,
        "phases": phases
    })

if __name__ == "__main__":
    app.run(port=5001, debug=True)
