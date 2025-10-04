import RegisterFormContainer from "../../../components/AuthComponents/RegisterForm/RegisterFormContainer";
import authImg from '../../../assets/AuthPics/auth.jpg'
// import auth1 from '../../../assets/auth1.jpg'
import LoginFormContainer from "../../../components/AuthComponents/LoginForm/LoginFormContainer";
function LoginRegisterPresentational({ useAuthToggle, handleAuthToggle }) {
    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative p-8"
            style={{ backgroundImage: `url(${authImg})` }
            }
        >
            <div className="absolute inset-0 bg-black/40 z-10"></div>

            <div className="z-30 bg-white/90 rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-4">
                    {useAuthToggle === 'login' ?
                        <h2 className="text-2xl font-bold text-primary mb-2">تسجيل دخول </h2> :
                        <h2 className="text-2xl font-bold text-primary mb-2">إنشاء حساب جديد</h2>
                    }

                    <p className="text-secondary text-sm">انضم إلى مكتب العبدالجبار والفيصل للمحاماة</p>
                </div>
                <div className="flex justify-center gap-8 text-primary mb-6">
                    <div
                        className="relative cursor-pointer group"
                        onClick={() => handleAuthToggle('signUp')}
                    >
                        <p className="text-lg font-semibold py-2 px-4 transition-colors duration-300 hover:text-secondary">
                            إنشاء حساب
                        </p>
                        {/* Animated underline */}
                        <div className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 ease-in-out ${useAuthToggle === 'signUp'
                            ? 'w-full -translate-x-1/2'
                            : 'w-0 -translate-x-1/2'
                            }`}></div>
                    </div>

                    <div
                        className="relative cursor-pointer group"
                        onClick={() => handleAuthToggle('login')}
                    >
                        <p className="text-lg font-semibold py-2 px-4 transition-colors duration-300 hover:text-secondary">
                            تسجيل دخول
                        </p>
                        {/* Animated underline */}
                        <div className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transition-all duration-300 ease-in-out ${useAuthToggle === 'login'
                            ? 'w-full -translate-x-1/2'
                            : 'w-0 -translate-x-1/2'
                            }`}></div>
                    </div>
                </div>

                {useAuthToggle === 'login' ? <LoginFormContainer /> : <RegisterFormContainer />}
            </div>
        </div >
    );
}

export default LoginRegisterPresentational;
