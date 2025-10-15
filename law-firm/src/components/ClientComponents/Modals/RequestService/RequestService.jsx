import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCreateRequest } from "../../../../hooks/useRequests";
import { useAllServices } from "../../../../hooks/useServices";
import { X } from "lucide-react";

function RequestService({ onClose, service }) {
    const { data: services = [], isLoading: servicesLoading } = useAllServices();
    const createRequest = useCreateRequest();
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        title: Yup.string().trim().required(t("Title is required")).min(3, t("Too short")),
        description: Yup.string().trim().required("Description is required").min(5, "Too short"),
        serviceId: Yup.string().required(t("Please select a service")),
        files: Yup.array().of(Yup.string()).max(4, t("You can upload up to 4 files")),
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            // Build payload with photo1url..photo4url as strings
            const payload = {
                title: values.title,
                description: values.description,
                serviceId: service?.serviceId,
                photo1url: "",
                photo2url: "",
                photo3url: "",
                photo4url: "",
            };

            if (Array.isArray(values.files)) {
                values.files.forEach((fStr, idx) => {
                    try {
                        const parsed = JSON.parse(fStr);
                        const dataUri = parsed.content
                            ? `data:${parsed.type || "application/octet-stream"};base64,${parsed.content}`
                            : "";
                        payload[`photo${idx + 1}url`] = dataUri;
                    } catch (e) {
                        console.log(e);
                    }
                });
            }

            if (createRequest?.mutateAsync) {
                await createRequest.mutateAsync(payload);
            } else {
                createRequest.mutate(payload);
            }
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = {
        title: "",
        description: "",
        serviceId: services?.[0]?.id ?? "",
        files: [],
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                <Form className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
                                <span className="inline-block text-2xl text-[#003a42]">📄</span>
                                <span>{t("Request")} {service?.serviceName}</span>
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{t("RequestService")}</p>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex items-center gap-2 text-sm font-semibold text-primary">
                            {t("title")}
                        </label>
                        <Field name="title">
                            {({ field }) => (
                                <input
                                    {...field}
                                    id="title"
                                    type="text"
                                    placeholder={t("Enter title")}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.title && touched.title
                                        ? "border-red-300 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-primary focus:border-primary"
                                        }`}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    {/* File uploads (up to 4) */}
                    <div className="space-y-3">
                        <label htmlFor="files" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                            <svg className="w-4 h-4 text-primary/600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            {t("Attach files")} <span className="text-gray-500 font-normal">({t("max 4 files")})</span>
                        </label>

                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors hover:border-primary focus-within:border-primary">
                            <input
                                id="files"
                                name="files"
                                type="file"
                                accept=".pdf,.doc,.docx,image/*"
                                multiple
                                onChange={async (e) => {
                                    const selected = Array.from(e.target.files || []);
                                    if (selected.length === 0) return;
                                    const existing = Array.isArray(values.files) ? values.files.slice() : [];
                                    if (existing.length + selected.length > 4) {
                                        toast.warn("You can upload up to 4 files total");
                                        onClose();
                                        return;
                                    }

                                    const toBase64 = (file) =>
                                        new Promise((res, rej) => {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                // store base64 content only
                                                const result = reader.result || "";
                                                const base64 = typeof result === "string" ? result.split(",")[1] : "";
                                                res(base64);
                                            };
                                            reader.onerror = rej;
                                            reader.readAsDataURL(file);
                                        });

                                    try {
                                        const serialized = await Promise.all(
                                            selected.map(async (file) => {
                                                const base64 = await toBase64(file);
                                                return JSON.stringify({
                                                    name: file.name,
                                                    type: file.type,
                                                    content: base64,
                                                });
                                            })
                                        );
                                        setFieldValue("files", existing.concat(serialized));
                                    } catch (err) {
                                        console.error(err);
                                        toast.error("Failed to read files");
                                    }
                                    // clear native input so same file can be selected again if needed
                                    e.target.value = "";
                                }}
                                className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/50 file:text-white hover:file:bg-primary/100"
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                {t("Supported formats: PDF, DOC, DOCX, Images")}
                            </p>
                        </div>

                        <ErrorMessage name="files" component="div" className="text-red-500 text-xs mt-1 font-medium" />

                        {/* File preview list */}
                        {Array.isArray(values.files) && values.files.length > 0 && (
                            <div className="space-y-2 mt-3">
                                <p className="text-xs font-medium text-gray-600">
                                    {values.files.length} {t("of 4 files selected")}
                                </p>
                                {values.files.map((fStr, idx) => {
                                    let name = "file";
                                    try {
                                        const parsed = JSON.parse(fStr);
                                        name = parsed?.name || name;
                                    } catch (e) {
                                        console.log(e);
                                    }
                                    return (
                                        <div key={idx} className="flex items-center justify-between bg-accent/50 border border-primary/200 rounded-lg p-3 transition-shadow hover:shadow-sm">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="flex-shrink-0 w-8 h-8 bg-white rounded border flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-medium text-gray-900 truncate">{name}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {Math.ceil(fStr.length / 1024)} KB
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const copy = values.files.slice();
                                                    copy.splice(idx, 1);
                                                    setFieldValue("files", copy);
                                                }}
                                                className="flex-shrink-0 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors"
                                                title={t("Remove")}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label htmlFor="description" className="flex items-center gap-2 text-sm font-semibold text-primary">
                            {t("description")}
                        </label>
                        <Field name="description">
                            {({ field }) => (
                                <textarea
                                    {...field}
                                    id="description"
                                    rows={4}
                                    placeholder="Describe your request"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${errors.description && touched.description
                                        ? "border-red-300 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-primary focus:border-primary bg-white"
                                        }`}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-lg cursor-pointer font-semibold text-white transition-all duration-300 transform ${isSubmitting
                                ? "bg-primary cursor-not-allowed"
                                : "bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                                }`}
                        >
                            {isSubmitting ? t("Sending...") : t("Send Request")}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default RequestService;
