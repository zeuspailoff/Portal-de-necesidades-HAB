import validateSchema from '../../helpers/validationSchema.helper.js'
import insertNewUserSchema from '../../schema/users/insertNewUser.schema.js';
import { createNewUser } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { username, email, password, biography, birthdate, phone, name, lastname } = req.body;


    try {

        await validateSchema(insertNewUserSchema, req.body);

        const response = await createNewUser(username, email, password, biography, birthdate, phone, name, lastname);

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

            },

        })

    } catch (error) {
        next(error);
    }
};

export default main;