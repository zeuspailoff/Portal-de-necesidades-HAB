import { getUsers} from '../../controllers/users.controller.js';

const main = async (req, res, next) => {
    try {
        const users = await getUsers()

        res.send({
            status: 'OK',
            message: 'Listado de usuarios',
            data:{
                users
            }
        })
    } catch (error) {
        next(error)
    }
}

export default main;