import { getProposalByDemandId } from "../../controllers/proposal.controller.js";

const main = async (req, res, next) => {

    try {


        const proposal = await getProposalByDemandId(req.params.id);

        res.send({
            status: 200,
            message: 'Propousal successfully😁',
            data: {
                proposal
            }
        });
    } catch (error) {
        next(error);
    }
};
export default main;
