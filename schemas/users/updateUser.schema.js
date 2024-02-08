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
    biography: joi.string().min(5).max(1000).allow('').messages(joiMsg),
    files: joi.any()
});

export default updateUserSchema;