import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const popularProposals = joi.object({
    user_id: joi.string().required().messages(joiMsg)
});

export default popularProposals;