router.post("/tasks", auth, createTask);
router.get("/tasks", auth, getTasks);
router.put("/tasks/:id", auth, updateTask);
router.patch("/tasks/:id/status", auth, updateTaskStatus);
router.get("/tasks/priority/:level", auth, getTasksByPriority);
router.get("/tasks/search", auth, searchTasks);
