const express = require('express');
const dotenv = require('dotenv');
const { init } = require('./utils/db');
const authRoutes = require('./routes/auth');
const teamRoutes = require('./routes/team');
const taskRoutes = require('./routes/task');
const { authMiddleware } = require('./middlewares/auth');

dotenv.config();
init();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/teams', authMiddleware, teamRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = app;
