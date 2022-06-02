import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ handleLogin }) {

    // Объявляю переменные состояния через хук useState
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    // Универсальный обработчик полей
    function handleChange(e) {
        const { name, value } = e.target
        setValues((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    // Обработчик формы
    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = values;
        handleLogin({ email, password });
    }

    return (
        <div className="login">
            <h3 className="login__title">Вход</h3>
            <form className="login__form" onSubmit={handleSubmit}>
                <label className="login__form-field">
                    <input className="login__input login__input_email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        required />
                </label>
                <span
                    id="error-login-email"
                    className="login__error">
                </span>
                <label className="login__form-field">
                    <input className="login__input login__input_password"
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                        required />
                </label>
                <span
                    id="error-login-email"
                    className="login__error">
                </span>
                <button className="login__submit" type="submit">Войти</button>
            </form>
            <p className="register__signin">Еще нет личного аккаунта? <Link to="/signup" className="register__signin_link">Зарегистрироваться</Link></p>
        </div>
    );
}
