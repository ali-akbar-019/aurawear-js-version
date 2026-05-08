export const extractBodyInfo = async (req, res) => {
    try {
        console.log("→ Entered extractBodyInfo handler");

        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ message: "Image URL required" });
        }

        let pythonResponseData;
        try {
            console.log("→ Sending request to Python AI service on 127.0.0.1:3001/analyze");

            const response = await fetch("http://127.0.0.1:3001/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl }),
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Python service returned ${response.status}: ${text}`);
            }

            pythonResponseData = await response.json();
            console.log("→ Received response from Python service:", pythonResponseData);
        } catch (err) {
            console.error("‼ Error calling Python AI service:", err);
            const msg = err instanceof Error ? err.message : JSON.stringify(err);
            return res.status(500).json({ message: "Failed to call Python service", error: msg });
        }

        const { gender, age, skinTone, success } = pythonResponseData;

        if (!success) {
            console.error("‼ Python service returned failure:", pythonResponseData);
            return res.status(500).json({
                message: "Python AI service failed",
                error: pythonResponseData?.error || "Unknown error",
            });
        }

        const bodyInfo = {
            gender: gender?.toUpperCase() || "UNKNOWN",
            skinTone: skinTone || "UNKNOWN",
            bodyType: "REGULAR",
            heightCm: gender?.toLowerCase() === "man" ? 175 : 162,
            weightKg: gender?.toLowerCase() === "man" ? 70 : 60,
            age: age || null,
        };

        console.log("→ Returning bodyInfo:", bodyInfo);
        return res.status(200).json({ success: true, bodyInfo });
    } catch (err) {
        console.error("‼ Unexpected server error in extractBodyInfo:", err);
        const msg = err instanceof Error ? err.message : JSON.stringify(err);
        return res.status(500).json({
            message: "AI Analysis failed. Is the Python server running?",
            error: msg,
        });
    }
};
