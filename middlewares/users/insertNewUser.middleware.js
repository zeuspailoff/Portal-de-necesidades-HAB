import randomstring from 'randomstring';
import validateSchema from '../../helpers/validationSchema.helper.js'
import insertNewUserSchema from '../../schemas/users/insertNewUser.schema.js';
import { createNewUser } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const files = req.files;

    try {
        await validateSchema(insertNewUserSchema, req.body);

        const registrationCode = randomstring.generate(30);

        const response = await createNewUser(req.body, registrationCode, files);
        res.send({
            status: 200,
            message: 'User inserted successfully😁',
            data: {
                "id:": response.insertId,
                "username": req.body.username,
                "email": req.body.email,
                "password": req.body.password,
                "biography": req.body.biography,
                "birthdate": req.body.birthdate,
                "phone": req.body.phone,
                "name": req.body.name,
                "lastname": req.body.lastname,
                "profile_picture": response.files[0]
            },

        })

    } catch (error) {
        next(error);
    }
};

export default main;