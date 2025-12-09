// sources/controllers/stats.controller.js
import Task from "../../models/task.model.js";

export const getGlobalStats = async (req, res, next) => {
  try {
    const stats = await Task.aggregate([
      {
        $facet: {
          byStatus: [
            { $group: { _id: "$status", count: { $sum: 1 } } }
          ],
          totalTasks: [
            { $count: "total" }
          ],
          byPriority: [
            { $group: { _id: "$priority", count: { $sum: 1 } } }
          ]
        }
      }
    ]);

    res.json({
      status: "success",
      data: stats[0]
    });

  } catch (err) {
    next(err);
  }
};