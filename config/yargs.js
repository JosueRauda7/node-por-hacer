const options = {
  descripcion: {
    demand: true,
    alias: "d",
    desc: "Título o descripción de la tarea",
  },
  completado: {
    alias: "c",
    default: true,
    desc: "Confirmación de una tarea completada",
  },
};

const argv = require("yargs")
  .command("crear", "Crear un tarea por hacer", options)
  .command("actualizar", "Actualiza el estado completado de una tarea", options)
  .command("listar", "Listar tareas por hacer", {
    completado: {
      alias: "c",
      default: "false",
      desc: "Confirmación de una tarea completada",
    },
  })
  .command("borrar", "Eliminar una tarea", options)
  .help().argv;

module.exports = {
  argv,
};
