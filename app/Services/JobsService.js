import { appState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { saveState } from "../Utils/Store.js"
import { SandboxServer } from "./AxiosService.js"

class JobsService {
  async getJobs() {
    const response = await SandboxServer.get("/api/jobs")
    console.log("jobs?", response.data)
    appState.jobs = response.data.map(rawData => new Job(rawData))
    console.log("jobs?", appState.jobs)
  }
  addJob(formData) {
    let job = new Job(formData)
    appState.jobs = [job, ...appState.jobs]
  }

}

export const jobsService = new JobsService()