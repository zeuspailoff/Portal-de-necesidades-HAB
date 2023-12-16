//1. Realizar una solicitud GET para obtener todos los usuarios:
javascript
Copy code
const getUsers = async () => {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};

getUsers();
//2. Realizar una solicitud GET para obtener un usuario por su ID:
javascript
Copy code
const getUserById = async (userId) => {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        const data = await response.json();
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
    }
};

getUserById(1); // Reemplaza 1 con el ID del usuario que deseas obtener.
//3. Realizar una solicitud POST para agregar un nuevo usuario:
javascript
Copy code
const addUser = async (userData) => {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();
    } catch (error) {
        console.error('Error al agregar usuario:', error);
    }
};

const newUser = {
    name: 'Nuevo Usuario',
    email: 'nuevo.usuario@example.com',
};

addUser(newUser);
//4. Realizar una solicitud PUT para actualizar un usuario existente:
javascript
Copy code
const updateUser = async (userId, updatedUserData) => {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });
        const data = await response.json();
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
    }
};

const updatedUserData = {
    name: 'Usuario Actualizado',
    email: 'usuario.actualizado@example.com',
};

updateUser(1, updatedUserData); // Reemplaza 1 con el ID del usuario que deseas actualizar.
//5. Realizar una solicitud DELETE para eliminar un usuario:
javascript
Copy code
const deleteUser = async (userId) => {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`, {
            method: 'DELETE',
        });
        const data = await response.json();
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
    }
};

deleteUser(1); // Reemplaza 1 con el ID del usuario que deseas eliminar.


const getUpdatedFields = (user, editedUser) => {

    for (const key in editedUser) {
        if (user.hasOwnProperty(key)) {
            if (user[key] !== editedUser[key]) {
                user[key] = editedUser[key];
            }
        }
    }

    return user;
}
