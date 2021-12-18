const express = require('express');

const config = require.main.require('./config');

const app = express();

// CORS

app.use(
    (
        req,
        res,
        next
    ) => {
        res.set(
            'Access-Control-Allow-Origin',
            '*'
        );

        res.set(
            'Access-Control-Allow-Headers',
            'Content-Type, Token'
        );

        return next();
    }
)

app.use(
    express.json(),
    require.main.require('./middlewares/auth')
);

config.routes.forEach(
    route => {
        app.use(
            `/${route}`,
            require.main.require(`./validators/${route}`),
            require.main.require(`./routers/${route}`)
        );

        return;
    }
);

// Errors

app.use(
    require.main.require('./middlewares/not-found'),
    require.main.require('./middlewares/error')
);

app.listen(8000);