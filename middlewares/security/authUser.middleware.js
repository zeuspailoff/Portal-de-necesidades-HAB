import jwt from 'jsonwebtoken';
import errors from '../../helpers/errors.helper.js';

const main = async (req, res, next) => {
    try {
        const { auth_token } = req.headers;
        console.log("auth_token", auth_token);
        if (!auth_token) {
            errors.notAthenticatedError();
        }

        let tokenInfo;

        try {

            console.log("process.env.SECRET", process.env.SECRET);
            tokenInfo = jwt.verify(auth_token, process.env.SECRET);
            console.log("tokenInfo", tokenInfo);
        } catch (err) {
            errors.unauthorizedUser();
        }

        req.user = tokenInfo;
        console.log("user", req.user);

        next();
    } catch (err) {
        next(err);
    }
}

export default main;