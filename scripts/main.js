import { data } from "../data/data.js";
import HomePage from "./HomePage.js";
import TaskList from "./TaskList.js";

// Upload test data
sessionStorage.setItem("todoAppData", JSON.stringify(data));

const app = document.querySelector("#app");
export const taskList = new TaskList();
const homePage = new HomePage();
app.append(homePage.render());













// const body = document.querySelector("body");

// export const taskList = new TaskList();

// app.append(taskList.render());

// const sortButton = document.createElement("button");
// sortButton.setAttribute("type", "button");
// sortButton.textContent = "SORT";

// body.append(sortButton);

// sortButton.addEventListener("click", () => {
//   taskList.setOption = "completedRecent";
//   app.append(taskList.render());
// });











