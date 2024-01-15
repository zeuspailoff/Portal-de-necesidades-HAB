import jwt from 'jsonwebtoken';

const extractUserIdFromToken = (token) => {
    try {
        if (!token) {
            throw new Error('Token no proporcionado');
        }
        const decodedToken = jwt.verify(token, process.env.SECRET);

        const userId = decodedToken.id;

        return userId;
    } catch (error) {
        console.error('Error al decodificar el token:', error.message);
        return null;
    }
};

export default extractUserIdFromToken;