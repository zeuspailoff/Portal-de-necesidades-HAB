import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const getProposalByIdSchema = joi.object({
    proposal_id: joi.number().integer().required().messages(joiMsg)
});

export default getProposalByIdSchema;