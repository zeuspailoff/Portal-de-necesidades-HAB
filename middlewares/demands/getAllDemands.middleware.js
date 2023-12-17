import { getAllDemands } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    
    const { user_id } = req.body;
    
    try {
        const [...response] = await getAllDemands(user_id);
        
        res.send({
            status: 200,
            message: 'Demands fetched successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;