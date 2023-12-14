import validateSchema from '../../helpers/validationSchema.helper.js'
import deleteUserSchema from '../../schema/users/deleteUser.schema.js'
import { deleteUserById } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {

    await validateSchema(deleteUserSchema, req.body);

    const { id } = req.body;

    try {
        await deleteUserById(id);
        res.send({
            status: 200,
            message: `User with ID: ${id} deleted successfully`
        })
    } catch (error) {
        next(error);
    }
};

export default main;