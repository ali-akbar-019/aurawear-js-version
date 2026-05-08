export class ApiError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}
