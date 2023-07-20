import FormSign from './FormSign.js';

const Register = ({ onRegister }) => {
    return (
        <FormSign formType="up" onRegister={onRegister}/>
    )
}

export default Register;