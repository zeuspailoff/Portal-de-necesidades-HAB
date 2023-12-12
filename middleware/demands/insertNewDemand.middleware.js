import validateSchema from '../../helpers/validationSchema.helper.js'
import newDemandSchema from '../../schema/demands/newDemand.schema.js';
import { insertNewDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { user_id, title, description, files } = req.body;

    try {

        await validateSchema(newDemandSchema, req.body)

        const response = await insertNewDemand(user_id, title, description, files);

        res.send({
            status: 200,
            message: 'demanda insertada correctamente😁',
            data: {
                "id:":response.insertId,
                "user_id":user_id,
                "title":title,
                "description":description
            },
            files: response.files
        })

    } catch (error) {
        next(error);
    }
};

export default main;