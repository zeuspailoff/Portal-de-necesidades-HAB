import joi from 'joi';
import joiMsg from '../joi.error.messages.js'

const updateUserSchema = joi.object({
    id: joi.number().required().messages(joiMsg.errorMsg),
    name: joi.string().min(5).max(50).messages(joiMsg),
    lastname: joi.string().min(5).max(50).messages(joiMsg),
    username: joi.string()
        .min(3)
        .max(30)
        //.pattern(/^\S$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgUsername }),
    password: joi.string()
        //.pattern(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[¡!$%^&()+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()+|~=`{}:";'<>¿?,.]{8,}$/)
        .messages({ ...joiMsg.errorMsg, ...joiMsg.errorMsgPassword }),
    email: joi.string().email().messages(joiMsg),
    biography: joi.string().min(5).max(1000).messages(joiMsg),
    birthdate: joi.date().iso().messages(joiMsg),
    phone: joi.string().min(5).max(15).messages(joiMsg),
});

export default updateUserSchema;