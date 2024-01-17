import { deleteUserById } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {


    const { user_id } = req.params;

    try {

        const response = await deleteUserById(user_id);
        res.send({
            status: 200,
            message: `User with ID: ${user_id} deleted successfully`,
            data: {
                response
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;