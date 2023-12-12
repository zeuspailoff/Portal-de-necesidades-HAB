import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const updateProposalSchema = joi.object({
    is_correct: joi.number().integer().required().messages(joiMsg)
});

export default updateProposalSchema; 