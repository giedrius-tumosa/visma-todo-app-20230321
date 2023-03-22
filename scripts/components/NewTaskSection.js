import FormAddNewTask from "./FormAddNewTask.js";

export default class NewTaskSection {
  constructor() {
  }
  render() {
    // NEW TASK SECTION
    this.newTaskSection = document.createElement("section");
    this.newTaskSection.setAttribute("class", "newTaskSection");

    // Form section

    this.formSection = document.createElement("div");
    this.formSection.setAttribute("class", "addNewTaskSection");
    this.newTaskSection.append(this.formSection);

    // Expandable new task form clickable item

    this.addNewTaskTitle = document.createElement("h3");
    this.addNewTaskTitle.setAttribute("class", "newTaskSection__title");
    let text = document.createTextNode("Add new task");
    this.addNewTaskTitle.append(text);
    this.formSection.append(this.addNewTaskTitle);

    // Form

    const formAddNewTask = new FormAddNewTask();
    this.formSection.append(formAddNewTask.render());

    // Event listeners

    this.addNewTaskTitle.addEventListener("click", () => {
      const form = document.querySelector(".formAddNewTask");
      form.classList.toggle("form--expand");
    });

    return this.newTaskSection;
  }
}