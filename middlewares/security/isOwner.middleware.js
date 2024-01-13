import validateSchema from "../../helpers/validationSchema.helper.js";
import isOwnerSchema from '../../schemas/users/isOwner.schema.js';
import errors from "../../helpers/errors.helper.js";

const main = async(req,res,next)=>{
    try {
        
        await validateSchema(isOwnerSchema,req.body);
        let entity = {};

        if(req.proposal){
            entity = req.proposal;
        }else{
            entity = req.demand;
        }

        if(entity.user_id != req.body.user_id){
            errors.notAuthorizedError("User not authorized to edit or modify this entry", "NOT_AUTHORIZED");
        }
 
        next();
        
    } catch (err) {
        next(err);
    }
}

export default main;