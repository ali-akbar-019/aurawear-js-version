export const errorHandler = (
    err,
    _req,
    res,
    _next
) => {
    const status = err.status || 500;

    console.error("Error:", err.message);

    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
