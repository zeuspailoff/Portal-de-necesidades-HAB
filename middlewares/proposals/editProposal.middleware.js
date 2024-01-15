import validateSchema from "../../helpers/validationSchema.helper.js";
import editProposalSchema from "../../schemas/proposals/editProposal.schema.js";
import { editProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    const { proposal_id } = req.proposal.id;
    const { description } = req.body;
    
    try {
        await validateSchema(editProposalSchema, req.body);
        
        await editProposalById(proposal_id, description);

        res.send({
            status: 200,
            message: 'Propousal was edited successfully😁',
            data:{
                id: proposal_id,
                description: description
            }
        });
    } catch (error) {
        next(error);
    }
};

export default main;