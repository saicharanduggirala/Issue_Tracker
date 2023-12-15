// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     author: {
//         type: String,
//         required: true
//     },
//     issues:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Issue'
//         // should use the name in ref of the model exactly as the name that is used to export in model files    
//     }]
// }, {
//     timestamps: true
// })


// const Project = mongoose.model('Project', projectSchema);
// module.exports = Project;



const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
    labels: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;