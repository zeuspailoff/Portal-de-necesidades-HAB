import { getUsers } from "../../controllers/users.controller.js";

const main = async (req, res, next) => {
    try {
        const users = await getUsers();

        res.send({
            status: "OK",
            message: "Lista de usuarios:",
            data: {
                users
            }
        })
    } catch (err) {
        next(err);
    }
}

export default main;