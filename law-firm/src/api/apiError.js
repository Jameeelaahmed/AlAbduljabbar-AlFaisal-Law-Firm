export const getErrorMessage = (error, fallbackMessage = "Request failed") => {
    const payload = error?.response?.data;
    return (
        payload?.error?.description ||
        payload?.message ||
        error?.message ||
        fallbackMessage
    );
};

export const normalizeApiError = (error, fallbackMessage = "Request failed") => {
    const message = getErrorMessage(error, fallbackMessage);
    const normalized = new Error(message);
    normalized.status = error?.response?.status;
    normalized.data = error?.response?.data;
    return normalized;
};

export const ensureSuccess = (payload, fallbackMessage = "Request failed") => {
    if (payload?.isSuccess === false) {
        const normalized = new Error(payload?.error?.description || fallbackMessage);
        normalized.status = payload?.status || payload?.statusCode;
        normalized.data = payload;
        throw normalized;
    }

    return payload;
};
