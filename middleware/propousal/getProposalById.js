import { getProposal } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    try {


        const proposals = await getProposal(req.params.id);

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
