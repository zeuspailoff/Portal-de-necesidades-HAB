import deleteFile from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await deleteFile(req.body.entity_id, req.body.entity_type);
        res.send({
            status: 200,
            message: `File ${req.body.entity_id} deleted successfully.`
        })
    } catch (error) {
        next(error);
    }
};

export default main;