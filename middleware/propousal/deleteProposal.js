import { deleteProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {
    try {

        await deleteProposalById(req.params.id);

        res.send({
            status: 200,
            message: 'Propousal is deleted successfully😁'
        })

    } catch (error) {
        next(error);
    }
};
export default main;