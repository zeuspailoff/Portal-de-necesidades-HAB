import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const insertNewProposalSchema = joi.object({
    description: joi.string().min(10).max(1000).required().messages(joiMsg)
});

export default insertNewProposalSchema;