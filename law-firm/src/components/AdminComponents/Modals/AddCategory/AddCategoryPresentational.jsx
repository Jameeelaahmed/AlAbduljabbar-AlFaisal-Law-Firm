import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddCategoryPresentational({ t, handleToggleChange, selectedBranches, handleSubmit, createCategoryMutation }) {


    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={{ nameEn: '', nameAr: '', branchId: 0 }}
                    validationSchema={Yup.object({
                        nameEn: Yup.string().min(3).required('English name is required'),
                        nameAr: Yup.string().min(3).required('Arabic name is required'),
                        branchId: Yup.number().required('Branch selection is required')
                    })}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched, setFieldValue }) => (
                        <Form className="space-y-3">
                            {/* English Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameEn" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Category Name in English")}
                                </label>
                                <Field name="nameEn">
                                    {({ field }) => (
                                        <input
                                            {...field}
                                            type="text"
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameEn && touched.nameEn
                                                ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                }`}
                                            placeholder="ادخل اسم الفئه بالانجليزي"
                                            dir="ltr"
                                            disabled={isSubmitting || createCategoryMutation.isPending}
                                        />
                                    )}
                                </Field>
                                <ErrorMessage name="nameEn" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                            </div>

                            {/* Arabic Name */}
                            <div className="space-y-2">
                                <label htmlFor="nameAr" className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Category Name in Arabic")}
                                </label>
                                <div className="relative">
                                    <Field name="nameAr">
                                        {({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${errors.nameAr && touched.nameAr
                                                    ? 'border-red-300 focus:ring-red-200 bg-red-50'
                                                    : 'border-gray-300 focus:ring-primary focus:border-primary'
                                                    }`}
                                                placeholder="ادخل اسم الفئه بالعربي"
                                                dir="rtl"
                                                disabled={isSubmitting || createCategoryMutation.isPending}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="nameAr" component="div" className="text-red-500 text-xs mt-1 font-medium" />
                                </div>
                            </div>

                            {/* Branch Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    {t("Select Branch(es)")}
                                </label>
                                <div className="flex justify-around gap-2 md:gap-4 lg:gap-6 items-center">
                                    {/* Egypt Toggle */}
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm md:text-base font-medium transition-colors`}>{t("Egypt")}</span>
                                        <label
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isSubmitting && !createCategoryMutation.isPending) {
                                                    handleToggleChange('egypt', setFieldValue);
                                                }
                                            }}
                                            className={`relative inline-flex items-center w-10 h-6 md:w-12 md:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isSubmitting || createCategoryMutation.isPending
                                                ? 'opacity-50 cursor-not-allowed'
                                                : selectedBranches.egypt ? 'bg-primary' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${selectedBranches.egypt ? 'translate-x-4 md:translate-x-5' : 'translate-x-1'
                                                    }`}
                                            ></span>
                                        </label>
                                    </div>

                                    {/* Saudi Arabia Toggle */}
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm md:text-base font-medium transition-colors`}>{t("Saudi Arabia")}</span>
                                        <label
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isSubmitting && !createCategoryMutation.isPending) {
                                                    handleToggleChange('saudi', setFieldValue);
                                                }
                                            }}
                                            className={`relative inline-flex items-center w-10 h-6 md:w-12 md:h-7 rounded-full cursor-pointer transition-colors duration-200 ${isSubmitting || createCategoryMutation.isPending
                                                ? 'opacity-50 cursor-not-allowed'
                                                : selectedBranches.saudi ? 'bg-primary' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-white border-2 border-white shadow-md transform transition-transform duration-200 ${selectedBranches.saudi ? 'translate-x-4 md:translate-x-5' : 'translate-x-1'
                                                    }`}
                                            ></span>
                                        </label>
                                    </div>
                                </div>

                                {/* Branch ID Display (for debugging) */}
                                <Field name="branchId">
                                    {({ field }) => (
                                        <div className="text-xs text-gray-500 text-center">
                                            Branch ID: {field.value}
                                            {field.value === 0 && ' (Both branches)'}
                                            {field.value === 1 && ' (Egypt only)'}
                                            {field.value === 2 && ' (Saudi only)'}
                                        </div>
                                    )}
                                </Field>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || createCategoryMutation.isPending}
                                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform ${isSubmitting || createCategoryMutation.isPending
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
                                    }`}
                            >
                                {isSubmitting || createCategoryMutation.isPending ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        {t("Submitting...")}
                                    </div>
                                ) : (
                                    t("Submit Category")
                                )}
                            </button>

                            {/* Error Display */}
                            {createCategoryMutation.isError && (
                                <div className="text-red-500 text-sm text-center mt-2">
                                    {createCategoryMutation.error?.response?.data?.message || 'حدث خطأ أثناء إنشاء الفئة'}
                                </div>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default AddCategoryPresentational
