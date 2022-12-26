import React, { useState, useEffect } from 'react';
import { validate } from './validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import notify from './Toast';
import styles from "./style/SignUp.module.css";
import { Link } from 'react-router-dom';

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    useEffect(() => {
        setErrors(validate(data , "login"));
    }, [data, touched]);

    const changeHandler = (event) => {
            setData({ ...data, [event.target.name]: event.target.value })
    };

    const focusHandler = event => {
        setTouched({ ...touched, [event.target.name]: true })
    };

    const submitHandler = event => {
        event.preventDefault();
        if (!Object.keys(errors).length) {
            notify('You Logged up successfully', "success");
        } else {
            notify('Invalid data!', "error");
            setTouched({
                email: true,
                password: true,
            })
        }
    };

    return (
        <div className={styles.container}>

            <form onSubmit={submitHandler} className={styles.formContainer}>

                <h2 className={styles.header}>Login</h2>

                <div className={styles.formField}>
                    <label>Email</label>
                    <input
                        className={(errors.email && touched.email) ? styles.uncompleted : styles.formInput}
                        type="email"
                        name='email'
                        value={data.email}
                        onChange={changeHandler}
                        onFocus={focusHandler}>
                    </input>
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>

                <div className={styles.formField}>
                    <label>Password</label>
                    <input
                        className={(errors.password && touched.password) ? styles.uncompleted : styles.formInput}
                        type="password"
                        name='password'
                        value={data.password}
                        onChange={changeHandler}
                        onFocus={focusHandler}>
                    </input>
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>

                <div className={styles.formButtons}>
                    <Link to='/SignUp'>Sign up</Link>
                    <button type='submit'>Login</button>
                </div>

            </form>
            <ToastContainer />
        </div>
    );
}

export default Login; 