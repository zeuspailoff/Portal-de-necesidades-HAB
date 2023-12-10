import { insertNewDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { user_id, title, description } = req.body;

    try {

        const response = await insertNewDemand(user_id, title, description);

        res.send({
            status: 200,
            message: 'demanda insertada correctamente😁',
            data: {
                "id:":response.insertId,
                "user_id":user_id,
                "title":title,
                "description":description
            }
        })

    } catch (error) {
        next(error);
    }
};

export default main;