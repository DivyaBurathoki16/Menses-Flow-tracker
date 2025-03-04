from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId
import datetime

app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config["MONGO_URI"] = "mongodb://localhost:27017/period_tracker"
mongo = PyMongo(app)

# Reference to collection
periods_collection = mongo.db.periods

# 📌 Log a new period date
@app.route("/log", methods=["POST"])
def log_period():
    try:
        data = request.json
        user_id = data["userId"]
        period_date = datetime.datetime.strptime(data["periodDate"], "%Y-%m-%d")

        user_data = periods_collection.find_one({"userId": user_id})
        
        if user_data:
            periods_collection.update_one({"userId": user_id}, {"$push": {"periodDates": period_date}})
        else:
            periods_collection.insert_one({"userId": user_id, "periodDates": [period_date]})
        
        return jsonify({"message": "Period logged successfully!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Fetch user's period history
@app.route("/history/<user_id>", methods=["GET"])
def get_period_history(user_id):
    try:
        user_data = periods_collection.find_one({"userId": user_id})
        
        if not user_data:
            return jsonify({"message": "No period data found"}), 404

        return jsonify({"userId": user_id, "periodDates": user_data["periodDates"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 📌 Predict Next Period
@app.route("/predict/<user_id>", methods=["GET"])
def predict_next_period(user_id):
    try:
        user_data = periods_collection.find_one({"userId": user_id})
        
        if not user_data or len(user_data["periodDates"]) < 2:
            return jsonify({"message": "Not enough data for prediction"}), 400

        periods = sorted([datetime.datetime.strptime(date, "%Y-%m-%d") for date in user_data["periodDates"]])
        cycle_lengths = [(periods[i] - periods[i - 1]).days for i in range(1, len(periods))]
        avg_cycle_length = round(sum(cycle_lengths) / len(cycle_lengths))
        
        next_period_date = periods[-1] + datetime.timedelta(days=avg_cycle_length)
        
        return jsonify({
            "userId": user_id,
            "avgCycleLength": avg_cycle_length,
            "nextPeriodDate": next_period_date.strftime("%Y-%m-%d")
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
