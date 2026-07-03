const {Router} = require("express")
const {upload} = require("../middleware/file.middleware")
const authMiddleware = require("../middleware/auth.middleware")
const {generateInterviewReportContoller, getInterviewReportById, getAllInterviewReportsController} = require("../controllers/interview.controller")

const interviewRouter = Router()

/**
 * 
 * Post
 * @requires authentication
 * @middleware upload.single('resume')
 * @controller generateInterviewReportContoller
 */
interviewRouter.post("/",authMiddleware, upload.single('resume'), generateInterviewReportContoller)
interviewRouter.get("/report/:interviewId", authMiddleware, getInterviewReportById)
interviewRouter.get("/", authMiddleware, getAllInterviewReportsController)


module.exports = interviewRouter