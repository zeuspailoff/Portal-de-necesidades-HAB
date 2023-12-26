import validateSchema from "../../helpers/validationSchema.helper.js";
import insertNewUserSchema from "../../schema/users/insertNewUser.schema.js";
import { insertNewUser } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {

    validateSchema(insertNewUserSchema, req.body);

    const {
        username,
        email,
        biography,
        birthdate,
        phone,
        name,
        lastname,
        profile_picture
    } = req.body;

    try {
        console.log(req.body);
        response = await insertNewUser(
            username,
            email,
            password,
            biography,
            birthdate,
            phone,
            name,
            lastname,
            profile_picture);

        res.status(200).json({
            message: 'User was created successfully😁',
            id: response.insertId,
            name: name,
            lastname: lastname,
            username: username,
            email: email,
            biography: biography,
            birthdate: birthdate,
            phone: phone,
            profile_picture: profile_picture
        });

    } catch (error) {
        next(error);
    }
};
export default main;