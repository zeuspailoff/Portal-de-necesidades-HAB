import validateSchema from '../../helpers/validationSchema.helper.js';
import passwordUpdateUserSchema from '../../schemas/users/passwordUpdateUser.schema.js';
import { editPasswordById } from '../../controllers/users.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {

    let recovery = '';
    let { user_id, password } = req.body;

    if (res.hasOwnProperty('user')) {
        recovery = res.user.password_recovered
    }

    try {

        const loggedUserId = extractUserIdFromToken(req.headers.auth_token);

        if (loggedUserId !== user_id) {
            res.status(400).send({
                status: 400,
                message: `You don't have permission to modify this user's password.`,

            })
        }

        await validateSchema(passwordUpdateUserSchema, req.body);
        const response = await editPasswordById(user_id, password, recovery);
        res.send({
            status: 200,
            message: `User password with ID: ${user_id} modified successfully.`,
            data: { response }
        })
    } catch (error) {
        next(error);
    }
};

export default main;