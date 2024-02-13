import validateSchema from '../../helpers/validationSchema.helper.js'
import newDemandSchema from '../../schemas/demands/newDemand.schema.js';
import { createDemand } from '../../controllers/demands.controller.js';
import extractUserIdFromToken from '../../helpers/extractUserIdFromToken.helper.js';

const main = async (req, res, next) => {


    const user_id = extractUserIdFromToken(req.headers.auth_token);
    const { title, description, category_id } = req.body;
    const files = req.files;

    try {

        await validateSchema(newDemandSchema, req.body);

        const response = await createDemand(user_id, title, description, category_id, files);

        res.send({
            status: 200,
            message: 'Demand filed correctly😁',
            data: {
                "id:": response.insertId,
                "user_id": user_id,
                "category_id": category_id,
                "title": title,
                "description": description,
                "files": response.documents
            },

        })

    } catch (error) {
        next(error);
    }
};

export default main;