import { House } from "./Models/House.js"
import { Job } from "./Models/Job.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {import('./Models/Car').Car[]} */
  cars = []

  /** @type {import('./Models/Car').Car} */
  // @ts-ignore
  activeCar = null

  /** @type {import('./Models/House').House[]} */
  houses = []
  /** @type {import('./Models/House').House} */
  // @ts-ignore
  activeHouse = null

  /** @type {import('./Models/Job').Job[]} */
  jobs = []
  /** @type {import('./Models/Job').Job} */
  // @ts-ignore
  activeJob = null

  carFormTemplate = /*html*/ `
  <form onsubmit="app.carsController.addCar()">
   <div class="form-floating mb-3">
     <input type="text" class="form-control" name="make" required minlength="3" maxlength="20">
     <label for="make">Make</label>
   </div>
  
   <div class="form-floating mb-3">
     <input type="text" class="form-control" name="model" required>
     <label for="model">Model</label>
   </div>
  
   <div class="form-floating mb-3">
     <input type="number" class="form-control" name="year" required min="1886" max="9999">
     <label for="year">Year</label>
   </div>
  
   <div class="form-floating mb-3">
     <input type="number" class="form-control" name="price" required min="0">
     <label for="price">Price</label>
   </div>
  
   <div class="form-floating mb-3">
     <input type="url" class="form-control" name="imgUrl">
     <label for="imgUrl">Image Url <i>(We are too lazy for uploads)</i></label>
   </div>
  
   <div class="form-floating">
     <textarea class="form-control" placeholder="Describe your Listing" name="description"></textarea>
     <label for="description">Description</label>
   </div>
  
   <div class="d-flex my-4 gap-5 align-items-center">
     <button class="btn" type="reset">Cancel</button>
     <button class="btn btn-primary" type="submit">Submit</button>
   </div>
  `
}

export const appState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
