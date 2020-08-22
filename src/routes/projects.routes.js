const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projects.controller');
const auth = require('../middleware/auth.middleware');
//const { check } = require('express-validator');


// Create projects
// api/projects
router.post('/', 
    auth,
   // [
       // check('name', 'The project name is required').not().isEmpty()
   // ],
   projectController.createProject
);

/*

// Get all the projects
router.get('/', 
    auth,
    projectController.obtenerProyectos
)

// Update project by ID
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del proyecto es obligatoio').not().isEmpty()
    ],
    projectController.actualizarProyecto
);

// Delete a project
router.delete('/:id', 
    auth,
    projectController.eliminarProyecto
);
*/

module.exports = router;