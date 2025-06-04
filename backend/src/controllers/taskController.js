const { z } = require('zod');
const { createTask, completeTask, tasksByUser, completedTasksByUser, updateTask, deleteTask, statsByUser } = require('../models/task');

const taskSchema = z.object({
  team_id: z.number(),
  title: z.string(),
  description: z.string(),
  priority: z.string(),
  due_date: z.string()
});

const create = async (req, res) => {
  const parse = taskSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);
  const task = await createTask(parse.data.team_id, req.user.id, parse.data.title, parse.data.description, parse.data.priority, parse.data.due_date);
  res.json(task);
};

const complete = async (req, res) => {
  const id = req.params.id;
  await completeTask(id);
  res.json({});
};

const list = async (req, res) => {
  const tasks = await tasksByUser(req.user.id);
  res.json(tasks);
};

const completed = async (req, res) => {
  const tasks = await completedTasksByUser(req.user.id);
  res.json(tasks);
};

const update = async (req, res) => {
  const id = req.params.id;
  const { title, description, priority, due_date } = req.body;
  await updateTask(id, title, description, priority, due_date);
  res.json({});
};

const remove = async (req, res) => {
  const id = req.params.id;
  await deleteTask(id);
  res.json({});
};

const summary = async (req, res) => {
  const data = await statsByUser(req.user.id);
  res.json(data);
};

module.exports = { create, complete, list, completed, update, remove, summary };
