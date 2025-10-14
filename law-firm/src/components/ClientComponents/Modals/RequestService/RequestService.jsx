import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useCreateRequest } from "../../../../hooks/useRequests";
import { useAllServices } from "../../../../hooks/useServices";

function RequestService({ onClose }) {
    const { data: services = [], isLoading: servicesLoading } = useAllServices();
    const createRequest = useCreateRequest();
    const { t } = useTranslation();

    const validationSchema = Yup.object({
        title: Yup.string().trim().required("Title is required").min(3, "Too short"),
        description: Yup.string().trim().required("Description is required").min(5, "Too short"),
        serviceId: Yup.string().required("Please select a service"),
        files: Yup.array().of(Yup.string()).max(4, "You can upload up to 4 files"),
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            // Build payload with photo1url..photo4url as strings
            const payload = {
                title: values.title,
                description: values.description,
                serviceId: values.serviceId,
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
        files: [], // array of JSON-stringified { name, type, content(base64) }
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
            {({ isSubmitting, errors, touched, setFieldValue, values }) => (
                <Form className="space-y-4">
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
                                    placeholder="Enter title"
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.title && touched.title
                                        ? "border-red-300 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-primary focus:border-primary"
                                        }`}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="title" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    {/* Service Select */}
                    <div className="space-y-2">
                        <label htmlFor="serviceId" className="flex items-center gap-2 text-sm font-semibold text-primary">
                            {t("selectservice")}
                        </label>
                        <Field name="serviceId">
                            {({ field }) => (
                                <select
                                    {...field}
                                    id="serviceId"
                                    disabled={servicesLoading}
                                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.serviceId && touched.serviceId
                                        ? "border-red-300 focus:ring-red-200 bg-red-50"
                                        : "border-gray-300 focus:ring-primary focus:border-primary bg-white"
                                        }`}
                                >
                                    <option value="">{servicesLoading ? "Loading services..." : "Select a service"}</option>
                                    {Array.isArray(services) &&
                                        services.map((s) => (
                                            <option key={s.id ?? s.value ?? s.name} value={s.id ?? s.value}>
                                                {s.name}
                                            </option>
                                        ))}
                                </select>
                            )}
                        </Field>
                        <ErrorMessage name="serviceId" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                    </div>

                    {/* File uploads (up to 4) */}
                    <div className="space-y-2">
                        <label htmlFor="files" className="flex items-center gap-2 text-sm font-semibold text-primary">
                            {t("Attach files")} (max 4)
                        </label>
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
                            className="w-full"
                        />
                        <ErrorMessage name="files" component="div" className="text-red-500 text-xs mt-1 font-medium" />

                        {/* preview / remove */}
                        {Array.isArray(values.files) && values.files.length > 0 && (
                            <div className="space-y-2 mt-2">
                                {values.files.map((fStr, idx) => {
                                    let name = "file";
                                    try {
                                        const parsed = JSON.parse(fStr);
                                        name = parsed?.name || name;
                                    } catch (e) {
                                        console.log(e);
                                    }
                                    return (
                                        <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                            <div className="text-sm text-gray-700 truncate max-w-[70%]">{name}</div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const copy = values.files.slice();
                                                        copy.splice(idx, 1);
                                                        setFieldValue("files", copy);
                                                    }}
                                                    className="text-sm text-red-600 hover:underline ml-2"
                                                >
                                                    {t("Remove")}
                                                </button>
                                            </div>
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
                            className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting
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
