import {Request, Response} from 'express';
import { Exercise } from "../models/excercise";

export const getExercises = async(req: Request, res: Response) => {
    const listExercises = await Exercise.findAll();

    res.json(listExercises)
}

export const saveTrain = async(req: Request, res: Response) => {
    const ejerciciosSeleccionados = req.body;
    console.log(ejerciciosSeleccionados);
    console.log(ejerciciosSeleccionados.campos.repeticiones);
    
}
