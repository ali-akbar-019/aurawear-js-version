const AIRecommendations = ({
    suitableBodyTypes,
    suitableSkinTones,
    recommendedHeightRange,
}) => {
    return (
        <div className="bg-secondary rounded-lg p-4 mt-6">
            <h3 className="font-semibold text-foreground mb-3">AI Styling Recommendations</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
                {suitableBodyTypes.length > 0 && (
                    <p>
                        <span className="font-semibold text-foreground">Best for body types:</span>{" "}
                        {suitableBodyTypes.join(", ")}
                    </p>
                )}
                {suitableSkinTones.length > 0 && (
                    <p>
                        <span className="font-semibold text-foreground">Suitable skin tones:</span>{" "}
                        {suitableSkinTones.join(", ")}
                    </p>
                )}
                {recommendedHeightRange && (
                    <p>
                        <span className="font-semibold text-foreground">Recommended height:</span>{" "}
                        {recommendedHeightRange.min}ft - {recommendedHeightRange.max}ft
                    </p>
                )}
            </div>
        </div>
    );
};

export default AIRecommendations;
