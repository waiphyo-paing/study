// src/index.ts
import { TaskManager } from './taskManager';

const taskManager = new TaskManager();

console.log('Adding tasks...');
taskManager.addTask('Learn TypeScript', 'learn typescript today');
taskManager.addTask('Build a TODO app', 'Build a TODO app now');

console.log('Listing tasks...');
console.log(taskManager.listTasks());

console.log('Completing first task...');
taskManager.completeTask(1);

console.log('Listing tasks...');
console.log(taskManager.listTasks());

console.log('Removing second task...');
taskManager.removeTask(2);

console.log('Listing tasks...');
console.log(taskManager.listTasks());
