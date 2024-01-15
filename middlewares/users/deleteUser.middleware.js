import { deleteUserById } from '../../controllers/users.controller.js'
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {


    const { id } = req.params;
    const loggedUserId = extractUserIdFromToken(req.headers.auth_token)

    try {

        if (id !== loggedUserId) {
            return res.status(401).send({
                status: 401,
                message: 'Unauthorized'
            })
        }

        const response = await deleteUserById(id);
        res.send({
            status: 200,
            message: `User with ID: ${id} deleted successfully`,
            data: {
                response
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;