import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const insertNewUserSchema = joi.object({
    id: joi.number().integer().required().messages(joiMsg),
    name: joi.string().min(5).max(50).required().messages(joiMsg),
    lastname: joi.string().min(5).max(50).required().messages(joiMsg),
    username: joi.string()
                  .min(3)
                  .max(30)
                  .required()
                  .pattern(/^\S$/)
                  .messages({...joiMsg.errorMsg, ...joiMsg.errorMsgUsername}),
    password: joi.string()
                  .pattern(/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[¡!$%^&()+|~=`{}:";'<>¿?,.])[a-zA-Z0-9¡!$%^&*()+|~=`{}:";'<>¿?,.]{8,}$/)
                  .required()
                  .messages({...joiMsg.errorMsg, ...joiMsg.errorMsgPassword}),
    email: joi.string().email().required().messages(joiMsg.errorMsg),
    biography: joi.string().min(5).max(1000).required().messages(joiMsg),
    birthdate: joi.date().iso().required().messages(joiMsg),
    phone: joi.string().min(5).max(15).required().messages(joi),
    profile_picture: joi.string().min(5).max(20).required().messages(joi),
});

export default insertNewUserSchema; 

