// built-in
import path from 'path';
// external
import bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';

import controllers from '../controllers';


export default function (app, config) {
    // use ejs and set views and static directories
    app.set('view engine', 'ejs');
    app.set('views', path.join(config.root, 'app/views'));
    app.use(express.static(path.join(config.root, 'static')));

    //add middlewares
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(compress());
    app.use(cookieParser());
    app.use(favicon(path.join(config.root, 'static/img/favicon.png')));

    // set all controllers
    app.use('/', controllers);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // general errors
    app.use((err, req, res, next) => {
        const sc = err.status || 500;
        res.status(sc);
        res.render('error', {
            status: sc,
            message: err.message,
            stack: config.env === 'development' ? err.stack : ''
        });
    });
}