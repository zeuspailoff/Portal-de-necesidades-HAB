import { createProposal } from "../../controllers/proposal.controller.js";
const main = async (req, res, next) => {
    try {
        console.log(req.body);
        await createProposal(req.body);



        res.status(200).json({
            message: 'Propousal is created successfully😁',
            user: req.body.user_id,
            demand: req.body.demand_id,
            data: req.body.description
        });

    } catch (error) {
        next(error);
    }
};
export default main;