import React from 'react';

import {
    Link
} from 'react-router-dom';

class Header extends React.Component
{
    constructor(props)
    {
        super(props);
        return;
    }

    render()
    {
        const {
            token,
            setToken
        } = this.props;

        // Styles

        const containerStyle = {
            height: '8vh',
            background: 'black',
            borderBottom: '2px solid #63C866',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'sans-serif'
        };

        const logoStyle = {
            color: '#EEEEEE',
            fontSize: '20px',
            letterSpacing: '2px',
            paddingLeft: '40px'
        };

        const linksStyle = {
            width: '35%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        };

        const linkStyle = {
            color: '#EEEEEE',
            textDecoration: 'none',
            letterSpacing: '2px',

        };

        const buttonStyle = {
            background: '#63C866',
            border: 'none',
            outline: 'none',
            padding: '10px',
            fontSize: '15px',
            letterSpacing: '2px'
        };

        return (
            <div
                style={containerStyle}
            >
                <h4
                    style={logoStyle}
                >
                    BeanStock
                </h4>

                <div
                    style={linksStyle}
                >
                    <Link
                        style={linkStyle}
                        to='/'
                    >
                        Home
                    </Link>
                    <Link
                        style={linkStyle}
                        to='/product'
                    >
                        Product
                    </Link>
                    <Link
                        style={linkStyle}
                        to='/about'
                    >
                        About
                    </Link>
                    {
                        token ?
                        <>
                            <Link
                                to='/dashboard'
                            >
                                <button
                                    style={buttonStyle}
                                >
                                        Dashboard
                                </button>
                            </Link>
                            <button
                                style={buttonStyle}
                                onClick={
                                    () => {
                                        setToken(null);
                                        localStorage.removeItem('token');
                                        return;
                                    }
                                }
                            >
                                    Logout
                            </button>
                        </> :
                        <Link
                            to='/sign-in'
                        >
                            <button
                                style={buttonStyle}
                            >
                                    Sign In
                            </button>
                        </Link>
                    }
                </div>
            </div>
        );
    }
}

export default Header;