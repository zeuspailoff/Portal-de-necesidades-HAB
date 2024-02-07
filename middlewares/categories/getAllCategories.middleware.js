import { getAllCategories } from '../../controllers/demands.controller.js';

const main = async (req, res, next) => {

    try {
        const [...response] = await getAllCategories();

        res.send({
            status: 200,
            message: 'Categories fetched successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
};

export default main;