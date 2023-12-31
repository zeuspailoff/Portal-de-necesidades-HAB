import validateSchema from '../../helpers/validationSchema.helper.js';
import updateDemandStatusSchema from '../../schemas/demands/updateDemandStatus.schema.js';
import { updateDemandStatusById } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    
    const { demand_id, status } = req.body;
    
    try {
        await validateSchema(updateDemandStatusSchema, req.body);
        
        await updateDemandStatusById(demand_id, status);
        res.send({
            status: 200,
            message: `Demand with ID: ${demand_id} status modified successfully. New status: ${status}`
        })
    } catch (error) {
        next(error);
    }
};

export default main;