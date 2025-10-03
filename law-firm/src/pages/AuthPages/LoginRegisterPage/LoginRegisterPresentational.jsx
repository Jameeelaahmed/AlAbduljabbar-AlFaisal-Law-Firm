import RegisterFormContainer from "../../../components/AuthComponents/RegisterForm/RegisterFormContainer";
import authImg from '../../../assets/auth.jpg'
import auth1 from '../../../assets/auth1.jpg'
function LoginRegisterPresentational({ useAuthToggle, handleAuthToggle }) {
    return (
        <div
            className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
            style={{ backgroundImage: `url(${authImg})` }
            }
        >
            <div className="">
                <RegisterFormContainer />
            </div>
        </div >
    );
}

export default LoginRegisterPresentational;
