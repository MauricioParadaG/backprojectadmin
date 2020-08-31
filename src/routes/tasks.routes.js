const express = require('express');
const router = express.Router();
const taskController = require('../controllers/tasks.controller');
const auth = require('../middleware/auth.middleware');
const { check } = require('express-validator');

// Create task in a project 
// api/tasks
router.post('/', 
    auth,
    [
        check('name', 'The task name is required').not().isEmpty(),
        check('project', 'The task needs to be created in a project').not().isEmpty()
    ],
    taskController.createTask
);

// Get all the tasks of a project
router.get('/',
    auth,
    taskController.getTasks
);

// Update task
router.put('/:id', 
    auth,
    taskController.updateTask
);

// Delete task
router.delete('/:id', 
    auth,
    taskController.deleteTask
);


module.exports = router;