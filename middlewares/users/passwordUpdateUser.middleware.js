import validateSchema from '../../helpers/validationSchema.helper.js';
import passwordUpdateUserSchema from '../../schemas/users/passwordUpdateUser.schema.js';
import { editPasswordById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    
    const { user_id, password } = req.body;
    
    try {
        await validateSchema(passwordUpdateUserSchema, req.body);
        const response = await editPasswordById(user_id, password);
        res.send({
            status: 200,
            message: `Password for User ${user_id} updated successfully.`,
            data: {response}
        })
    } catch (error) {
        next(error);
    }
};

export default main;