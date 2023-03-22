import HeroHeading from "./HeroHeading.js";
import { taskList } from "../main.js";
import NewTaskSection from "./NewTaskSection.js";
import SortPanelSection from "./SortPanelSection.js";

export default class HomePage {
  constructor() {
  }
  render() {
    // HOME PAGE
    this.HomePage = document.createElement("div");
    this.HomePage.setAttribute("class", "pageWrapper");

    // GLOBAL HEADER
    this.header = document.createElement("header");
    this.header.setAttribute("class", "header--global");
    this.HomePage.append(this.header);

    const heroHeading = new HeroHeading("Welcome to your To-Do-App");
    this.header.append(heroHeading.render());

    // GLOBAL MAIN
    this.main = document.createElement("main");
    this.main.setAttribute("class", "main--global");
    this.HomePage.append(this.main);

    // Sort panel section

    const sortPanelSection = new SortPanelSection();
    this.main.append(sortPanelSection.render());

    // New task section

    const newTaskSection = new NewTaskSection();
    this.main.append(newTaskSection.render());

    // Task list section

    this.taskSection = document.createElement("section");
    this.taskSection.setAttribute("class", "main__taskSection");
    this.main.append(this.taskSection);

    this.taskSection.append(taskList.render());

    // GLOABAL FOOTER
    this.footer = document.createElement("footer");
    this.footer.setAttribute("class", "footer--global");
    this.HomePage.append(this.footer);


    return this.HomePage;
  }
}