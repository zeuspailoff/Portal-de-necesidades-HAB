import validateSchema from '../../helpers/validationSchema.helper.js'
import updateProposalStatusSchema from "../../schemas/proposals/updateProposalStatus.schema.js";
import { updateProposalStatusById }  from '../../controllers/proposal.controller.js';

const main = async (req, res, next) => {

    
    const { id } = req.body;
    
    try {
        await validateSchema(updateProposalStatusSchema, req.body);

        const response = await updateProposalStatusById(id);

        res.send({
          status: 200,
          message: "Proposal status (is_correct) updated successfully",
          data: {
              response
          }
        })

        next();
        
    } catch (error) {
        next(error);
    }
};

export default main;