import { globalState } from "./Helper/constants.js";
import {initGameRender} from "./Render/main.js"
import { GlobalEvent } from "./Events/global.js";
import { RootDiv } from "./Helper/constants.js";

initGameRender(globalState);
GlobalEvent()
console.log("RootDiv:", RootDiv);