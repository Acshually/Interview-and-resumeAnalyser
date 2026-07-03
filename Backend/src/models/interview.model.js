const mongoose = require("mongoose")

const technicalQuestionSchema = new mongoose.Schema({
    question:{
        type:String,
        required: [true,"PTechnical question is required "]
    },
    intention:{
        type:String,
        required:[ true, "Intention is required" ]
    },
    answer:{
        type:String,
        required:[true, "Answer is required"]
    }
},{
    _id:false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [ true, "Technical question is required" ]
    },
    intention: {
        type: String,
        required: [ true, "Intention is required" ]
    },
    answer: {
        type: String,
        required: [ true, "Answer is required" ]
    }
}, {
    _id: false
})


const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [ true,"Skill is required"]
    },
    severity:{
        type:String,
        enum:["low","medium","high"],
        required: [ true, "Severity is required" ]
    }
},{
    _id:false
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required" ]
    } ]
})


const interviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required:[true,'job desc is req']
    },
    resume:{
        type:String,

    },
    selfDescription:{
        type: String,
        min: 0,
        max: 100
    },
    matchScore: {
        type: Number
    },
    title: {
        type: String
    },
    technicalQuestion:[technicalQuestionSchema],
    behavioralQuestion:[behavioralQuestionSchema],
    skillGap:[skillGapSchema],
    preparationPlan:[preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},{
    timestamps:true
})

module.exports = mongoose.model("InterviewReport",interviewReportSchema)