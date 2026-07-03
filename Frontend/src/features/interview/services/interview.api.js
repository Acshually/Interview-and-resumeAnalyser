import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    withCredentials: true
})

/**
 * Generates an interview report based on job description, self description, and resume file
 * @param {object} data - Object containing job description, self description, and resume file
 * @returns {Promise<object>} - The generated interview report
 */
export const generateInterviewReport = async ({jobDescription,selfDescription,resumeFile}) => {
    const formData = new FormData()
    if (jobDescription) formData.append("jobDescription", jobDescription)
    if (selfDescription) formData.append("selfDescription", selfDescription)
    if (resumeFile) formData.append("resume", resumeFile)
    
    const response = await api.post("/api/interview/",formData ,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
}


export const getInterviewReportById = async (interviewId) => {
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}

/**
 * Retrieves all interview reports for the authenticated user
 * @returns {Promise<array>} - Array of interview reports
 */
export const getAllInterviewReports = async() => {
    const response = await api.get("/api/interview/")

    return response.data
}

/**
 * Generates a PDF resume for the given interview report
 * @param {string} interviewReportId - The ID of the interview report
 * @returns {Promise<Blob>} - The generated PDF resume as a Blob
 */
export const generateResumePdf = async({interviewReportId}) => {
    const response = await api.post(`api/interview/resume/pdf/${interviewReportId}`,null,{
        responseType:"blob"
    })

    return response.data
}