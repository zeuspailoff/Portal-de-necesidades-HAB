import joi from 'joi';
import joiMsg from '../joi.error.messages.js';

const newDemandSchema = joi.object({
    title: joi.string().min(5).max(50).required().messages(joiMsg),
    description: joi.string().min(10).max(1000).required().messages(joiMsg)
});

export default newDemandSchema; 