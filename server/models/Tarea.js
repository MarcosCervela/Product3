
//Las Tareas

const mongoose = require('mongoose'); //Llamada a mongoose
const Schema = mongoose.Schema;      //Creación del Schema

const TareaSchema = new Schema({
    _id: Number,
    titulo: String,
    descripcion: String,
    fecha_inicio: { type: Date, default: Date.now },
    fecha_fin: { type: Date },
    estado: Boolean,
    panel: { type: mongoose.Types.ObjectId, ref: "Panel" },
});

// create new schema with _id as mongoose.Types.ObjectId
// const TareaSchema = new Schema({
//   _id: { type: mongoose.Types.ObjectId },

const Tarea = mongoose.model('Tarea', TareaSchema);

module.exports = Tarea;
