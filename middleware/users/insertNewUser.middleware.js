import validateSchema from '../../helpers/validationSchema.helper.js'
import insertNewUser from '../../schema/users/insertNewUser.schema.js';
import { createNewUser }  from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { username, email, password, biography, birthdate, phone, name, lastname, profile_picture } = req.body;
    const files = req.files;
    
    try {

        await validateSchema(newUserSchema, req.body);

        const response = await createNewUser(username, email, password, biography, birthdate, phone, name, lastname, profile_picture);

        res.send({
            status: 200,
            message: 'User inserted successfully😁',
            data: {
                "id:": response.insertId,
                "user_id": user_id,
                "username": username,
                "email": email,
                "password": password,
                "biography": biography,
                "birthdate": birthdate,
                "phone": phone,
                "name": name,
                "lastname": lastname,
                "profile_picture": profile_picture
            },

        })

    } catch (error) {
        next(error);
    }
};

export default main;