import validateSchema from '../../helpers/validationSchema.helper.js'
import updateProposalStatusSchema from '../..schemas/proposals/updateProposalStatus.schema.js'
import { updateProposalStatus }  from '../../controllers/proposal.controller.js';

const main = async (req, res, next) => {

    await validateSchema(updateProposalStatusSchema, req.body);

    const { id } = req.body;
    
    try {

        const response = await updateProposalStatus(id);

        res.send({
          status: 200,
          message: "Proposal status is_correct changed successfully",
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