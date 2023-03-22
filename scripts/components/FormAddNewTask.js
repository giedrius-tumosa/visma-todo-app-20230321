import { taskList } from "../main.js";

export default class FormAddNewTask {
  constructor() {
  }

  render() {
    // Form
    this.form = document.createElement("form");
    this.form.setAttribute("class", "formAddNewTask");

    // Input description

    this.descriptionContainer = document.createElement("div");
    this.descriptionContainer.setAttribute("class", "descriptionContainer");
    // TODO: restrict textarea to 160char manually
    // todo: add confirmation window if item is about tobe deleted

    this.descriptionLabel = document.createElement("label");
    this.descriptionLabel.setAttribute("for", "descriptionInput");
    let text = document.createTextNode("Description: ");
    this.descriptionLabel.append(text);

    this.descriptionInput = document.createElement("textarea");
    this.descriptionInput.setAttribute("id", "descriptionInput");
    this.descriptionInput.setAttribute("name", "descriptionInput");
    this.descriptionInput.setAttribute("maxlength", "160");
    this.descriptionInput.setAttribute("required", "required");

    this.descriptionContainer.append(this.descriptionLabel, this.descriptionInput);

    // Input description

    this.deadlineContainer = document.createElement("div");
    this.deadlineContainer.setAttribute("class", "deadlineContainer");

    this.deadlineLabel = document.createElement("label");
    this.deadlineLabel.setAttribute("for", "deadlineInput");
    text = document.createTextNode("Deadline: ");
    this.deadlineLabel.append(text);

    this.deadlineInput = document.createElement("input");
    this.deadlineInput.setAttribute("id", "deadlineInput");
    this.deadlineInput.setAttribute("name", "deadlineInput");
    this.deadlineInput.setAttribute("type", "datetime-local");

    this.deadlineContainer.append(this.deadlineLabel, this.deadlineInput);

    // Add and cancel button

    this.buttonContainer = document.createElement("div");
    this.buttonContainer.setAttribute("class", "formButtonContainer");


    this.buttonAdd = document.createElement("button");
    this.buttonAdd.setAttribute("class", "buttonAdd");
    this.buttonAdd.setAttribute("type", "submit");
    text = document.createTextNode("Add");
    this.buttonAdd.append(text);

    this.buttonCancel = document.createElement("button");
    this.buttonCancel.setAttribute("class", "buttonCancel");
    this.buttonCancel.setAttribute("type", "button");
    text = document.createTextNode("Cancel");
    this.buttonCancel.append(text);

    this.buttonContainer.append(this.buttonAdd, this.buttonCancel);

    // Appends to form

    this.form.append(this.descriptionContainer, this.deadlineContainer, this.buttonContainer);

    // EVENT LISTENERS

    // Form submit event
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();

      const [description, deadline] = [
        e.target.descriptionInput.value,
        e.target.deadlineInput.value,
      ];

      console.log(description, deadline);

      // Reset
      this.descriptionInput.value = "";
      this.deadlineInput.value = "";

      // Add new task to database
      const taskData = JSON.parse(sessionStorage.getItem("todoAppData"));
      const today = new Date().toLocaleString("lt").slice(0, 16);
      const revisedDeadline = deadline ? new Date(deadline).toLocaleString("lt").slice(0, 16) : "";

      const newTask = {
        id: `${this.newId(taskData.tasks)}`,
        description: description,
        deadline: revisedDeadline,
        createdOn: today,
        completedOn: "",
        isCompleted: false
      };

      taskData.tasks.push(newTask);
      sessionStorage.setItem("todoAppData", JSON.stringify(taskData));

      // Re-render tasklist
      const taskSection = document.querySelector(".main__taskSection");
      taskSection.append(taskList.render());
    });

    // Cancel form event

    this.buttonCancel.addEventListener("click", () => {
      // TODO: add form hide and expand animation
    });
    return this.form;
  }

  newId(array) {
    let id;
    let guard = 0;
    while (!id) {
      guard++;
      if (guard > 10000) break;
      const randomNum = Math.floor(Math.random() * 10000);
      const today = parseInt(new Date().getTime());
      const finalId = randomNum + today;
      const idExists = array.some(el => el.id === finalId);
      if (!idExists) {
        id = finalId;
        break;
      }
    }
    return id;
  }
}