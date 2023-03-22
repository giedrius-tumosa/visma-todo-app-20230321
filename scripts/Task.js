import { renderTaskList } from "./TaskList.js";

export default class Task {
  constructor(props) {
    this.props = props;
    return this.render();
  }
  render() {
    // TASK CARD: 

    this.taskCard = document.createElement("article");
    this.taskCard.setAttribute("class", "taskCard");

    this.props.isCompleted
      ? this.taskCard.classList.add("taskCard--completed")
      : this.taskCard.classList.remove("taskCard--completed");

    // CARD HEADER:

    this.header = document.createElement("header");
    this.taskCard.append(this.header);
    this.header.setAttribute("class", "taskCard__header");

    // Header content

    this.headerContentWrap = document.createElement("div");
    this.headerContentWrap.setAttribute("class", "contentWrap");
    this.header.append(this.headerContentWrap);

    this.createdOn = document.createElement("span");
    this.createdOn.setAttribute("class", "taskCard__createdOn");
    let text = document.createTextNode(`Created: ${this.props.createdOn}`);
    this.createdOn.append(text);
    this.headerContentWrap.append(this.createdOn);

    this.deadline = document.createElement("span");
    this.deadline.setAttribute("class", "taskCard__deadline");

    if (this.props.isCompleted) {
      text = document.createTextNode(`Due in: task already completed`);
    }
    if (!this.props.isCompleted) {
      const today = new Date().toLocaleString("lt").slice(0, 16);
      text = document.createTextNode(
        `Due in: ${dateDifference(this.props.deadline, today)}`
      );
    }

    this.deadline.append(text);
    this.headerContentWrap.append(this.deadline);

    // Card description

    this.taskDescription = document.createElement("p");
    this.taskDescription.setAttribute("class", "taskCard_description");
    text = document.createTextNode(this.props.description);
    this.taskDescription.append(text);
    this.taskCard.append(this.taskDescription);

    // CARD FOOTER:

    this.footer = document.createElement("footer");
    this.taskCard.append(this.footer);
    this.footer.setAttribute("class", "taskCard__footer");

    // Footer content

    this.footerContentWrap = document.createElement("div");
    this.footerContentWrap.setAttribute("class", "contentWrap");
    this.footer.append(this.footerContentWrap);

    this.formMarkComplete = document.createElement("form");
    this.formMarkComplete.setAttribute("class", "form_markComplete");
    this.footerContentWrap.append(this.formMarkComplete);

    this.inputIsCompletedWrapper = document.createElement("div");
    this.inputIsCompletedWrapper.setAttribute("class", "inputIsCompletedWrapper");
    this.formMarkComplete.append(this.inputIsCompletedWrapper);

    this.inputIsCompleted = document.createElement("input");
    this.inputIsCompleted.setAttribute("id", "inputIsCompleted");
    this.inputIsCompleted.setAttribute("type", "checkbox");
    this.inputIsCompleted.checked = this.props.isCompleted;
    this.inputIsCompletedWrapper.append(this.inputIsCompleted);

    this.labelIsCompleted = document.createElement("label");
    text = document.createTextNode(`Completed ${this.props.completedOn && `on ${this.props.completedOn}`}`);
    this.labelIsCompleted.append(text);
    this.inputIsCompletedWrapper.append(this.labelIsCompleted);

    // Delete button

    this.deleteButton = document.createElement("button");
    this.deleteButton.setAttribute("class", "tasCard__btnDelete");
    this.deleteButton.setAttribute("type", "button");
    this.footerContentWrap.append(this.deleteButton);
    text = document.createTextNode("Delete");
    this.deleteButton.append(text);

    // EVENT LISTENERS:

    // Checkbox isCompleted

    this.inputIsCompleted.addEventListener("change", (e) => {
      const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));
      const taskIndex = taskData.tasks.findIndex((task) => task.id === this.props.id);
      const app = document.querySelector("#app");
      const today = new Date().toLocaleString("lt").slice(0, 16);


      if (!this.inputIsCompleted.checked) {
        taskData.tasks[taskIndex].isCompleted = false;
        taskData.tasks[taskIndex].completedOn = "";
        sessionStorage.setItem("todoAppData", JSON.stringify(taskData));
        this.taskCard.classList.remove("taskCard--completed");
        renderTaskList(app);
      }
      if (this.inputIsCompleted.checked) {
        taskData.tasks[taskIndex].isCompleted = true;
        taskData.tasks[taskIndex].completedOn = today;
        sessionStorage.setItem("todoAppData", JSON.stringify(taskData));
        this.taskCard.classList.add("taskCard--completed");
        renderTaskList(app);
      }
    });

    // Delete button

    this.deleteButton.addEventListener("click", (e) => {
      const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));
      const newTaskData = { tasks: taskData.tasks.filter(task => task.id !== this.props.id) };

      sessionStorage.setItem("todoAppData", JSON.stringify(newTaskData));
      const app = document.querySelector("#app");
      renderTaskList(app);
    });

    return this.taskCard;
  }
}

function dateDifference(date1, date2) {
  // Date difference in miliseconds
  const dateDifference = new Date(date1) - new Date(date2);

  // Conversion to DD HH MM format
  const daysLeft = Math.trunc(
    dateDifference / 1000 / 3600 / 24
  );
  const hoursLeft = Math.trunc(
    (dateDifference - (daysLeft * 1000 * 3600 * 24)) / 1000 / 3600
  );
  const minutesLeft = Math.trunc(
    ((dateDifference - (daysLeft * 1000 * 3600 * 24)) - hoursLeft * 1000 * 3600) / 1000 / 60
  );


  return !(date1 && date2) ? `no deadline` : `${daysLeft} d | ${hoursLeft} h | ${minutesLeft} min`;
}