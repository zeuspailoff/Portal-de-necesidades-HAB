import validateSchema from '../../helpers/validationSchema.helper.js'
import demandExistsValidateSchema from '../../schemas/demands/validateDemandExists.schema.js';
import { demandAlreadyExists }  from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { demand_id } = req.body;
    
    try {
        await validateSchema(demandExistsValidateSchema, req.body);

        const response = await demandAlreadyExists(demand_id);

        req.demand = response[0];

        next();
        
    } catch (error) {
        next(error);
    }
};

export default main;