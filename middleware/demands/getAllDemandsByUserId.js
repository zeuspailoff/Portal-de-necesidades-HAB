import { getAllDemandsByUserId } from "../../controllers/demands.controller.js";

const main = async (req, res, next) => {
    try {
        const [...response] = await getAllDemandsByUserId(req.body.user_id);
        res.send({
            status: 200,
            message: `All demands from User ID: ${req.body.user_id} fetched successfully`,
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;