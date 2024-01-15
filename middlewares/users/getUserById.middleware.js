import { findOrFailUserById, getOwnUserById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {
    const { id } = req.params;

    const loggedUserId = extractUserIdFromToken(req.headers.auth_token)



    try {

        if (id !== loggedUserId) {
            const response = await findOrFailUserById(id);
        } else {
            const response = await getOwnUserById(id);
        }

        res.send({
            status: 200,
            message: `User ${id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;