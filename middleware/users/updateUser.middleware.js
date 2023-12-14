import validateSchema from '../../helpers/validationSchema.helper.js';
import updateUserSchema from '../../schema/users/updateUser.schema.js';
import { updateUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    await validateSchema(updateUserSchema, req.body);

    const { id, username, email, password, biography, birthdate, phone, name, lastname, profile_picture } = req.body;

    try {
        await updateUserById(id, username, email, password, biography, birthdate, phone, name, lastname, profile_picture);
        res.send({
            status: 200,
            message: `User with ID: ${user_id} modified successfully.`
        })
    } catch (error) {
        next(error);
    }
};

export default main;