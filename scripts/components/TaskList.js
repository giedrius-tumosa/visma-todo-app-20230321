import Task from "./Task.js";
import Sorter from "./Sorter.js";

export default class TaskList {
  constructor() {
    this.sortOption = "default";
  }

  set setOption(option) {
    this.sortOption = option;
  }
  get getOption() {
    return this.sortOption;
  }

  render() {
    let sortedData;

    this.taskList = document.createElement("ul");
    this.taskList.setAttribute("class", "taskList");

    // Reset;
    const taskList = document.querySelector(".taskList");
    if (taskList) {
      taskList.remove();
    }

    // Get data to render
    const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));

    // Handle no tasks in the database
    if (taskData.tasks.length === 0) {
      this.noTasksMsg = document.createElement("h2");
      this.noTasksMsg.setAttribute("class", "noTasksMsg");
      let text = document.createTextNode("No tasks have been created.");
      this.noTasksMsg.append(text);
      this.taskList.append(this.noTasksMsg);
    } else {
      document.querySelector(".noTasksMsg")?.remove();
    }

    // Sorting options
    switch (this.sortOption) {
      case "completedRecent":
        sortedData = Sorter.recentlyCompleted(taskData.tasks);
        break;
      case "deadline":
        sortedData = Sorter.closestDeadline(taskData.tasks);
        break;
      default:
        sortedData = Sorter.newOnTop(taskData.tasks);
        break;
    }

    // Create task cards
    sortedData.forEach(task => {
      this.listItem = document.createElement("li");
      this.listItem.append(new Task(task));
      this.taskList.append(this.listItem);
    });

    return this.taskList;
  }
}

