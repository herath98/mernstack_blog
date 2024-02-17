/**
 * Creates an error object with the given status code and message.
 * @param {number} statusCode - The status code for the error.
 * @param {string} message - The message for the error.
 * @returns {Error} - The created error object.
 */
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
