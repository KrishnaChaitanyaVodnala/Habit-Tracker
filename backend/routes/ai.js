const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');

// TODO: replace with LLM call — wire up OpenAI / Gemini / Anthropic here

// GET /api/ai/motivation
router.get('/motivation', authMiddleware, (req, res) => {
  // TODO: replace with LLM call — generate personalized motivational quote based on user habit history
  res.json({
    quote: 'Small daily improvements are the key to staggering long-term results.',
    tip: 'Try habit stacking — attach your new habit to an existing one you already do daily.',
  });
});

// GET /api/ai/coach
router.get('/coach', authMiddleware, (req, res) => {
  // TODO: replace with LLM call — analyze user habit logs and generate personalized behavioral insights
  res.json([
    {
      type: 'pattern',
      title: 'Wednesday Workout Gap',
      message:
        'You tend to skip your Evening Run on Wednesdays. Try moving it to Tuesday evening instead to maintain momentum.',
    },
    {
      type: 'positive',
      title: 'Reading Streak Strong',
      message:
        'Your Read 30 mins habit has a 90% completion rate. Consider extending your reading time to 45 minutes to push further.',
    },
    {
      type: 'suggestion',
      title: 'Morning Routine Consistency',
      message:
        'Your Morning Meditation completions cluster between 7–8 AM on weekdays. Locking in a fixed time on weekends could close the gap.',
    },
  ]);
});

// GET /api/ai/risk-analysis
router.get('/risk-analysis', authMiddleware, (req, res) => {
  // TODO: replace with LLM call — predict streak-break risk using completion patterns and time-series analysis
  res.json([
    {
      habit: 'Morning Meditation',
      riskLevel: 'high',
      recommendation:
        'Your meditation habit has been skipped 2 times in the last 4 days. High chance of streak break tomorrow. Set a reminder for 8:00 PM tonight.',
    },
    {
      habit: 'Drink 8 Glasses Water',
      riskLevel: 'medium',
      recommendation:
        'Completion rate dropped to 60% this week. Try placing a water bottle on your desk as a visual cue.',
    },
  ]);
});

module.exports = router;
