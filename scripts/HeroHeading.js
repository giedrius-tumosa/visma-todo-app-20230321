export default class HeroHeading {
  constructor(textContent) {
    this.textContent = textContent;
    this.date = new Date();
  }
  render() {
    this.heroHeading = document.createElement("div");
    this.heroHeading.setAttribute("class", "header__heroHeading");

    this.welcomeHeading = document.createElement("h1");
    let text = document.createTextNode(this.textContent);
    this.welcomeHeading.append(text);
    this.heroHeading.append(this.welcomeHeading);

    this.dateContainer = document.createElement("p");
    text = document.createTextNode(this.date.toLocaleString("lt").slice(0, 19));
    this.dateContainer.append(text);
    this.heroHeading.append(this.dateContainer);

    setInterval(() => {
      this.updateDateContainer();
    }, 1000);

    return this.heroHeading;
  }

  updateDateContainer() {
    this.date = new Date();
    this.dateContainer.textContent = this.date.toLocaleString("lt").slice(0, 19);
  }

}