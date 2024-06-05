import jwt from 'jsonwebtoken';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            errors.notAthenticatedError();
        }

        let tokenInfo;

        try {

            tokenInfo = jwt.verify(authorization, process.env.SECRET);
        } catch (err) {
            errors.unauthorizedUser();
        }

        req.user = tokenInfo;


        next();
    } catch (err) {
        next(err);
    }
}

export default main;