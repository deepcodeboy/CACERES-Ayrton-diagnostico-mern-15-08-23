//IMPORTACION DE VALIDADOR Y DEPENDENCIA
const router = require('express').Router();

const {
    getTask,
    postTask,
    putTask,
    completeTask,
    deleteTask
} = require('../controllers/task.controller');

//RUTA DE OBTENER TAREAS
router.get('/task',getTask);

//RUTA DE CREAR TAREA
router.post('/task',postTask);

//RUTA DE ACTUALIZAR TAREA
router.put('/task/:idTask',putTask);

//RUTA DE COMPLETAR TAREA
router.put('/task/:idTask/completar',completeTask);

//RUTA DE ELIMINAR TAREA
router.delete('/task/:idTask',deleteTask);

//EXPORTACION DE RUTAS DE TAREAS
module.exports = router;