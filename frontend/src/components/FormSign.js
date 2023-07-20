import { useState } from "react";
import { Link } from "react-router-dom";

export default function FormSign({ formType, onRegister, onLogin }) {

    const formParamsFromType = {
        in: {
            name: 'sign-in',
            title: 'Вход',
            buttonText: 'Войти'
        },
        up: {
            name: 'sign-up',
            title: 'Регистрация',
            buttonText: 'Зарегистрироваться'
        }
    };

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        if (formType === 'in') {
            onLogin(formValue.email, formValue.password)
        } else if (formType === 'up') {
            onRegister(formValue.email, formValue.password)
        }

    };

    return (
        <div className="form-page">
            <form
                name={formParamsFromType[formType].name}
                className={'form form_type_sign'}
                noValidate
                onSubmit={handleSubmit}
            >
                <div>
                    <p className="form__title">{formParamsFromType[formType].title}</p>
                    <input
                        required
                        id="email"
                        type="text"
                        name="email"
                        className="form__input form__input_name_email form__input_type_white"
                        placeholder="Email"
                        value={formValue.email}
                        onChange={handleChange}
                    />
                    <p className="form__input-error email-error" />
                    <input
                        required
                        id="password"
                        type="password"
                        name="password"
                        className="form__input form__input_name_password form__input_type_white"
                        placeholder="Пароль"
                        value={formValue.password}
                        onChange={handleChange}
                    />
                    <p className="form__input-error password-error"></p>
                </div>

                <div>
                    <button
                        type="submit"
                        className="form__submit-button form__submit-button_white-mode"
                    >
                        {formParamsFromType[formType].buttonText}
                    </button>
                    {formType === 'up' &&
                        <Link
                            to='/sign-in'
                            className="form__sign-in-link"
                        >
                            Уже зарегистрированы? Войти
                        </Link>
                    }
                </div>
            </form>
        </div>

    )
}