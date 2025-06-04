const { z } = require('zod');
const { createUser, authenticate } = require('../models/user');

const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6)
});

const loginSchema = registerSchema;

const register = async (req, res) => {
  const parse = registerSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);
  try {
    const user = await createUser(parse.data.username, parse.data.password);
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);
  const token = await authenticate(parse.data.username, parse.data.password);
  if (!token) return res.status(401).json({ message: 'Invalid credentials' });
  res.json({ token });
};

module.exports = { register, login };
