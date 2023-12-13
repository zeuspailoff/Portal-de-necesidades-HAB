// router.post('/demands/new', insertNewDemand);

// body = {
//   "user_id": "1",
//   "title": "titulo de la demanda blaabla",
//   "description": "lorem de la demanda blaabla",
//   "files": [
//     0 => 'fotoDeUnPerro.jpg',
//     1 => 'fotoDeGato.jpg',
//   ]
// }

// insertNewDemand //middleware.
//     validateSchema // valido el schema dentro del middleware y este recibe un libro de reglas (schema) y un body, los compara y tira error si no es valido o sigue el codigo si es valido.
//         newDemandSchema, req.body
//     response = await insertNewDemand //ejecutamos el metodo correspondiente a esta entidad, pero del controlador, le pasamos los parametros desestructurados del body ya validados anteriormente por el validateSchema.
//     res.send //devolvemos el estatus de correcto, el mensade y la data. La data es un objeto que contiene el id de la demanda que se insertó correctamente y la data de la entidad correspondiente.
//   //en caso de error en algun paso, se ejecuta el catch y se muestra el error en consola.

// //vamos dentro dle controlador por la funcion de la linea 16
// insertNewDemand //ejecutamos la funcion dentro del controlador, que recibe los parametros desestructurados del body.
//     const response = await demandsServices.insertNewDemand //ejecutamos la funcion dentro controlador que accede a MySQL
//     response //devolvemos el objeto que deriva de la consulta con SQL.

// //vamos dentro de la funcion de la lunea 22 que es un servicio 
// insertNewDemand 
//     const pool = await getPool(); //obtenemos el pool de conexiones
//     'INSERT INTO demands (user_id, title, description) VALUES (?,?,?)' //insertamos los parametros de la consulta
    
//  //si la demanda recibe Files 
//  if(files){  //si recibo files los guardo
//   //array para guardar los archivos
//   const filesSrc = [] 
//   //obtengo el id autoincremental de la demanda recien insertada
//   const entity_id = response.insertId
//   //recorro el array de archivos que recivo y los guardo uno por uno, creando un array de objetos con los datos del registro en la DB de cad archivo
//   files.forEach(async file => {
//       //guardo el archivo fisico, y almaceno el string de su ruta completa
//       const fileSrc = await insertFile(file)
//       //creo el regsitro en la DB de cada archivo, con su ruta conmpleta, el tipo de entidad y el id de la entidad
//       const fileInDb = await demandsServices.insertFile(entity_id, entity_type, fileSrc)
//       //pusheo un objeto con el id del archivo en la DB y tu path completo
//       filesSrc.push({'id': fileInDb.insertId, 'src' : fileSrc})
//   });
//   //agrego en el response un atributo files que contiene un array de objetos de la tabla files en el response que se devuelve al middleware.
//   response.files = filesSrc;
//   }