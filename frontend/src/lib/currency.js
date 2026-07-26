export const formatCurrency = (value) => {
    const numericValue = Number(value || 0);

    return `Rs. ${numericValue.toLocaleString("en-PK", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    })}`;
};
