import joi from "joi";
import joiMsg from "../joi.error.messages.js";

const getDemandByUserId = joi.object({
    user_id: joi.number().integer().required().messages(joiMsg)
});

