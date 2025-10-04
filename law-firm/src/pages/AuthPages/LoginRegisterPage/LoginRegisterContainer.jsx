// libs
import { useState } from "react"
// components
import LoginRegisterPresentational from "./LoginRegisterPresentational"

function LoginRegisterContainer() {
    const [useAuthToggle, setUseAuthToggle] = useState('login');

    function handleAuthToggle(state) {
        if (state === 'login') { setUseAuthToggle('login') }
        else { setUseAuthToggle('signUp') }
    }
    return (
        <>
            <LoginRegisterPresentational
                useAuthToggle={useAuthToggle}
                handleAuthToggle={handleAuthToggle}
            />
        </>
    )
}

export default LoginRegisterContainer
