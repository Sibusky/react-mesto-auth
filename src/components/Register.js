import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register({ handleRegister }) {

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
        handleRegister({ email, password });
    }

    return (
        <div className='register'>
            <h3 className='register__title'>Регистрация</h3>
            <form className='register__form' onSubmit={handleSubmit}>
                <label className='register__form_field'>
                    <input
                        className='register__input register__input_email'
                        type='email'
                        placeholder='Email'
                        name='email'
                        onChange={handleChange}
                        value={values.email}
                        required
                    />
                </label>
                <span id='error-register-email' className='register__error'></span>

                <label className='register__form-field'>
                    <input
                        className='register__input register__input_password'
                        type='password'
                        placeholder='Пароль'
                        name='password'
                        onChange={handleChange}
                        value={values.password}
                        required
                    />
                </label>
                <span id='error-register-email' className='register__error'></span>
                <button className='register__submit' type='submit'>Зарегистрироваться</button>
            </form>
            <p className='register__signin'>Уже зарегистрированы? <Link to='/signin' className='register__signin_link'>Войти</Link></p>
        </div>
    );

}
