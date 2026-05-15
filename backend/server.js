require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { seed } = require('./data/store');

const authRoutes = require('./routes/auth');
const habitsRoutes = require('./routes/habits');
const analyticsRoutes = require('./routes/analytics');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/habits', habitsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/dashboard', analyticsRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Seed and start
seed().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 HabitFlow AI backend running on http://localhost:${PORT}`);
  });
});
