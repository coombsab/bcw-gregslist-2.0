import { appState } from "../AppState.js"
import { House } from "../Models/House.js"
import { SandboxServer } from "./AxiosService.js"

class HousesService {
  async getHouses() {
    const response = await SandboxServer.get("/api/houses")
    console.log("houses?", response.data)
    appState.houses = response.data.map(rawData => new House(rawData))
    console.log("houses?", appState.houses)
  }
  addHouse(formData) {
    let house = new House(formData)
    appState.houses = [house, ...appState.houses]
  }
}

export const housesService = new HousesService()