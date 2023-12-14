import validateSchema from '../../helpers/validationSchema.helper.js'
import deleteUserSchema from '../../schema/users/deleteUser.schema.js'
import { deleteUserById } from '../../controllers/users.controller.js'

const main = async (req, res, next) => {

    await validateSchema(deleteUserSchema, req.params);

    const { id } = req.params;

    try {
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