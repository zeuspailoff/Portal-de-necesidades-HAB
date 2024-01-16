import validateSchema from '../../helpers/validationSchema.helper.js';
import updateUserSchema from '../../schemas/users/updateUser.schema.js';
import { updateUserById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js'

const main = async (req, res, next) => {

    const user_id = extractUserIdFromToken(req.headers.auth_token);
    const { username, password, biography, birthdate, phone, name, lastname } = req.body;
    const files = req.files;
    const user = req.user;

    try {
        await validateSchema(updateUserSchema, req.body);
        const response = await updateUserById(user_id, username, password, biography, birthdate, phone, name, lastname, files, user);
        res.send({
            status: 200,
            message: `User with ID: ${user_id} modified successfully.`,
            data: {
                id: user_id,
                username: username,
                email: email,
                biography: biography,
                birthdate: birthdate,
                phone: phone,
                name: name,
                lastname: lastname,
                profile_picture: response.filesSrc
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;