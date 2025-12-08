router.post("/tasks", auth, async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user.id, // relier la tâche à l'utilisateur connecté
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
