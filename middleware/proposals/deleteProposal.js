import validateSchema from "../../helpers/validationSchema.helper.js";
import deleteProposalSchema from "../../schema/proposals/deleteProposal.schema.js";
import { deleteProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    await validateSchema(deleteProposalSchema, req.body);

    const { id } = req.body;

    try {

        await deleteProposalById(id);

        res.send({
            status: 200,
            message: 'Propousal is deleted successfully😁'
        })

    } catch (error) {
        next(error);
    }
};
export default main;