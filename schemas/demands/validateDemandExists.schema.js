import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const demandExistsValidateSchema = joi.object({
    user_id: joi.number().integer().messages(joiMsg),
    demand_id: joi.number().integer().required().messages(joiMsg),
    status: joi.number().integer().messages(joiMsg),
    title: joi.string().messages(joiMsg),
    description: joi.string().min(10).max(1000).required().messages(joiMsg),
    files: joi.array().items(joi.string().min(10).max(1000).messages(joiMsg))
});

export default demandExistsValidateSchema; 