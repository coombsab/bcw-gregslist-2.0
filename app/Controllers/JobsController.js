import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { jobsService } from "../Services/JobsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawJobs() {
  let template = ""
  appState.jobs.forEach(job => template += job.JobTemplate)
  setHTML('listings', template)
}

function drawJobTemplate() {
  let template = Job.getJobForm(appState.activeJob)
  setHTML("forms", template)
}


export class JobsController {
  constructor() {
    // console.log('the jobs controller')
    appState.on("jobs", drawJobs)
  }

  showJobs() {
    this.getJobs()
    drawJobTemplate()
  }

  addJob() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)

      jobsService.addJob(formData)

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error("[addJob]", error)
      Pop.error(error)
    }
  }

  async getJobs() {
    try {
      await jobsService.getJobs()
    } catch (error) {
      console.error("[getJobs]", error)
      Pop.error(error)
    }
  }
}