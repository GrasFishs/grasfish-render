import { MainStage } from "./src/main";

const stage = new MainStage(document.getElementById("app"));

stage.initState();
stage.didMount();
stage.render();
