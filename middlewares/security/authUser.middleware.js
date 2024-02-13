import jwt from 'jsonwebtoken';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
    try {
        const { auth_token } = req.headers;
        if (!auth_token) {
            errors.notAthenticatedError();
        }

        let tokenInfo;

        try {
            tokenInfo = jwt.verify(auth_token, process.env.SECRET);
        } catch (err) {
            errors.unauthorizedUser();
        }

        res.user = tokenInfo;

        next();
    } catch (err) {
        next(err);
    }
}

export default main;