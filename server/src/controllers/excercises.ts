import {Request, Response} from 'express';
import { Exercise } from "../models/excercise";

export const getExercises = async(req: Request, res: Response) => {
    const listExercises = await Exercise.findAll();

    res.json(listExercises)
    

}