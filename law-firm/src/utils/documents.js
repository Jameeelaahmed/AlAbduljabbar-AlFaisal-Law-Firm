export function getFileTypeAndName(fileUrl, index) {
    let fileType = "unknown";
    let fileName = `Attachment-${index + 1}`;

    if (fileUrl.startsWith("data:")) {
        // Extract MIME type from data URI
        const mimeMatch = fileUrl.match(/^data:(.*?);base64,/);
        if (mimeMatch) {
            fileType = mimeMatch[1];
            const ext = mimeMatch[1].split("/")[1];
            fileName += `.${ext}`;
        }
    } else {
        // Extract from hosted URL
        const parts = fileUrl.split("/");
        const namePart = parts[parts.length - 1];
        fileName = decodeURIComponent(namePart);
        const extMatch = namePart.match(/\.(\w+)$/);
        if (extMatch) fileType = extMatch[1];
    }

    return { fileType, fileName };
}

export function handleDownload(fileUrl, fileName) {
    if (fileUrl.startsWith("data:")) {
        // Convert base64 → Blob → Download
        const arr = fileUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const blob = new Blob([u8arr], { type: mime });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
    } else {
        // Hosted file — just trigger download
        const link = document.createElement("a");
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    }
}
