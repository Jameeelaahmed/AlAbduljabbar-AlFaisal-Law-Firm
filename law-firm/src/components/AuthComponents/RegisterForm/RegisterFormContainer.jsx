// libs
import { useState } from 'react'
//components
import RegisterFormPresentational from './RegisterFormPresentational'

function RegisterFormContainer() {
    const [serverMessage, setServerMessage] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <RegisterFormPresentational
            serverMessage={serverMessage}
            setServerMessage={setServerMessage}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
        />
    )
}

export default RegisterFormContainer
