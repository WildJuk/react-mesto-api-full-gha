import FormSign from './FormSign.js';

const Login = ({ onLogin }) => {
    return (
        <FormSign formType="in" onLogin={onLogin}/>
    )
}

export default Login;