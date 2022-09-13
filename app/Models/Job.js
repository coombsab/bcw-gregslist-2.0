/**
 * @param {{company: string, jobTitle: string, hours: number, rate: number, description: string, id: string}} data
 * 
 */

export class Job {
  constructor(data) {
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
    this.id = data.id
  }
  get JobTemplate() {
    return /*html*/`
      <div class="col-md-4 col-lg-3 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="text-uppercase">
              ${this.jobTitle} with ${this.company}
            </h5>
            <p>
              <strong>$${this.rate} per hr</strong>
            </p>
            <p>${this.hours} per week</p>
            <p>${this.description}</p>
          </div>
        </div>
      </div>
    `
  }

  /**
   * 
   * @param {Job} editable 
   * @returns 
   */
  static getJobForm(editable) {
    editable = editable || new Job({ company: "", jobTitle: "", hours: 0, rate: 0, description: "" })

    return /*html*/ `
    <form onsubmit="app.jobsController.addJob()">
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="company" required minlength="2" maxlength="20">
        <label for="company">Company</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="text" class="form-control" name="jobTitle" required>
        <label for="jobTitle">Job Title</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="hours" required min="1" max="200">
        <label for="hours">Hours per week</label>
      </div>
    
      <div class="form-floating mb-3">
        <input type="number" class="form-control" name="rate" required min="0">
        <label for="rate">Rate in $ per hour</label>
      </div>
      
      <div class="form-floating">
        <textarea class="form-control" placeholder="Describe your job" name="description"></textarea>
        <label for="description">Description</label>
      </div>
    
      <div class="d-flex my-4 gap-5 align-items-center">
        <button class="btn" type="reset">Cancel</button>
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    `
  }
}


// NOTE Job object requirements
// {
//   "company": {
//     "type": "String",
//     "required": true
//   },
//   "jobTitle": {
//     "type": "String",
//     "required": true
//   },
//   "hours": {
//     "type": "Number",
//     "required": true
//   },
//   "rate": {
//     "type": "Number",
//     "required": true
//   },
//   "description": {
//     "type": "String"
//   }
// }
