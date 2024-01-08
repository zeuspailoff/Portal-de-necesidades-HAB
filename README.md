# API ineddup

La API ineddup es una plataforma que te permite compartir demandas y recibir propuestas de otros usuarios. Sigue los pasos a continuación para comenzar a utilizarla.

## Requisitos previos

- Es necesario registrarse en la plataforma.
- Debes activar tu cuenta utilizando el enlace que recibirás en el correo electrónico automático después de registrarte.
- Completa todas la variables del .env

## Empezar
- Recuerda que tienes que empesar insertando un usuario 
- Luego activas el usuario con la url que te ha llegado al mail proporcionado en postman(no esta configurado para activar en postman)
- Luego te logeas y pones el token en los headers de autorization (esta colocado como variable auth_token solo debes cambiarla)

## Uso básico

1. **Registro y activación de la cuenta:**
   - Regístrate en la plataforma utilizando.
   - Activa tu cuenta haciendo clic en el enlace enviado a tu correo electrónico.

2. **Inicio de sesión:**
   - Utiliza tu correo electrónico y contraseña para iniciar sesión en la plataforma.

3. **Obtención del token:**
   - Después de iniciar sesión con éxito, obtendrás un token de autenticación. Este token será necesario para realizar operaciones en la API.

   - Puedes colocolarlo en la variable gloval de postman

4. **Añadir demanda:**
   - Con el token de autenticación, puedes agregar tu demanda en la collection de postman.

     Asegúrate de reemplazar `[auth_token]` con tu token de autenticación y ajustar la demanda según tus necesidades.

5. **Recibir propuestas:**
   - Una vez que hayas agregado tu demanda, otros usuarios podrán verla y ofrecer propuestas. Explora las propuestas recibidas y selecciona la que mejor se adapte a tus necesidades.

## Empieza a probar la collection de postman