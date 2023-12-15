import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const proposalExistsValidateSchema = joi.object({
    proposal_id: joi.number().integer().required().messages(joiMsg),
    user_id: joi.number().integer().required().messages(joiMsg),
    demand_id: joi.number().integer().required().messages(joiMsg),
    description: joi.string().messages(joiMsg),
    files: joi.array().items(joi.string()).messages(joiMsg),
});

export default proposalExistsValidateSchema;