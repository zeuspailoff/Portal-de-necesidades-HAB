import validateSchema from '../../helpers/validationSchema.helper.js';
import validateUserSchema from '../../schemas/users/validateUser.schema.js';
import { validateUserByRegistrationCode } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    
    const { registrationCode } = req.params;
    
    try {
        await validateSchema(validateUserSchema, req.params);
        const user = await validateUserByRegistrationCode(registrationCode);
        res.send({
            status: 200,
            message: `User with ID: ${user.id} validated successfully`
        })
        next();
    } catch (error) {
        next(error);
    }
};

export default main;
