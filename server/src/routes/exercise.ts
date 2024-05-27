import { Router } from "express";
import { getExercises, saveTrain } from "../controllers/excercises";
import validateToken from "./validate-token";

const router = Router();

router.get('/',/*validateToken*/ getExercises);
router.post('/entrenamiento', saveTrain);

export default router;