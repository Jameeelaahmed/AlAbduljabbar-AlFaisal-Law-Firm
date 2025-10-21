import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCreateFaq, useUpdateFaq, useFaqForUpdate } from "../../../../hooks/useFAQ";
import { useTranslation } from "react-i18next";
function FAQModal({ onClose, faqId = null, faqCategoryId }) {
    // hooks must be called unconditionally
    const { mutateAsync: createFaq } = useCreateFaq();
    const { mutateAsync: updateFaq } = useUpdateFaq();
    const { data } = useFaqForUpdate(faqId);
    const { t } = useTranslation();
    const fetchedRaw = data ?? null;
    const fetched =
        fetchedRaw && typeof fetchedRaw === "object"
            ? {
                id: fetchedRaw.id ?? fetchedRaw.faqId ?? null,
                questionEn: fetchedRaw.questionEn ?? fetchedRaw.question ?? "",
                questionAr: fetchedRaw.questionAr ?? fetchedRaw.question_ar ?? "",
                answerEn: fetchedRaw.answerEn ?? fetchedRaw.answer ?? "",
                answerAr: fetchedRaw.answerAr ?? fetchedRaw.answer_ar ?? "",
            }
            : null;

    // map fetched data into Formik initial values (works when fetched is null)
    const formInitialValues = {
        id: fetched?.id ?? null,
        questionEn: fetched?.questionEn ?? "",
        questionAr: fetched?.questionAr ?? "",
        answerEn: fetched?.answerEn ?? "",
        answerAr: fetched?.answerAr ?? "",
    };

    // determine edit mode: either an explicit faqId or an id in fetched data
    const isEdit = Boolean(faqId) || Boolean(formInitialValues.id);

    const validationSchema = Yup.object().shape({
        questionEn: Yup.string().required("Required"),
        questionAr: Yup.string().required("Required"),
        answerEn: Yup.string().required("Required"),
        answerAr: Yup.string().required("Required"),
    });

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Formik
                enableReinitialize
                initialValues={formInitialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    try {
                        if (isEdit) {
                            const id = faqId;
                            await updateFaq({ id, data: values });
                        } else {
                            const payload = { faqCategoryId: faqCategoryId, ...values }
                            await createFaq(payload);
                        }
                        resetForm();
                        onClose();
                    } catch (err) {
                        console.error("FAQ save failed:", err);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting, errors, touched }) => (
                    <Form
                        className="space-y-4 w-full sm:w-[420px] md:w-[640px] lg:w-[780px] mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <label className="text-sm font-semibold text-primary">Question (EN)</label>
                            <Field name="questionEn">
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="Question in English"
                                        dir="ltr"
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.questionEn && touched.questionEn ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="questionEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-primary">Question (AR)</label>
                            <Field name="questionAr">
                                {({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        placeholder="السؤال بالعربية"
                                        dir="rtl"
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.questionAr && touched.questionAr ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="questionAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-primary">Answer (EN)</label>
                            <Field name="answerEn">
                                {({ field }) => (
                                    <textarea
                                        {...field}
                                        placeholder="Answer in English"
                                        rows={4}
                                        dir="ltr"
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg resize-vertical focus:outline-none focus:ring-2 transition-all duration-300 ${errors.answerEn && touched.answerEn ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="answerEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-primary">Answer (AR)</label>
                            <Field name="answerAr">
                                {({ field }) => (
                                    <textarea
                                        {...field}
                                        placeholder="الإجابة بالعربية"
                                        rows={4}
                                        dir="rtl"
                                        disabled={isSubmitting}
                                        className={`w-full px-4 py-3 border rounded-lg resize-vertical focus:outline-none focus:ring-2 transition-all duration-300 ${errors.answerAr && touched.answerAr ? "border-red-300 focus:ring-red-200 bg-red-50" : "border-gray-300 focus:ring-primary focus:border-primary"}`}
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="answerAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                        </div>

                        <button type="submit" disabled={isSubmitting} className={`w-full px-3 py-2 rounded text-sm text-white ${isSubmitting ? "bg-gray-400" : "bg-primary hover:opacity-95"}`}>
                            {isEdit ? t("Update") : t("Save")}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default FAQModal;
