import joi from 'joi';
import joiMsg from '../joi.error.messages.js'

const updateUserSchema = joi.object({
    user_id: joi.number().required().messages(joiMsg.errorMsg),
    name: joi.string().min(1).max(50).required().messages(joiMsg),
    lastname: joi.string().min(1).max(50).required().messages(joiMsg),
    username: joi.string()
        .min(3)
        .max(30)
        .required()
        .pattern(/^\S+$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }),
    password: joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[¡!$%^&*()_+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()_+|~=`{}:";'<>¿?,.]{8,}$/)
        .required()
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
    email: joi.string().email().required().messages(joiMsg),
    biography: joi.string().min(5).max(1000).allow('').messages(joiMsg),
    birthdate: joi.date().iso().required().messages(joiMsg),
    phone: joi.string().min(5).max(15).required().messages(joiMsg),
    files: joi.array().allow('').items(joi.string().min(10).max(1000).messages(joiMsg)),
});

export default updateUserSchema;