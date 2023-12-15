import validateSchema from '../../helpers/validationSchema.helper.js';
import updateUserSchema from '../../schemas/users/updateUser.schema.js';
import { updateUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    
    const { id, username, email, password, biography, birthdate, phone, name, lastname } = req.body;
    
    try {
        await validateSchema(updateUserSchema, req.body);
        const response = await updateUserById(id, username, email, password, biography, birthdate, phone, name, lastname);
        res.send({
            status: 200,
            message: `User with ID: ${id} modified successfully.`,
            data: {
                id: response.id,
                username: username,
                email: email,
                biography: biography,
                birthdate: birthdate,
                phone: phone,
                name: name,
                lastname: lastname
            }
        })
    } catch (error) {
        next(error);
    }
};

export default main;