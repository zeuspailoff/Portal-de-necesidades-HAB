import sendMail from '../helpers/sendMail.helper.js';



export const mailToRegistration = async (username,email, registrationCode) =>{
    const emailBody =
        `Bienvenido ${username}
    Gracias por registrarte en Portal de necesidades. Para activar tu cuenta, haz clic en el siguiente enlace:
    
    Click aqui para activar tu cuenta de PORTAL DE NECESIDADES: 
            
                    "http://localhost:8080/users/validate/${registrationCode}" 
    `
   await sendMail(email, `Activa tu cuenta`, emailBody);
}

export const mailToRecoverPassword = async (username,email, passwordRecovery) =>{
    const emailBody =
        `Hola ${username}
    Si usted no ha solicitado este correo, ignorelo.
    
    Para recuperar tu contraseña, envia un request PUT con el campo "password" a la siguiente URL:
    "http://localhost:8080/users/SetPassByrecover/${passwordRecovery}"
    
    `

   await sendMail(email, `RECUPERAR PASSWORD`, emailBody);
}

