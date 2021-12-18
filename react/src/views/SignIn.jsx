import React from 'react';

import {
    withRouter
} from 'react-router';

import styles from '../css/SignIn.module.css';

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            loginEmail: '',
            loginPassword: '',
            registerEmail: '',
            registerUsername: '',
            registerPassword: '',
            registerConfirmationPassword: '',
            login: true,
            loginMessage: '',
            registerMessage: ''
        };

        return;
    }

    setLoginEmail = loginEmail => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                loginEmail
            }
        )
    );

    setLoginPassword = loginPassword => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                loginPassword
            }
        )
    );

    setRegisterEmail = registerEmail => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                registerEmail
            }
        )
    );

    setRegisterUsername = registerUsername => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                registerUsername
            }
        )
    );

    setRegisterPassword = registerPassword => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                registerPassword
            }
        )
    );

    setRegisterConfirmationPassword = registerConfirmationPassword => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                registerConfirmationPassword
            }
        )
    );

    setLoginMessage = loginMessage => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                loginMessage
            }
        )
    );

    setRegisterMessage = registerMessage => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                registerMessage
            }
        )
    );

    setLogin = login => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                login
            }
        )
    );

    render()
    {
        const {
            history,
            setToken
        } = this.props;

        const {
            login,
            loginEmail,
            loginPassword,
            registerEmail,
            registerUsername,
            registerPassword,
            registerConfirmationPassword,
            loginMessage,
            registerMessage
        } = this.state;

        const {
            setLoginEmail,
            setLoginPassword,
            setRegisterEmail,
            setRegisterUsername,
            setRegisterPassword,
            setLoginMessage,
            setRegisterMessage,
            setLogin
        } = this;

        // Styles

        const containerStyle = {
            minHeight: '92vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(#0185A3, #63C866)',
            fontFamily: 'sans-serif'
        };

        const formStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            width: '350px',
            padding: '50px',
            borderRadius: '15px',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 25px 45px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        };

        const inputStyle = {
            outline: 'none',
            border: 'none',
            background: 'transparent',
            borderBottom: '2px #000000 solid',
            padding: '0px',
            height: '50px',
            marginBottom: '30px'
        };

        const buttonStyle = {
            border: 'none',
            height: '50px',
            background: '#000000',
            color: '#FFFFFF',
            fontSize: '18px'
        };

        return (
            <div
                style={containerStyle}
            >
                <div
                    style={formStyle}
                >
                    {
                        login ?
                        <>
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Email'
                                value={loginEmail}
                                onChange={
                                    event => {
                                        setLoginEmail(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Password'
                                value={loginPassword}
                                type='password'
                                onChange={
                                    event => {
                                        setLoginPassword(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <button
                                style={buttonStyle}
                                onClick={
                                    () => {
                                        fetch(
                                            'http://localhost:8000/login',
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(
                                                    {
                                                        email: loginEmail,
                                                        password: loginPassword
                                                    }
                                                )
                                            }
                                        )
                                            .then(
                                                response => response.json()
                                            )
                                            .then(
                                                login => {
                                                    if(!login.success)
                                                    {
                                                        setLoginMessage(login.error);
                                                        return;
                                                    }

                                                    setToken(login.token);
                                                    localStorage.setItem(
                                                        'token',
                                                        login.token
                                                    );

                                                    history.push('/');

                                                    return;
                                                }
                                            );

                                        return;
                                    }
                                }
                            >
                                Login
                            </button>
                            {
                                Array.isArray(loginMessage) ?
                                loginMessage.map(
                                    message => (
                                        <>
                                            <p>{message}</p>
                                        </>
                                    )
                                ) :
                                loginMessage
                            }
                            <p>
                                Don't have an account?&nbsp;
                                <a
                                    href='#'
                                    onClick={
                                        event => {
                                            event.preventDefault();
                                            setLogin(false);
                                            return;
                                        }
                                    }
                                >
                                    Sign Up
                                </a>
                            </p>
                        </> :
                        <>
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Email'
                                value={registerEmail}
                                onChange={
                                    event => {
                                        setRegisterEmail(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Username'
                                value={registerUsername}
                                onChange={
                                    event => {
                                        setRegisterUsername(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Password'
                                value={registerPassword}
                                type='password'
                                onChange={
                                    event => {
                                        setRegisterPassword(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <input
                                style={inputStyle}
                                className={styles.input}
                                placeholder='Password Confirmation'
                                value={registerConfirmationPassword}
                                type='password'
                                onChange={
                                    event => {
                                        this.setRegisterConfirmationPassword(event.target.value);
                                        return;
                                    }
                                }
                            />
                            <button
                                style={buttonStyle}
                                onClick={
                                    () => {
                                        fetch(
                                            'http://localhost:8000/register',
                                            {
                                                method: 'POST',
                                                headers:
                                                {
                                                    'Content-Type': 'application/json'
                                                },
                                                body: JSON.stringify(
                                                    {
                                                        email: registerEmail,
                                                        username: registerUsername,
                                                        password: registerPassword
                                                    }
                                                )
                                            }
                                        )
                                            .then(
                                                response => response.json()
                                            )
                                            .then(
                                                register => {
                                                    if(!register.success)
                                                    {
                                                        setRegisterMessage(register.error);
                                                        return;
                                                    }

                                                    setRegisterMessage('Successfully registered, you can now log in');
                                                    return;
                                                }
                                            );

                                        return;
                                    }
                                }
                            >
                                Register
                            </button>
                            {
                                Array.isArray(registerMessage) ?
                                registerMessage.map(
                                    message => (
                                        <>
                                            <p>{message}</p>
                                        </>
                                    )
                                ) :
                                registerMessage
                            }
                            <p>
                                Already have an account?&nbsp;
                                <a
                                    href='#'
                                    onClick={
                                        event => {
                                            event.preventDefault();
                                            setLogin(true);
                                            return;
                                        }
                                    }
                                >
                                    Sign In
                                </a>
                            </p>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(SignIn);