import { findOrFailUserById, getOwnUserById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {

    const { user_id } = req.params;

    const loggedUserId = extractUserIdFromToken(req.headers.auth_token)
    try {
        let response = {};

        if (user_id != loggedUserId) {
            response = await findOrFailUserById(user_id);
        } else {
            response = await getOwnUserById(user_id);
        }

        res.send({
            status: 200,
            message: `User ${user_id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;