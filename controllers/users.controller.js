import filesServices from '../services/files.services.js'
import usersServices from '../services/users.services.js'



export const insertNewUser = async (
                                username,
                                email,
                                password,
                                biography,
                                birthdate,
                                phone,
                                name,
                                lastname,
                                profile_picture
) => {
    
      if(profile_picture){  

        const fileSrc = await filesServices.saveFile(profile_picture)

      };
                                

    const response = await usersServices.insertNewUser(
      username,
      email,
      password,
      biography,
      birthdate,
      phone,
      name,
      lastname,
      fileSrc
    )

    

    return response
}