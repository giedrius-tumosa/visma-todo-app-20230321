import { taskList } from "../main.js";

export default class ConfirmationWindow {
  constructor(taskTitle = "", taskId) {
    this.taskTitle = taskTitle;
    this.taskId = taskId;
  }
  render() {
    // Overlay container
    this.overlayContainer = document.createElement("div");
    this.overlayContainer.setAttribute("class", "overlayContainer");

    // Window container {
    this.contentContainer = document.createElement("div");
    this.contentContainer.setAttribute("class", "contentContainer");
    this.overlayContainer.append(this.contentContainer);

    // Heading
    this.heading = document.createElement("h2");
    this.heading.setAttribute("class", "confirmtationText");
    let text = document.createTextNode(`Do you really want to delete this task?`);
    this.heading.append(text);
    this.contentContainer.append(this.heading);

    // Task title

    this.taskInfo = document.createElement("h2");
    this.taskInfo.setAttribute("class", "contentContainer__taskTitle");
    text = document.createTextNode(`Task: ${this.taskTitle}`);
    this.taskInfo.append(text);
    this.contentContainer.append(this.taskInfo);

    // Buttons
    this.buttonContainer = document.createElement("div");
    this.buttonContainer.setAttribute("class", "confirmationButtons");
    this.contentContainer.append(this.buttonContainer);

    this.buttonYes = document.createElement("button");
    this.buttonYes.setAttribute("class", "buttonYes");
    this.buttonYes.setAttribute("type", "button");
    text = document.createTextNode("Yes");
    this.buttonYes.append(text);

    this.buttonNo = document.createElement("button");
    this.buttonNo.setAttribute("class", "buttonNo");
    this.buttonNo.setAttribute("type", "button");
    text = document.createTextNode("No");
    this.buttonNo.append(text);

    this.buttonContainer.append(this.buttonYes, this.buttonNo);

    // Event listeners

    this.buttonYes.addEventListener("click", () => {
      const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));
      const newTaskData = { tasks: taskData.tasks.filter(task => task.id !== this.taskId) };

      sessionStorage.setItem("todoAppData", JSON.stringify(newTaskData));
      const taskSection = document.querySelector(".main__taskSection");
      taskSection.append(taskList.render());
      const modal = document.querySelector(".overlayContainer");
      modal?.remove();
    });

    this.buttonNo.addEventListener("click", () => {
      const modal = document.querySelector(".overlayContainer");
      modal?.remove();
    });


    return this.overlayContainer;
  }
}
