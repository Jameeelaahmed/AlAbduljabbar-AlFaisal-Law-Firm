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
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            if (createRequest?.mutateAsync) {
                await createRequest.mutateAsync(values);
            } else {
                createRequest.mutate(values);
            }
            onClose();
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Failed to create request");
        } finally {
            setSubmitting(false);
        }
    };

    const initialValues = {
        title: "",
        description: "",
        serviceId: services?.[0]?.id ?? "",
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isSubmitting, errors, touched }) => (
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
