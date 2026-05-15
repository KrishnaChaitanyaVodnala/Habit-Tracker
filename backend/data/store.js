const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// ─── In-Memory Store ────────────────────────────────────────────────────────
const store = {
  users: [],
  habits: [],
  habitLogs: [],
};

// ─── Seed Logic ─────────────────────────────────────────────────────────────
async function seed() {
  if (store.users.length > 0) return;

  const passwordHash = await bcrypt.hash('demo1234', 10);

  const user = {
    id: 'user-demo-001',
    name: 'Alex Rivera',
    email: 'demo@habitflow.ai',
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  store.users.push(user);

  const habitDefs = [
    { name: 'Morning Meditation', category: 'mindfulness', frequency: 'daily' },
    { name: 'Evening Run', category: 'fitness', frequency: 'daily' },
    { name: 'Read 30 mins', category: 'learning', frequency: 'daily' },
    { name: 'Drink 8 Glasses Water', category: 'health', frequency: 'daily' },
    { name: 'No Social Media Before 10am', category: 'mindfulness', frequency: 'daily' },
  ];

  const habits = habitDefs.map((h) => ({
    id: uuidv4(),
    userId: user.id,
    name: h.name,
    category: h.category,
    frequency: h.frequency,
    createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000).toISOString(),
  }));
  store.habits.push(...habits);

  // Realistic completion patterns over the last 60 days
  const now = new Date();
  for (let daysAgo = 60; daysAgo >= 0; daysAgo--) {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    const dayOfWeek = date.getDay(); // 0=Sun, 6=Sat
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isWednesday = dayOfWeek === 3;

    habits.forEach((habit, idx) => {
      let completionChance = 0.85;

      // Realistic patterns
      if (habit.name === 'Evening Run' && isWednesday) completionChance = 0.2;
      if (habit.name === 'Evening Run' && isWeekend) completionChance = 0.6;
      if (habit.name === 'Morning Meditation' && isWeekend) completionChance = 0.55;
      if (habit.name === 'No Social Media Before 10am' && isWeekend) completionChance = 0.4;
      if (habit.name === 'Read 30 mins') completionChance = 0.9;
      if (habit.name === 'Drink 8 Glasses Water') completionChance = 0.75;

      // Recent slump for Morning Meditation (last 4 days)
      if (habit.name === 'Morning Meditation' && daysAgo <= 4 && daysAgo > 0) {
        completionChance = 0.3;
      }

      if (Math.random() < completionChance) {
        const completedAt = new Date(date);
        completedAt.setHours(6 + idx * 2, Math.floor(Math.random() * 60), 0, 0);
        store.habitLogs.push({
          id: uuidv4(),
          habitId: habit.id,
          userId: user.id,
          completedAt: completedAt.toISOString(),
        });
      }
    });
  }

  console.log(
    `✅ Seeded: 1 user, ${habits.length} habits, ${store.habitLogs.length} logs`
  );
}

module.exports = { store, seed };
