
// components
import LoginFormPresentational from "./LoginFormPresentational"
import { useLogin } from "../../../hooks/useLogin"
function LoginFormContainer() {
    const loginMutation = useLogin();

    return (
        <>
            <LoginFormPresentational loginMutation={loginMutation} />
        </>
    )
}

export default LoginFormContainer
