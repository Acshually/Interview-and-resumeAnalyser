import {useContext, useEffect} from "react"
import { useParams } from "react-router"
import {InterviewContext} from "../contexts/interview.jsx"
import {generateInterviewReport,getInterviewReportById,getAllInterviewReports,generateResumePdf} from "../services/interview.api.js"


export const useInterview = () => {

    const context = useContext(InterviewContext)
    const {interviewId} = useParams()

    if(!context){
        throw new Error("useInterview must be within an InterviewProvider")

    }

    const {loading ,setLoading ,report , setReport,reports,setReports } = context

    const generateReport = async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)
        let response = null

        try{
            response = await generateInterviewReport({jobDescription,selfDescription,resumeFile})
        }
        catch (e){
            console.log(e);
            
        }
        finally{
            setLoading(false)
        }

        return response?.interviewReport
    }


    const getReportById = async (interviewId) => {
        setLoading(true)

        let response = null

        try{
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        }
        catch(e){
            console.log(e);
        }
        finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null

        try{
            response = await getAllInterviewReports()
            setReports(response.interviewReports)
        }
        catch (e){
            console.log(e);
        }
        finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        let response = null

        try{
            response = await generateResumePdf({interviewReportId})
            const url = window.URL.createObjectURL(new Blob([response ],{type: "application/pdf"}))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download",`resume-${interviewReportId}.pdf`)
            link.click()
        }
        catch (e){
            console.log(e);
        }
        finally{
            setLoading(false)
        }

        return response.interviewReport
    }

    useEffect(()=>{
        if(interviewId){
            getReportById(interviewId)
        }
        else {
            getReports()
        }
    },[interviewId])

   
    return {
        loading,
        setLoading,
        generateReport,
        getReportById,
        getReports,
        getResumePdf,
        report,
        reports
    }
}