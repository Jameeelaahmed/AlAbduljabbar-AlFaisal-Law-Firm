// libs
import { useState } from "react"
// components
import LoginRegisterPresentational from "./LoginRegisterPresentational"

function LoginRegisterContainer() {
    const [useAuthToggle, setUseAuthToggle] = useState(false);

    function handleAuthToggle() {
        setUseAuthToggle(!useAuthToggle);
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
