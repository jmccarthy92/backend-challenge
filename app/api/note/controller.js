const noteService = require('app/modules/note')

/**
 * Retrieves list of notes for user id
 *
 * @method read
 */
exports.read = async (req, res) => {
  const notes = await noteService.find({ user: req.params.userId })
  res.status(200).send(notes)
}

/**
 * Creates a note for the authenticated user
 *
 * @method create
 */
exports.create = async (req, res) => {
  const note = await noteService.create({ user: req.userId, ...req.body })
  res.status(200).send(note)
}
