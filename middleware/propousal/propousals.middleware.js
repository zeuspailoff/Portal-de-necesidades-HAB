import { createProposal } from "../../controllers/proposal.controller.js";
const main = async (req, res, next) => {
    try {

        await createProposal(user_id, demand_id, description);



        res.status(200).json({
            message: 'Propousal is created successfully😁',
            user: req.body.userId,
            demand: req.body.demandId,
            data: req.body.description
        });

    } catch (error) {
        next(error);
    }
};
export default main;