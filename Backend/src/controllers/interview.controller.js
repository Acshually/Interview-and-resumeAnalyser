const pdfParse = require("pdf-parse")
const {generrateInterviewReport} = require("../services/ai.services")
const InterviewModel = require("../models/interview.model")



/**
 * @description Controller function to generate an interview report
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<Object>} - The generated interview report
 */
async function generateInterviewReportContoller(req,res){
     const resume = req.file

     let resumeText = ""
     if (req.file && req.file.buffer) {
          const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
          resumeText = typeof resumeContent === 'string' ? resumeContent : (resumeContent ? resumeContent.text : "")
     }
     console.log("Resume Text parsed length:", resumeText.length)

     const{selfDescription , jobDescription} = req.body

     const interviewReportByAI = await generrateInterviewReport({resume: resumeText, selfDescription, jobDescription})
     
   //   console.log("========== interviewReportByAI==========")
   //   console.log(interviewReportByAI)
   //   console.log("================================")
     const interviewReport = await InterviewModel.create({
        user: req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        technicalQuestion: interviewReportByAI.technicalQuestions,
        behavioralQuestion: interviewReportByAI.behavioralQuestions,
        skillGap: interviewReportByAI.skillGaps,
        preparationPlan: interviewReportByAI.preparationPlan,
        matchScore: interviewReportByAI.matchScore,
        title: interviewReportByAI.title
     })

     return res.status(201).json({message: "Interview report generated successfully", interviewReport})
}



/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportById(req,res){
  const {interviewId} = req.params

  const interviewReport = await InterviewModel.findOne({_id: interviewId , user: req.user.id})

  if(!interviewReport){
    return res.status(404).json({
      message: "Interview report not found"
    })
  }

  return res.status(201).json({
    message: "Interview report found successfully",
    interviewReport
  })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await InterviewModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestion -behavioralQuestion -skillGap -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}





module.exports = {generateInterviewReportContoller, getInterviewReportById , getAllInterviewReportsController}