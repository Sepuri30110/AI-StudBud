import os
import json
import google.generativeai as genai
from flask import Flask, request, jsonify
# from google.generativeai.types import GenerationError  # Optional, if import fails use generic Exception

app = Flask(__name__)

# Get API key from environment
api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY environment variable not set.")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-flash")


@app.route('/study_plan', methods=['POST', 'GET'])
def generate_study_plan():
    try:
        if request.method == 'POST':
            if not request.is_json:
                return jsonify({"error": "Request must be JSON."}), 400

            data = request.get_json()

            required_keys = ["subject", "topics", "proficiency", "hours_weekday", "hours_weekend", "duration"]
            if not all(key in data for key in required_keys):
                return jsonify({"error": "Missing required parameters."}), 400

            subject = data["subject"]
            topics = data["topics"]
            proficiency = data["proficiency"]
            hours_weekday = data["hours_weekday"]
            hours_weekend = data["hours_weekend"]
            duration = data["duration"]

            prompt = f"""
            My subject is {subject}. My topics are: {", ".join(topics)}. 
            My proficiency level is {proficiency} on a scale of 10. 
            I can allocate {hours_weekday} hours per weekday and {hours_weekend} hours on weekends.
            I have {duration} weeks to prepare. 
            Please generate a JSON study timetable with "week1", "week2", etc. 
            Each week should have daily plans with "day", "time", "topic", and "notes".
            Ensure the output is a valid JSON.
            """

            response = model.generate_content(prompt)

            if not response.text.strip():
                return jsonify({"error": "Received empty response from Gemini API"}), 500

            return jsonify({"error": "Invalid JSON response from Gemini API", "raw_response": response.text}), 200

        elif request.method == 'GET':
            return jsonify({"message": "Flask study plan API is running!"})

    except Exception as e:
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, port=port, host='0.0.0.0')