import { insertNewDemand } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    const { user_id, title, description } = req.body;

    try {

        await insertNewDemand(user_id, title, description);

        res.send({
            status: 200,
            message: 'demanda insertada correctamente😁',
            data: user_id,
            data: title,
            data: description
        })

    } catch (error) {
        next(error);
    }
};

export default main;