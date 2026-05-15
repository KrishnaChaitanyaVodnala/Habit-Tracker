const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { store } = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/habits
router.get('/', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const habits = store.habits.filter((h) => h.userId === userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const habitsWithStats = habits.map((habit) => {
    const logs = store.habitLogs.filter((l) => l.habitId === habit.id && l.userId === userId);

    // Today's completion
    const completedToday = logs.some((l) => {
      const d = new Date(l.completedAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    // Streak calculation
    let streak = 0;
    const checkDate = new Date(today);
    while (true) {
      const dayLogs = logs.filter((l) => {
        const d = new Date(l.completedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === checkDate.getTime();
      });
      if (dayLogs.length > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return { ...habit, completedToday, streak, totalLogs: logs.length };
  });

  res.json(habitsWithStats);
});

// POST /api/habits
router.post('/', authMiddleware, (req, res) => {
  const { name, category, frequency } = req.body;
  if (!name || !category || !frequency)
    return res.status(400).json({ error: 'name, category, frequency required' });

  const habit = {
    id: uuidv4(),
    userId: req.user.id,
    name,
    category,
    frequency,
    createdAt: new Date().toISOString(),
  };
  store.habits.push(habit);
  res.status(201).json({ ...habit, completedToday: false, streak: 0, totalLogs: 0 });
});

// PUT /api/habits/:id
router.put('/:id', authMiddleware, (req, res) => {
  const habit = store.habits.find((h) => h.id === req.params.id && h.userId === req.user.id);
  if (!habit) return res.status(404).json({ error: 'Habit not found' });

  const { name, category, frequency } = req.body;
  if (name) habit.name = name;
  if (category) habit.category = category;
  if (frequency) habit.frequency = frequency;

  res.json(habit);
});

// DELETE /api/habits/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const idx = store.habits.findIndex((h) => h.id === req.params.id && h.userId === req.user.id);
  if (idx === -1) return res.status(404).json({ error: 'Habit not found' });
  store.habits.splice(idx, 1);
  store.habitLogs = store.habitLogs.filter((l) => l.habitId !== req.params.id);
  res.json({ success: true });
});

// POST /api/habits/:id/track
router.post('/:id/track', authMiddleware, (req, res) => {
  const habit = store.habits.find((h) => h.id === req.params.id && h.userId === req.user.id);
  if (!habit) return res.status(404).json({ error: 'Habit not found' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadyDone = store.habitLogs.some((l) => {
    if (l.habitId !== habit.id || l.userId !== req.user.id) return false;
    const d = new Date(l.completedAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  if (alreadyDone) {
    return res.status(409).json({ error: 'Already tracked today' });
  }

  const log = {
    id: uuidv4(),
    habitId: habit.id,
    userId: req.user.id,
    completedAt: new Date().toISOString(),
  };
  store.habitLogs.push(log);
  res.status(201).json(log);
});

module.exports = router;
