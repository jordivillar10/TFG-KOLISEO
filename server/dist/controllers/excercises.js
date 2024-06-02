"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWorkoutsController = exports.saveTrain = exports.getExercises = void 0;
const excercise_1 = require("../models/excercise");
const entrenamientos_1 = require("../models/entrenamientos");
const serie_1 = require("../models/serie");
const entrenamientoRepository_1 = require("../repositories/entrenamientoRepository");
const getExercises = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listExercises = yield excercise_1.Exercise.findAll();
    res.json(listExercises);
});
exports.getExercises = getExercises;
const saveTrain = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuario, ejerciciosSeleccionados } = req.body;
    console.log('Datos recibidos:', JSON.stringify({ usuario, ejerciciosSeleccionados }, null, 2));
    try {
        // Array para almacenar las promesas de creación de entrenamiento
        const entrenamiento = yield entrenamientos_1.Entrenamiento.create({ user_id: usuario });
        const setPromises = ejerciciosSeleccionados.flatMap((ejercicio) => ejercicio.campos.map(campo => serie_1.Serie.create({
            entrenamiento_id: entrenamiento.id,
            exercise_id: ejercicio.id,
            repeticiones: campo.repeticiones,
            peso: campo.peso
        })));
        // Esperar a que todas las promesas de creación de entrenamiento se completen
        yield Promise.all(setPromises);
        res.status(201).json({ message: 'Entrenamiento guardado exitosamente' });
    }
    catch (error) {
        console.error('Error al guardar el entrenamiento:', error);
        res.status(500).json({ message: 'Error al guardar el entrenamiento', error });
    }
});
exports.saveTrain = saveTrain;
const getUserWorkoutsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.user_id, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }
    try {
        const workouts = yield (0, entrenamientoRepository_1.getUserWorkouts)(userId);
        res.json(workouts);
    }
    catch (error) {
        console.error('Error fetching user workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getUserWorkoutsController = getUserWorkoutsController;
