
const fs = require('fs');

let listadoPorHacer = [];

// Base de Datos

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, err => {
        if(err) throw new Error(err);
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');   
    } catch (error) {
        listadoPorHacer = [];
    }

};

// CRUD

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}

const getListado = () => {

    cargarDB();

    const listado = listadoPorHacer;

    return listado;

}

const getListadoPorEstado = (completado = false) => {

    cargarDB();

    const listado = listadoPorHacer.filter(tarea => {
        return tarea.completado === completado
    });

    return listado;

}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >= 0)
    {
        listadoPorHacer[index].descripcion = descripcion;
        listadoPorHacer[index].completado = completado;
        guardarDB();

        return true;
    }
    else
    {
        return false;
    }

}

const borrar = descripcion => {

    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if(index >= 0)
    {
        let borrado = listadoPorHacer.splice(index);
        guardarDB();
        return true;
    }
    else
    {
        return false
    }

}

module.exports = {
    crear,
    getListado,
    getListadoPorEstado,
    actualizar,
    borrar
}