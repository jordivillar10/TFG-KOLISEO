import { Router } from "express";
import { createSession, handleSuccess } from "../controllers/payment";
import validateToken from "./validate-token";

const router = Router();

router.post("/create-checkout-session", validateToken, createSession);
router.get("/success", handleSuccess);
router.get("/cancel", (req,res) => res.send('http://44.203.197.175/direccion-envio'));

export default router;