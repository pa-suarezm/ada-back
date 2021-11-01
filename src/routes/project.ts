import { Router } from "express";
const router:Router = Router();

import { create, getAll } from "../controllers/project.controller";


router.post('/create', create);
router.get('/getAll', getAll);
export default router;