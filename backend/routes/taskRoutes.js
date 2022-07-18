const express = require('express')
const router = express.Router()
const {
  gettasks,
  settask,
  updatetask,
  deletetask,
} = require('../controllers/taskController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, gettasks).post(protect, settask)
router.route('/:id').delete(protect, deletetask).put(protect, updatetask)

module.exports = router