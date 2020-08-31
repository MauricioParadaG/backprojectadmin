const Project = require('../models/Project');
const Task = require('../models/Task');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
    //are there are errors in projects.route.js validation?
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }


    try {
        // Creating a new project
        const project = new Project(req.body);

        // Storing the owner with JWT
        project.owner = req.newUser.id;

        // Saving the project
        project.save();
        res.json(project);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error, projects.controller.js');
    }
}



// Get all the projects from the actual user
exports.getProjects = async (req, res) => {
    try {
        //console.log(req.newUser);
        const projects = await Project.find({ owner: req.newUser.id }).sort({ created: -1 });
        res.json({ projects });  
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error while bringing the user projects');
    }
}


// edit or update a project
exports.updateProject = async (req, res) => {

    // Checking if there are mistakes
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({errors: errors.array() })
    }

    // First getting the project information
    const { name } = req.body;
    const newProject = {};
    
    if(name) {
        newProject.name = name;
    }

    try {
        // Checking the project ID
        //console.log(req.params.id);
        let project = await Project.findById(req.params.id);

        // The project does not exist
        if(!project) {
            return res.status(404).json({msg: 'Project not found'});
        }

        // checking the real owner of the project
        if(project.owner.toString() !== req.newUser.id ) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // update the project name
        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set : newProject}, { new: true });

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a server error');
    }
}


// Delete a project by ID
exports.deleteProject = async (req, res ) => {
    try {
        // Checking the project ID
        let project = await Project.findById(req.params.id);

        // The project does not exist
        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // checking the real owner of the project
        if(project.owner.toString() !== req.newUser.id ) {
            return res.status(401).json({msg: 'User not authorized'});
        }

        // First delete the task of the project, and then delete the project
        await Task.deleteMany({ project: req.params.id });
        // Delete the project by id
        await Project.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Project deleted '})

    } catch (error) {
        console.log(error);
        res.status(500).send('There was a server error');
    }
}


