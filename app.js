//Requires
const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');
const color = require('colors');

let comando = argv._[0];

switch (comando) {
  case "crear":
    let tarea = porHacer.crear(argv.descripcion);
    console.log("Tarea agregada".grey);
    break;

  case "listar":
  
    let listado = null;

    switch(argv.c)
    {
      case "true":
        listado = porHacer.getListadoPorEstado(true);
        break;

      case "false":
        listado = porHacer.getListadoPorEstado(false);
        break;

      default:
        listado = porHacer.getListado();
        break;
    }

    console.log('-'.padEnd(50, '-').grey);

    console.log(" ".padStart(15, ' '), 'LISTADO POR HACER'.yellow);

    for(let tarea of listado)
    {
        console.log('-'.padEnd(50, '-').grey);
        console.log(`${ tarea.descripcion }`);
        console.log(`Estado: ${ tarea.completado ? 'Completado' : 'Pendiente' }`);
    }

    console.log('-'.padEnd(50, '-').grey);

    if(listado.length == 0)
    {
      console.log('No hay tareas por hacer.'.cyan);
    }

    break;

  case "actualizar":
    let completado = true;

    if(argv.completado === "false")
    {
      completado = false;
    }

    let actualizado = porHacer.actualizar(argv.descripcion, completado);
    console.log(actualizado);
  
    break;

  case "borrar":

    let borrado = porHacer.borrar(argv.descripcion);

    console.log(`${borrado ? 'Tarea por hacer eliminado.' : 'No se encontró la tarea por hacer.'}`.grey);

    break;

  default:
    console.log("Comando no es reconocido");
    break;
}
