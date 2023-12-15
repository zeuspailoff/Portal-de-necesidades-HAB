import validateSchema from "../../helpers/validationSchema.helper.js";
import getProposalByIdSchema from "../../schemas/proposals/getProposalById.schema.js";
import { getProposal } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    await validateSchema(getProposalByIdSchema, req.body);
    
    const { id } = req.body;

    try {

        const proposals = await getProposal(id);

        res.send({
            status: 200,
            message: 'Propousal successfully😁',
            data: {
                proposals
            }
        });
    } catch (error) {
        next(error);
    }
};
export default main;
