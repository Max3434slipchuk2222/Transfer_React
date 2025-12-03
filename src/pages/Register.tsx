import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage, type FormikHelpers} from 'formik';
import * as yup from 'yup';
import type {IRegisterModel} from "../Interfaces/IRegisterModel.ts";

const RegisterSchema = yup.object({
    firstName: yup.string().required("Введіть ім'я"),
    lastName: yup.string().required("Введіть прізвище"),
    email: yup.string().email("Некоректна пошта").required("Введіть пошту"),
    password: yup.string().required("Введіть пароль").min(6, "Мінімум 6 символів"),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Паролі не співпадають')
        .required('Підтвердіть пароль')
});

const RegisterPage = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (values: IRegisterModel, { setSubmitting, setStatus }:FormikHelpers<IRegisterModel>) => {
        try {
            await register(values);
            navigate("/");
        } catch (error) {
            setStatus(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-gray-900">Реєстрація</h1>

                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
                    validationSchema={RegisterSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, status }) => (
                        <Form className="space-y-4">
                            {status && <div className="text-red-500 text-center text-sm bg-red-50 p-2 rounded">{status}</div>}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ім'я</label>
                                    <Field name="firstName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <ErrorMessage name="firstName" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Прізвище</label>
                                    <Field name="lastName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                    <ErrorMessage name="lastName" component="div" className="text-red-500 text-xs mt-1" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <Field name="email" type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Пароль</label>
                                <Field name="password" type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Підтвердження паролю</label>
                                <Field name="confirmPassword" type="password" className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:bg-gray-400"
                            >
                                {isSubmitting ? "Реєстрація..." : "Створити акаунт"}
                            </button>
                        </Form>
                    )}
                </Formik>

                <div className="text-center text-sm text-gray-600">
                    Вже є акаунт? <Link to="/login" className="text-blue-600 hover:underline">Увійти</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;