import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { housesService } from "../Services/HousesService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function drawHouses() {
  let template = ""
  appState.houses.forEach(house => template += house.HouseTemplate)
  setHTML("listings", template)
}

function drawHouseForm() {
  let template = House.getHouseForm(appState.activeHouse)  
  setHTML("forms", template)
}

export class HousesController {
  constructor() {
    appState.on("houses", drawHouses)
  }

  showHouses() {
    this.getHouses()
    drawHouseForm()
  }

  addHouse() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      // @ts-ignore
      let form = window.event.target
      let formData = getFormData(form)

      housesService.addHouse(formData)

      // @ts-ignore
      form.reset()
    } catch (error) {
      console.error("[addHouse]", error)
      Pop.error(error)
    }
  }

  async getHouses() {
    try {
      await housesService.getHouses()
    } catch (error) {
      console.error("[getHouses]", error)
      Pop.error(error)
    }
  }
}
