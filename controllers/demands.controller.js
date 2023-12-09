import filesServices from '../services/files.services.js'
import demandsServices from '../services/demands.services.js'
import errors from '../helpers/errors.helpers.js'

const entity_type = 'demands'

export const insertNewDemand = async (user_id, title, description, files) => {
    //guardo la demanda me devuelve el registro
    const response = await demandsServices.insertNewDemand(
        user_id, 
        title, 
        description
    )

    if(files){
    //array para guardar los archivos
    const filesSrc = [] 
    //obtengo el id autoincremental de la demanda recien insertada
    const entity_id = response.insertId
    //recorro el array de archivos que recivo y los guardo uno por uno, creando un array de objetos con los datos del registro en la DB de cad archivo
    files.forEach(async file => {
        //guardo el archivo fisico, y almaceno el string de su ruta completa
        const fileSrc = await insertFile(file)
        //creo el regsitro en la DB de cada archivo, con su ruta conmpleta, el tipo de entidad y el id de la entidad
        const fileInDb = await demandsServices.insertFile(entity_id, entity_type, fileSrc)
        //pusheo un objeto con el id del archivo en la DB y tu path completo
        filesSrc.push({'id': fileInDb.insertId, 'src' : fileSrc})
    });
    //agrego en el response un atributo files que contiene un array de objetos de la tabla files
    response.files = filesSrc;
    }

    return response
}

export const getAllDemands = async (userId) => {
    const response = await demandsServices.getAllDemands(userId);
    return response;
}

export const getDemandById = async (demandId) => {
    const response = await demandsServices.getDemandById(demandId);
    return response;
}

export const getAllDemandsByUserId = async (userId) => {
    const response = await demandsServices.getAllDemandsByUserId(userId);
    return response;
}

export const deleteDemand = async (demandId) => {
    const response = await demandsServices.deleteDemand(demandId);
    return response;
}

export const updateDemandStatus = async (demandId, status) => {
    const response = await demandsServices.updateDemandStatus(demandId, status);
    return response;
}

export const editDemand = async (demandId, title, description, files) => {
    const response = await demandsServices.editDemand(demandId, title, description);

    if(files){
        const filesSrc = []; 
        const entity_id = demandId;
        
        files.forEach(async file => {
            const fileSrc = await insertFile(file)
            const fileInDb = await demandsServices.insertFile(entity_id, entity_type, fileSrc)
            
            filesSrc.push({'id': fileInDb.insertId, 'src' : fileSrc})
        });

        response.files = filesSrc;
    }     

    return response;
}

export const insertFile = async (file) => {
    const src = await filesServices.saveFile(file);

    return src;
}

export const deleteFile = async (entity_id, entity_type) => {
    const response = await demandsServices.deleteFile(entity_id, entity_type);
    return response;
}

