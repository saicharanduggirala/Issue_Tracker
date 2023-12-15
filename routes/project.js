// const express=require('express');
// const router=express.Router();
// const projectController=require('../controllers/project_controller');

// router.get("/",projectController.projectView);
// router.post("/create",projectController.create)
// router.get("/:id/issue",projectController.issues);
// router.post("/:id/issue/create",projectController.createIssue);
// router.get("/:id",projectController.project)


// module.exports=router;

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project_controller');

router.post('/create', projectController.create);
router.get('/:id', projectController.project);
router.post('/:id', projectController.createIssue);

module.exports = router;