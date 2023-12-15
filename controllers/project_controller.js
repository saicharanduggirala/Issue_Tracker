// const Project = require('../models/project');
// const Issue = require("../models/issue");

// module.exports.projectView = function (req, res) {
//     return res.render('project', {
//         title: "IssueTracker | Projects"
//     });
// }

// module.exports.create = function (req, res) {
//     Project.create({
//         name: req.body.name,
//         description: req.body.description,
//         author: req.body.author
//     }).then(() => {
//         return res.redirect('/')
//     }).catch((err) => {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     });
// };

// module.exports.project = function (req, res) {
//     Project.findById(req.params.id).populate({
//         path: 'issues'
//     }).exec().then(data => {
//         if (!data) {
//             return res.status(404).send('Project not found');
//         }
//         return res.render('indProjects', {
//             title: "Issue Tracker",
//             data
//         });
//     });
// };

// module.exports.issues = function (req, res) {

//     Issue.find({}).then((issues) => {
//         return res.render('issue', {
//             title: "Issue Tracker | Issues",
//             issues: issues
//         });
//     });
// };



// module.exports.createIssue = function (req, res) {
//     Project.findById(req.params.id).then(project => {
//         if (project) {
//             Issue.create({
//                 title: req.body.title,
//                 description: req.body.description,
//                 author: req.body.author,
//                 labels: req.body.labels
//             })
//                 .then(data => {
//                     project.issues.push(data);
//                     project.save();
//                     return res.redirect('back');

//                 }).catch(err => {
//                     console.log(err);
//                     res.status(500).send('Internal Server Error');
//                 })
//         };
//     }).catch(err => {
//         console.log(err);
//         res.status(500).send('Internal Server Error');
//     })
// }


const Project = require('../models/project');
const Issue = require('../models/issue');
const { findById } = require('../models/project');

// create a project for the user
module.exports.create = async function (req, res) {
  try {
    Project.create({
      name: req.body.name,
      description: req.body.description,
      author: req.body.author,
    });
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};

// find project and display it in the project page
module.exports.project = async function (req, res) {
  try {
    let project = await Project.findById(req.params.id).populate({
      path: 'issues',
    });
    if (project) {
      return res.render('project_page', {
        title: 'Project Page',
        project,
      });
    }
    return res.redirect('back');
  } catch (err) {
    console.log(err);
    return res.redirect('back');
  }
};

// create issue
module.exports.createIssue = async function (req, res) {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      let issue = await Issue.create({
        title: req.body.title,
        description: req.body.description,
        labels: req.body.labels,
        author: req.body.author,
      });
      project.issues.push(issue);

      if (!(typeof req.body.labels === 'string')) {
        for (let label of req.body.labels) {
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }
      await project.save();
      return res.redirect(`back`);
    } else {
      return res.redirect('back');
    }
  } catch (err) {
    return res.redirect('back');
  }
};