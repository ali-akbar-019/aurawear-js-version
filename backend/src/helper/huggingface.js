// helpers/huggingface.js
import { InferenceClient } from "@huggingface/inference";
import fs from "fs";

const client = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);

export const callHuggingFace = async (imageUrl, modelName) => {
    try {
        // Fetch image as array buffer
        const response = await fetch(imageUrl);
        const data = await response.arrayBuffer();

        // Call Hugging Face model
        const output = await client.imageClassification({
            data,
            model: modelName,
        });

        return output;
    } catch (err) {
        console.error("Hugging Face API error:", err);
        throw new Error("Failed to get AI prediction");
    }
};
