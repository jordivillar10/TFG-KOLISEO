import { Router } from "express";
import { createSession } from "../controllers/payment";
import validateToken from "./validate-token";
const router = Router();

router.post("/create-checkout-session", validateToken, createSession);
router.get("/success", (req,res) => res.send("success"));
router.get("/cancel", (req,res) => res.send("cancel"));

export default router;