const ProductDetailsGrid = ({
    fitType,
    occasion,
    stitchType,
    targetGroup,
}) => {
    const details = [
        { label: "Fit Type", value: fitType.replace(/_/g, " ") },
        { label: "Occasion", value: occasion },
        { label: "Stitch Type", value: stitchType.replace(/_/g, " ") },
        { label: "Target Group", value: targetGroup },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {details.map((detail) => (
                <div key={detail.label} className="space-y-1">
                    <p className="text-xs font-semibold text-muted-foreground uppercase">
                        {detail.label}
                    </p>
                    <p className="text-foreground font-semibold">{detail.value}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductDetailsGrid;
