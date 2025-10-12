import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useCreateRequest } from "../../../../hooks/useRequests";
import { useAllServices } from "../../../../hooks/useServices";

function RequestService() {
    const { data: services = [], isLoading: servicesLoading } = useAllServices();
    const createRequest = useCreateRequest();

    const validationSchema = Yup.object({
        title: Yup.string().trim().required("Title is required").min(3, "Too short"),
        description: Yup.string().trim().required("Description is required").min(5, "Too short"),
        serviceId: Yup.string().required("Please select a service"),
    });

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        try {
            // support mutateAsync (react-query) or mutate
            if (createRequest?.mutateAsync) {
                await createRequest.mutateAsync(values);
            } else {
                createRequest.mutate(values);
            }
            toast.success("Request created");
            resetForm();
        } catch (err) {
            console.error(err);
            toast.error("Failed to create request");
        } finally {
            setSubmitting(false);
        }
    };

    // keep initialValues stable and enableReinitialize so select picks up services when loaded
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
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <Field
                            id="title"
                            name="title"
                            placeholder="Enter title"
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                        />
                        <ErrorMessage name="title" component="div" className="mt-1 text-xs text-red-600" />
                    </div>

                    <div>
                        <label htmlFor="serviceId" className="block text-sm font-medium text-gray-700 mb-1">
                            Service
                        </label>
                        <Field
                            as="select"
                            id="serviceId"
                            name="serviceId"
                            disabled={servicesLoading}
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="">{servicesLoading ? "Loading services..." : "Select a service"}</option>
                            {Array.isArray(services) &&
                                services.map((s) => (
                                    <option key={s.id ?? s.value ?? s.name} value={s.id ?? s.value}>
                                        {s.name}
                                    </option>
                                ))}
                        </Field>
                        <ErrorMessage name="serviceId" component="div" className="mt-1 text-xs text-red-600" />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            rows="4"
                            placeholder="Describe your request"
                            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30 bg-white resize-none"
                        />
                        <ErrorMessage name="description" component="div" className="mt-1 text-xs text-red-600" />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:opacity-95 disabled:opacity-60"
                        >
                            {isSubmitting ? "Sending..." : "Send Request"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default RequestService;
