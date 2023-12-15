import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const isOwnerSchema = joi.object({
    user_id: joi.number().integer().required().messages(joiMsg),
    demand_id: joi.number().integer().required().messages(joiMsg),
    proposal_id: joi.number().integer().allow('').messages(joiMsg)
});

export default isOwnerSchema;