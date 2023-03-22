import Task from "./Task.js";
import Sorter from "./Sorter.js";

export default class TaskList {
  constructor(props) {
    this.props = props;
    return this.render();
  }
  render() {

    this.taskList = document.createElement("ul");
    this.taskList.setAttribute("class", "taskList");

    this.props.data.forEach(task => {
      this.listItem = document.createElement("li");
      this.listItem.append(new Task(task));
      this.taskList.append(this.listItem);
    });

    return this.taskList;
  }
}

export function renderTaskList(parent, sortOption) {
  let sortedData;
  const taskList = document.querySelector(".taskList");

  // Reset
  if (taskList) {
    taskList.remove();
  }
  const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));

  switch (sortOption) {
    case "deadline":
      sortedData = Sorter.closestDeadline(taskData.tasks);
      break;
    default:
      sortedData = Sorter.closestDeadline(taskData.tasks);
      break;
  }

  parent.append(new TaskList({ data: sortedData }));
}