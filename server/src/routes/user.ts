import { Router } from "express";
import { loginUser,newUser} from "../controllers/user";
import validateToken from "./validate-token";
import { getUserPurchasesController } from "../controllers/payment";

const router = Router();
router.post('/', newUser);
router.get('/',  validateToken,  );
router.post('/login', validateToken, loginUser);
router.get('/:user_id/purchases', getUserPurchasesController);


export default router;