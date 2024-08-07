import { Router } from "express";
import { createNewProject, getAllProjectsRoute } from "../controllers/projectController";

const router = Router();

router.post('/create', createNewProject);
router.get('/', getAllProjectsRoute);

export default router;