var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
// telling my router that I have this model
let assignment = require('../model/assignment.js');
/* Get route for the assignment list - Read Operation */
/*
GET,
Post,
Put --> Edit/Update
*/
/* Read Operation --> Get route for displaying the assignments list */
router.get('/',async(req,res,next)=>{
try{
    const assignmentList = await assignment.find();
    res.render('assignment/list',{
        title:'assignments',
        assignmentList:assignmentList
    })}
    catch(err){
        console.error(err);
        res.render('assignment/list',{
            error:'Error on the server'
        })
    }
    });
/* Create Operation --> Get route for displaying me the Add Page */
router.get('/add',async(req,res,next)=>{
    try{
        res.render('assignment/add',{
            title: 'Add assignment'
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Create Operation --> Post route for processing the Add Page */
router.post('/add',async(req,res,next)=>{
    try{
        let newassignment = assignment({
            "Course":req.body.Course,
            "Instructor":req.body.Instructor,
            "Description":req.body.Description,
            "Due Date":req.body.DueDate
        });
        assignment.create(newassignment).then(()=>{
            res.redirect('/assignmentslist');
        })
    }
    catch(err)
    {
        console.error(err);
        res.render('assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Update Operation --> Get route for displaying me the Edit Page */
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const assignmentToEdit= await assignment.findById(id);
        res.render('assignment/edit',
            {
                title:'Edit assignment',
                assignment:assignmentToEdit
            }
        )
    }
    catch(err)
    {
        console.error(err);
        next(err); // passing the error
    }
});
/* Update Operation --> Post route for processing the Edit Page */ 
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        let updatedassignment = assignment({
            "Course":req.body.Course,
            "Instructor":req.body.Instructor,
            "Description":req.body.Description,
            "Due Date":req.body.DueDate
        });
        assignment.findByIdAndUpdate(id,updatedassignment).then(()=>{
            res.redirect('/assignmentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('assignment/list',{
            error:'Error on the server'
        })
    }
});
/* Delete Operation --> Get route to perform Delete Operation */
router.get('/delete/:id',async(req,res,next)=>{
    try{
        let id=req.params.id;
        assignment.deleteOne({_id:id}).then(()=>{
            res.redirect('/assignmentslist')
        })
    }
    catch(error){
        console.error(err);
        res.render('assignment/list',{
            error:'Error on the server'
        })
    }
});
module.exports = router;
