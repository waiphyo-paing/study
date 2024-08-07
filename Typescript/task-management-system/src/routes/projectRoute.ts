import { Router } from "express";
import { createNewProject, getAllProjectsRoute } from "../controllers/projectController";

const router = Router();

router.get('/', getAllProjectsRoute);
router.post('/create', createNewProject);

export default router;