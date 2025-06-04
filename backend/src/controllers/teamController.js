const { z } = require('zod');
const { createTeam, getTeamByCode, addUserToTeam } = require('../models/team');

const teamSchema = z.object({
  name: z.string(),
  code: z.string()
});

const create = async (req, res) => {
  const parse = teamSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json(parse.error);
  try {
    const team = await createTeam(parse.data.name, parse.data.code);
    await addUserToTeam(req.user.id, team.id);
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const join = async (req, res) => {
  const code = req.body.code;
  const team = await getTeamByCode(code);
  if (!team) return res.status(404).json({ message: 'Team not found' });
  await addUserToTeam(req.user.id, team.id);
  res.json(team);
};

module.exports = { create, join };
