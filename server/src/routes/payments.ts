import { Router } from "express";
import { createSession, handleSuccess } from "../controllers/payment";
import validateToken from "./validate-token";

const router = Router();

router.post("/create-checkout-session", validateToken, createSession);
router.get("/success", handleSuccess);
router.get("/cancel", (req,res) => res.send('https://koliseo.duckdns.org/direccion-envio'));

export default router;