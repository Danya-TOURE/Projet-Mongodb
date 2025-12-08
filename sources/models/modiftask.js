router.put("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Tâche introuvable" });

    // permissions : seule la personne qui a créé la tâche peut la modifier
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ error: "Accès refusé" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
