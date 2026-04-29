import { globalState } from "./Helper/constants.js";
import {initGameRender} from "./Render/main.js"
import { GlobalEvent } from "./Events/global.js";

initGameRender(globalState);
GlobalEvent()
