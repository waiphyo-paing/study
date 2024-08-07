import { Router } from "express";
import { changeTaskStatus, createNewTask, getTasksForProject } from "../controllers/taskController";

const router = Router();

router.post('/create', createNewTask);
router.get('/project/:projectId', getTasksForProject);
router.put('/:taskId/status', changeTaskStatus);

export default router;