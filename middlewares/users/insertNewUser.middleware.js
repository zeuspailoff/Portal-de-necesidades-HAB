import randomstring from 'randomstring';
import validateSchema from '../../helpers/validationSchema.helper.js'
import insertNewUserSchema from '../../schemas/users/insertNewUser.schema.js';
import { createNewUser } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { username, email, password, biography, birthdate, phone, name, lastname } = req.body;
    const file = req.file;

    await validateSchema(insertNewUserSchema, req.body);

    try {

        const registrationCode = randomstring.generate(30);
        const response = await createNewUser(username, email, password, biography, birthdate, phone, name, lastname, registrationCode, file);

        res.send({
            status: 200,
            message: 'User inserted successfully😁',
            data: {
                "id:": response.insertId,
                "username": username,
                "email": email,
                "password": password,
                "biography": biography,
                "birthdate": birthdate,
                "phone": phone,
                "name": name,
                "lastname": lastname,
                profilePicture: response.profilePicture
            },

        })

    } catch (error) {
        next(error);
    }
};

export default main;