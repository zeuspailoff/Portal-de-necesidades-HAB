import { insertFile } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {
    try {
        await insertFile(req.body.file);
        res.send({
            status: 200,
            message: `File ${req.body.file} inserted successfully.`
        })
    } catch (error) {
        next(error);
    }
};

export default main;