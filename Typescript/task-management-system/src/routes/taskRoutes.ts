import { Router } from "express";
import { changeTaskStatus, createNewTask, getAllTasks, getTasksForProject } from "../controllers/taskController";

const router = Router();

router.post('/create', createNewTask);
router.get('/project/:projectId', getTasksForProject);
router.get('/get-all-tasks', getAllTasks);
router.put('/:taskId/status', changeTaskStatus);

export default router;