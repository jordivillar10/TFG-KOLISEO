import { Router } from "express";
import { getExercises } from "../controllers/excercises";
import validateToken from "./validate-token";

const router = Router();

router.get('/',/*validateToken*/ getExercises);

export default router;