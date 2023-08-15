//IMPORTACION DE LOS MODELOS USUARIO Y TAREA
const modelTask = require('../models/task.model');

const CtrlTask = {}


//GET, TODAS LAS TAREAS
CtrlTask.getTask = async (req, res) => {
    try {
        const tasks = await modelTask.find({isActive: true});
        
        //TAREAS ENCONTRADAS
        return res.json({
            message:`Tareas encontradas:${tasks.length}`,
            tasks
        })


    } catch (error) {
        return res.status(400).json({
            message:"No se encontraron tareas"
        });
    }
}


//POST, CREAR UNA TAREA
CtrlTask.postTask = async (req, res) => {
    try {

        const {title, description} = req.body;

        //VERIFICAR QUE LA INFORMACION ESTE COMPLETA
        if (!title || !description) {
            return res.status(400).json({
                message: "Informacion incompleta o inadecuada",
                opcionesObligatorias: ["title", "description"],
            });
        }

        //NUEVA TAREA
        const newTask = new modelTask({
            title,
            description,
        });

        //GUARDAR TAREA
        const tareaRegistrada = await newTask.save();
        return res.status(200).json({
            message: 'Tarea registrada exitosamente',
            tareaRegistrada
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear la tarea",
            errorBody: error.message
        });
    }
}


//PUT, ACTUALIZAR TAREA
CtrlTask.putTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const {title, description} = req.body;

        //VERIFICAR INFORMACION COMPLETA
        if (!title || !description) {
            return res.status(400).json({
                message: "ID o informacion requerida no recibida ",
                opcionesObligatorias: ["title", "description"],
            });
        }

        const Task = await modelTask.findById(idTask);

        //VERIFICAR ACTIVIDAD DE TAREA
        if (!Task || !Task.isActive) {
            return res.status(400).json({
                message: "Tarea no encontradas"
            })
        }
        
        //ACTUALIZACION DE TAREA
        await Task.updateOne({title, description});
        return res.status(200).json({
            message: 'Tarea actualizada exitosamente'
        })
        
    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor al actualizar la tarea",
            errorBody: error.message
        });
    }
};


//COMPLETAR TAREA
CtrlTask.completeTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;

        //VERIFICACION ID TAREA
        if (!idTask) {
            return res.status(400).json({
                message: "ID requerida no recibida",
            });
        }

        const Task = await modelTask.findById(idTask);

        //VERIFICACION DE TAREAS
        if (!Task || !Task.isActive) {
            return res.status(400).json({
                message: "Tarea no encontradas"
            })
        }

        //VERIFICACION DE TAREA COMPLETA
        if (Task.isComplete) {
            return res.json({
                message: "Su tarea ya está completada"
            })
        }
        
        //COMPLETAR TAREA
        await Task.updateOne({isComplete: true});
        return res.status(201).json({
            message: 'Tarea completada'
        })

    } catch (error) {
        return res.status(500).json({
            message: "Error del servidor al intentar completar la tarea",
            errorBody: error.message
        });
    }
};


//DELETE, ELIMINAR UNA TAREA    
CtrlTask.deleteTask = async (req, res) => {
    try {
        const idTask = req.params.idTask;
        const Task = await modelTask.findOne({$and:[{_id:idTask},{isActive:true}]})

        //VERIFICACION DE TAREA
        if(!Task || !Task.isActive){
            return res.status(404).json({
                message: 'La tarea no existe'
            });
        }

        //ELIMINAR TAREA
        await Task.updateOne({isActive:false});
        return res.status(201).json({
            message: 'Tarea eliminada exitosamente',
        })

    } catch (error) {
        return res.status(500).json({
            message: "Ocurrio un error al eliminar la tarea",
            error: error.message
        })
    }
}


module.exports =CtrlTask;

