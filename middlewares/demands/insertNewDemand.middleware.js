import validateSchema from '../../helpers/validationSchema.helper.js'
import newDemandSchema from '../../schemas/demands/newDemand.schema.js';
import { createDemand }  from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { user_id, title, description } = req.body;
    const files = req.files;
    
    try {

        await validateSchema(newDemandSchema, req.body);

        const response = await createDemand(user_id, title, description, files);

        res.send({
            status: 200,
            message: 'demanda insertada correctamente😁',
            data: {
                "id:": response.insertId,
                "user_id": user_id,
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