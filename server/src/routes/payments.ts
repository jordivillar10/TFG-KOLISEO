import { Router } from "express";
import { createSession, newEnvio } from "../controllers/payment";
import validateToken from "./validate-token";
const router = Router();

router.post("/create-checkout-session", validateToken, createSession);
router.post('/direccion-envio', newEnvio);
router.get("/success", (req,res) => res.redirect('http://localhost:4200/tienda'));
router.get("/cancel", (req,res) => res.send('http://localhost:4200/direccion-envio'));

export default router;