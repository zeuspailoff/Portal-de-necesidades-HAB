import joi from 'joi';
import joiMsg from '../joi.error.messages.js'

const updateUserSchema = joi.object({
    name: joi.string().min(1).max(50).messages(joiMsg),
    lastname: joi.string().min(1).max(50).messages(joiMsg),
    username: joi.string()
        .min(3)
        .max(50)
        .pattern(/^\S+$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }),
    password: joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!¡@$%^&*()_+|~=`{}\[\]:";'<>?,.])[a-zA-Z0-9!¡@$%^&*()_+|~=`{}\[\]:";'<>?,.]{8,}$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
    email: joi.string().email().messages(joiMsg),
    biography: joi.string().min(5).max(1000).allow('').messages(joiMsg),
    birthdate: joi.date().iso().messages(joiMsg),
    phone: joi.string().min(5).max(20).messages(joiMsg),
    files: joi.any()
});

export default updateUserSchema;