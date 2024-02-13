import sendMail from '../helpers/sendMail.helper.js';
import dotenv from 'dotenv';

const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT;

export const mailToRegistration = async (username, email, registrationCode, url) => {
    const emailBody =
        `Bienvenido ${username}
    Gracias por registrarte en Portal de necesidades. Para activar tu cuenta, haz clic en el siguiente enlace:
    
    Click aqui para activar tu cuenta de PORTAL DE NECESIDADES: 
            
                    "${url}/users/validate/${registrationCode}" 
    `
    await sendMail(email, `Activa tu cuenta`, emailBody);
}

export const mailToRecoverPassword = async (username, email, passwordRecovery, url) => {
    const emailBody =
        `Hola ${username}
    Si usted no ha solicitado este correo, ignorelo.
    
    Para recuperar tu contraseña, envia un request PUT con el campo "password" a la siguiente URL:
    "${url}/users/newPassword/${passwordRecovery}"
    
    `

    await sendMail(email, `RECUPERAR PASSWORD`, emailBody);
}

