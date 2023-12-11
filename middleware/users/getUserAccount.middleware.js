const main = async (req, res, next) => {
    try {
        const user= req.user

        delete user.password;
        delete user.email;
        delete user.active;
        delete user.role;
        delete user.registrationCode;
        delete user.recoveryCode;

        res.send({
            status: 'OK',
            message: 'Usuario encontrado',
            data: {
                user
            }
        })
    } catch (error) {
            next(error);        
    }
}

export default main;