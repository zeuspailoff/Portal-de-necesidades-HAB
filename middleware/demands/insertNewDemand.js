import insertNewDemand from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await insertNewDemand(req.body.user_id, req.body.title, req.body.description);
        res.send({
            status: 200,
            message: 'demanda insertada correctamente😁',
            data: req.body.description
        })
    } catch (error) {
        next(error);
    }
};

export default main;