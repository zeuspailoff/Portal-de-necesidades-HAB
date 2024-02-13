import validateSchema from '../../helpers/validationSchema.helper.js';
import updateUserSchema from '../../schemas/users/updateUser.schema.js';
import { updateUserById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js'

const main = async (req, res, next) => {

    const user_id = extractUserIdFromToken(req.headers.auth_token);
    const { username, biography, name, lastname } = req.body;
    const files = req.files;
    const user = res.user;

    try {
        await validateSchema(updateUserSchema, req.body);
        const response = await updateUserById(user_id, username, biography, name, lastname, files, user);
        res.send({
            status: 200,
            message: `User with ID: ${user_id} modified successfully.`,
            data: {
                id: user_id,
                username: username,
                biography: biography,
                name: name,
                lastname: lastname,
                profile_picture: response.avatar
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;