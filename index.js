import {InitGame} from "./data/data.js"
import {initGameRender} from "./Render/main.js"

const globalState = InitGame()
initGameRender(globalState);