const asyncHandler = require('express-async-handler')

const task = require('../models/taskModel')
const User = require('../models/userModel')

const gettasks = asyncHandler(async (req, res) => {
  const tasks = await task.find({ user: req.user.id })

  res.status(200).json(tasks)
})

const settask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const task = await task.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(task)
})

const updatetask = asyncHandler(async (req, res) => {
  const task = await task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('task not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedtask = await task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedtask)
})

const deletetask = asyncHandler(async (req, res) => {
  const task = await task.findById(req.params.id)

  if (!task) {
    res.status(400)
    throw new Error('task not found')
  }

  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  if (task.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await task.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  gettasks,
  settask,
  updatetask,
  deletetask,
}