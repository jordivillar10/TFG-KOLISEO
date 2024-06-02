import {Request, Response} from 'express';
import { Exercise } from "../models/excercise";
import { Entrenamiento } from '../models/entrenamientos';
import { Serie } from '../models/serie';
import { getUserWorkouts } from '../repositories/entrenamientoRepository';

export const getExercises = async(req: Request, res: Response) => {
    const listExercises = await Exercise.findAll();

    res.json(listExercises)
}

export const saveTrain = async (req: Request, res: Response) => {
    const { usuario, ejerciciosSeleccionados } = req.body;
    console.log('Datos recibidos:', JSON.stringify({ usuario, ejerciciosSeleccionados }, null, 2));
    
    try {
    // Array para almacenar las promesas de creación de entrenamiento
    const entrenamiento = await Entrenamiento.create({ user_id: usuario });

    const setPromises = ejerciciosSeleccionados.flatMap((ejercicio: { campos: any[]; id: any; }) =>
        ejercicio.campos.map(campo =>
            Serie.create({
                entrenamiento_id: entrenamiento.id,
                exercise_id: ejercicio.id,
                repeticiones: campo.repeticiones,
                peso: campo.peso
            })
        )
    );

        // Esperar a que todas las promesas de creación de entrenamiento se completen
        await Promise.all(setPromises);
        res.status(201).json({ message: 'Entrenamiento guardado exitosamente' });
    } catch (error) {
        console.error('Error al guardar el entrenamiento:', error);
        res.status(500).json({ message: 'Error al guardar el entrenamiento', error });
    }
};

export const getUserWorkoutsController = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.user_id, 10);

    if (isNaN(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        const workouts = await getUserWorkouts(userId);
        res.json(workouts);
    }catch (error) {
        console.error('Error fetching user workouts:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
