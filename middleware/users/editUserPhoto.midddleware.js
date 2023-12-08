import validateSchema from "../../helpers/validationSchema.helper.js";
import editUserPhotoSchema from "../../schemas/users/editUserPhoto.schema.js";
import { editUserPhoto } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        await validateSchema(editUserPhotoSchema, req.files || {});

        await editUserPhoto(req.files.photo, req.user);

        res.send({
            status: "OK",
            message: "Foto de perfil del usuario actualizado",
        })
    } catch (err) {
        next(err);
    }
}

export default main;