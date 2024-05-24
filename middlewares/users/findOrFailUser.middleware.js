import { findOrFailUserById, getOwnUserById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {

    const { user_id } = req.params;

    const loggedUserId = extractUserIdFromToken(req.headers.authorization)

    try {
        let user = {};

        if (user_id != loggedUserId) {
            user = await findOrFailUserById(user_id);
        } else {
            user = await getOwnUserById(user_id);
        }

        res.user = { ...res.user, ...user[0] }

        next();
    } catch (error) {
        next(error)
    }
}

export default main;

