// libs
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function RegisterFormPresentational() {
    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={Yup.object({
                firstName: Yup.string().max(
                    15, 'Must be 15 characters or less')
                    .required('firstname is required'
                    ),
                lastName: Yup.string().max(
                    15, 'Must be 15 characters or less')
                    .required('lastname is required'
                    ),
                email: Yup.string().email('Invalid email address').required('email is required'),
                password: Yup.string()
                    .min(8, 'password is required')
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    )
                    .required('password is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('confirm password is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    setSubmitting(false)
                }, 400);
            }}
        >
            <Form>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" />
                    <ErrorMessage name='firstName' />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" />
                    <ErrorMessage name='lastName' />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" />
                    <ErrorMessage name='email' />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name='password' />
                </div>
                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field name="confirmPassword" type="password" />
                    <ErrorMessage name='confirmPassword' />
                </div>
                <button type='submit'>Sign Up</button>
            </Form>
        </Formik>
    )
}

export default RegisterFormPresentational
