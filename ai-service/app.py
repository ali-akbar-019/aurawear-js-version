# ai-service/app.py
from flask import Flask, request, jsonify
from deepface import DeepFace
import requests
import cv2
import numpy as np

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    img_url = data.get("imageUrl")

    if not img_url:
        return jsonify({"success": False, "error": "Image URL required"}), 400

    try:
        resp = requests.get(img_url)
        img_array = np.asarray(bytearray(resp.content), dtype=np.uint8)
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        result = DeepFace.analyze(
            img_path=img,
            actions=["gender", "age", "race"],
            enforce_detection=False
        )

        face = result[0]

        return jsonify({
            "success": True,
            "gender": face["dominant_gender"],
            "age": face["age"],
            "skinTone": face["dominant_race"]
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=3001, debug=True)