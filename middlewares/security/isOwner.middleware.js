import validateSchema from "../../helpers/validationSchema.helper.js";
import isOwnerSchema from '../../schemas/users/isOwner.schema.js';

const main = async(req,res,next)=>{
    try {
        
        await validateSchema(isOwnerSchema,req.body);

        const { proposal, demand } = req;
        
        if(proposal){
            if(proposal.user_id !== req.user.id){
                errors.notAuthorizedError("No está autorizado para editar esta entrada","NOT_AUTHORIZED");
            }
        }

        if(demand){
            if(demand.user_id!== req.user.id){
                errors.notAuthorizedError("No está autorizado para editar esta entrada","NOT_AUTHORIZED");
            }
        }
 
        next();
        
    } catch (err) {
        next(err);
    }
}

export default main;