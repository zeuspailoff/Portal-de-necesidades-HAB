import { editProposalById } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    try {
        await editProposalById(req.params.id, req.body.description);

        res.send({
            status: 200,
            message: 'Propousal is edited successfully😁'
        });
    } catch (error) {
        next(error);
    }
};

export default main;