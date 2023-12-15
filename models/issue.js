// const mongoose=require('mongoose');

// const IssueSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     labels:[{
//         type:String,
//         required:true
//     }],
//     author:{
//         type:String,
//         required:true
//     },
// })

// const Issue=mongoose.model('Issue',IssueSchema);
// module.exports=Issue;

const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: String,
      trim: true,
      required: true,
    },
    labels: [
      {
        type: String,
        trim: true,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Issue = mongoose.model('Issue', issueSchema);

module.exports = Issue;