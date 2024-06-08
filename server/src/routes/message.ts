import { Router } from "express";
import { mandarCorreo } from "../controllers/message";

const router = Router();

router.post('/contactanos', mandarCorreo);


export default router;