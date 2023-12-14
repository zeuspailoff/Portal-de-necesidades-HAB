import { findOrFailUserById } from '../../controllers/users.controller.js';

const main = async (req, res, next) => {

    const { id } = req.body;
    try {
        const user = await findOrFailUserById(id);

        res.send({
            status: 'OK',
            message: 'Listado de usuarios',
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}

export default main;