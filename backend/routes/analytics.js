const express = require('express');
const router = express.Router();
const { store } = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/analytics/timeline — last 90 days daily completion counts
router.get('/timeline', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const logs = store.habitLogs.filter((l) => l.userId === userId);
  const habits = store.habits.filter((h) => h.userId === userId);
  const totalHabits = habits.length;

  const timeline = [];
  const now = new Date();

  for (let i = 89; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    const dateStr = date.toISOString().split('T')[0];

    const count = logs.filter((l) => {
      const d = new Date(l.completedAt);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === date.getTime();
    }).length;

    const completionRate = totalHabits > 0 ? Math.round((count / totalHabits) * 100) : 0;

    // Calculate streaks per habit for milestone detection
    const milestoneFire = false;
    const milestoneTrophy = false;

    timeline.push({ date: dateStr, count, completionRate, total: totalHabits });
  }

  // Add milestone markers
  habits.forEach((habit) => {
    const habitLogs = logs
      .filter((l) => l.habitId === habit.id)
      .sort((a, b) => new Date(a.completedAt) - new Date(b.completedAt));

    let streak = 0;
    let prevDate = null;

    habitLogs.forEach((log) => {
      const logDate = new Date(log.completedAt);
      logDate.setHours(0, 0, 0, 0);
      const dateStr = logDate.toISOString().split('T')[0];

      if (prevDate) {
        const diff = (logDate - prevDate) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
          streak++;
        } else if (diff > 1) {
          streak = 1;
        }
      } else {
        streak = 1;
      }
      prevDate = logDate;

      const entry = timeline.find((t) => t.date === dateStr);
      if (entry) {
        if (streak >= 10) entry.milestoneFire = true;
        if (streak >= 30) entry.milestoneTrophy = true;
      }
    });
  });

  res.json(timeline);
});

// GET /api/dashboard
router.get('/dashboard', authMiddleware, (req, res) => {
  const userId = req.user.id;
  const habits = store.habits.filter((h) => h.userId === userId);
  const logs = store.habitLogs.filter((l) => l.userId === userId);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLogs = logs.filter((l) => {
    const d = new Date(l.completedAt);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  });

  const completionRate =
    habits.length > 0 ? Math.round((todayLogs.length / habits.length) * 100) : 0;

  const habitsWithStats = habits.map((habit) => {
    const habitLogs = logs.filter((l) => l.habitId === habit.id);
    const completedToday = todayLogs.some((l) => l.habitId === habit.id);

    let streak = 0;
    const checkDate = new Date(today);
    while (true) {
      const dayLogs = habitLogs.filter((l) => {
        const d = new Date(l.completedAt);
        d.setHours(0, 0, 0, 0);
        return d.getTime() === checkDate.getTime();
      });
      if (dayLogs.length > 0) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else break;
    }

    return { ...habit, completedToday, streak };
  });

  const longestStreak = Math.max(0, ...habitsWithStats.map((h) => h.streak));

  res.json({
    habits: habitsWithStats,
    todayStats: {
      completed: todayLogs.length,
      total: habits.length,
      completionRate,
    },
    longestStreak,
  });
});

module.exports = router;
