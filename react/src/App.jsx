import React from 'react';

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import Header from './views/Header';

import Home from './views/Home';
import Product from './views/Product';
import About from './views/About';
import SignIn from './views/SignIn';
import Dashboard from './views/Dashboard';

class App extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            header: true,
            token: null
        };

        return;
    }

    setHeader = header => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                header
            }
        )
    );

    setToken = token => this.setState(
        (
            state,
            props
        ) => (
            {
                ...state,
                token
            }
        )
    );

    componentDidMount()
    {
        const {
            setToken
        } = this;

        setToken(
            localStorage.getItem('token')
        );

        console.log(this.token);

        return;
    }

    render()
    {
        const {
            header,
            token
        } = this.state;

        const {
            setToken
        } = this;

        // Styles

        const containerStyle = {
            margin: '-8px'
        };

        return (
            <div
                style={containerStyle}
            >
                <BrowserRouter>
                    {
                        header ?
                        <Header
                            token={token}
                            setToken={setToken}
                        /> : null
                    }
                    <Switch>
                        {
                            !token ?
                            <Route
                                path='/sign-in'
                            >
                                <SignIn
                                    setToken={setToken}
                                />
                            </Route> : null
                        }
                        {
                            token ?
                            <Route
                                path='/dashboard'
                            >
                                <Dashboard
                                    token={token}
                                />
                            </Route> : null
                        }
                        <Route
                            path='/product'
                        >
                            <Product/>
                        </Route>
                        <Route
                            path='/about'
                        >
                            <About/>
                        </Route>
                        <Route
                            path='/'
                        >
                            <Home/>
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}


export default App;