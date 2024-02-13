import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const deleteProposalSchema = joi.object({
    proposal_id: joi.number().integer().required().messages(joiMsg),
    user_id: joi.number().integer().required().messages(joiMsg),
    demand_id: joi.number().integer().messages(joiMsg)
})

export default deleteProposalSchema;