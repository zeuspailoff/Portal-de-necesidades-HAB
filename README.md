# API ineddup

La API ineddup es una plataforma que te permite compartir demandas y recibir propuestas de otros usuarios. Sigue los pasos a continuación para comenzar a utilizarla.

## Requisitos previos

- Es necesario registrarse en la plataforma.
- Debes activar tu cuenta utilizando el enlace que recibirás en el correo electrónico automático después de registrarte.

## Uso básico

1. **Registro y activación de la cuenta:**
   - Regístrate en la plataforma utilizando [este enlace](enlace_registro).
   - Activa tu cuenta haciendo clic en el enlace enviado a tu correo electrónico.

2. **Inicio de sesión:**
   - Utiliza tu correo electrónico y contraseña para iniciar sesión en la plataforma.

3. **Obtención del token:**
   - Después de iniciar sesión con éxito, obtendrás un token de autenticación. Este token será necesario para realizar operaciones en la API.

4. **Añadir demanda:**
   - Con el token de autenticación, puedes agregar tu demanda utilizando la siguiente solicitud cURL como ejemplo:

     ```bash
     curl -X POST \
     -H "Authorization: Bearer [TU_TOKEN]" \
     -H "Content-Type: application/json" \
     -d '{"demanda": "Tu demanda aquí"}' \
     https://api.ineddup.com/demandas
     ```

     Asegúrate de reemplazar `[TU_TOKEN]` con tu token de autenticación y ajustar la demanda según tus necesidades.

5. **Recibir propuestas:**
   - Una vez que hayas agregado tu demanda, otros usuarios podrán verla y ofrecer propuestas. Explora las propuestas recibidas y selecciona la que mejor se adapte a tus necesidades.

## Ejemplos de solicitudes HTTP

- **Obtener demandas:**
  ```bash
  curl -X GET https://api.ineddup.com/demandas
