import { renderTaskList } from "./TaskList.js";
import { data } from "../data/data.js";

// Upload test data
sessionStorage.setItem("todoAppData", JSON.stringify(data));

const app = document.querySelector("#app");

renderTaskList(app);




