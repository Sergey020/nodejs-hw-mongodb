import {HttpError} from 'http-errors';


// eslint-disable-next-line no-unused-vars
export const errorHendler = (err, req, res, next) => {
    if (err instanceof HttpError) {
    res.status(err.status).json({
        status: err.status,
        message: err.name,
        data: err,
    });
    return;
}
res.status(500).json({
    status: 500,
    message: 'Something went wron',
    data: err.message,
});
};