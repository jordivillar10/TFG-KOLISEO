import { Router } from "express";
import { createSession, handleSuccess } from "../controllers/payment";
import validateToken from "./validate-token";

const router = Router();

router.post("/create-checkout-session", validateToken, createSession);
router.get("/success", handleSuccess);
router.get("/cancel", (req,res) => res.send('https://44.201.148.171/direccion-envio'));
// router.get("/cancel", (req,res) => res.send('http://localhost:4200/direccion-envio'));

export default router;