import { taskList } from "../main.js";

export default class SortPanelSection {
  constructor() {
  }
  render() {
    // Sort panel section
    this.sortPanelSection = document.createElement("section");
    this.sortPanelSection.setAttribute("class", "sortPanelSection");

    // Heading

    this.sortHeading = document.createElement("h3");
    let text = document.createTextNode("Sort your tasks here");
    this.sortHeading.append(text);
    this.sortPanelSection.append(this.sortHeading);

    // Sort button container
    this.sortButtonContainer = document.createElement("div");
    this.sortButtonContainer.setAttribute("class", "sortButtonContainer");
    this.sortPanelSection.append(this.sortButtonContainer);

    // Sort buttons

    this.btnNewestTop = document.createElement("button");
    this.btnNewestTop.setAttribute("type", "button");
    text = document.createTextNode("Newest on top");
    this.btnNewestTop.append(text);


    this.btnByDeadline = document.createElement("button");
    this.btnByDeadline.setAttribute("type", "button");
    text = document.createTextNode("Closest deadline");
    this.btnByDeadline.append(text);


    this.btnRecentCompleted = document.createElement("button");
    this.btnRecentCompleted.setAttribute("type", "button");
    text = document.createTextNode("Recently completed");
    this.btnRecentCompleted.append(text);


    this.sortButtonContainer.append(this.btnNewestTop, this.btnByDeadline, this.btnRecentCompleted);


    // Event listeners

    this.btnByDeadline.addEventListener("click", () => {
      const taskSection = document.querySelector(".main__taskSection");
      taskList.setOption = "deadline";
      taskSection.append(taskList.render());
    });

    this.btnNewestTop.addEventListener("click", () => {
      const taskSection = document.querySelector(".main__taskSection");
      taskList.setOption = "default";
      taskSection.append(taskList.render());
    });

    this.btnRecentCompleted.addEventListener("click", () => {
      const taskSection = document.querySelector(".main__taskSection");
      taskList.setOption = "completedRecent";
      taskSection.append(taskList.render());
    });





    return this.sortPanelSection;
  }

}