const main = async (req, res, next) => {
    try {
        const user = req.user;

        delete user.password;
        delete user.modifiedAt;
        delete user.email;
        delete user.active;
        delete user.role;
        delete user.registrationCode;
        delete user.recoverPassCode;

        res.send({
            status: "OK",
            message: "Usuario encontrado correctamente",
            data: {
                user
            }
        })
    } catch (err) {
        next(err);
    }
}

export default main;