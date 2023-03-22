import { data } from "../data/data.js";
import HomePage from "./components/HomePage.js";
import TaskList from "./components/TaskList.js";


// Upload test data
sessionStorage.setItem("todoAppData", JSON.stringify(data));

const app = document.querySelector("#app");

// Tasklist used by other components
export const taskList = new TaskList();

// Homepage render
const homePage = new HomePage();
app.append(homePage.render());








