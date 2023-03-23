export default class Sorter {
  constructor() {
  }
  static newOnTop(array) {
    return array.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime();
      } else {
        return a.isCompleted ? 1 : -1;
      }
    });
  }

  static recentlyCompleted(array) {
    // If no completed items, uses default sorting;
    if (array.every(task => !task.isCompleted)) {
      return this.newOnTop(array);
    }
    return array.sort((a, b) => {
      if (a.isCompleted && !b.isCompleted) {
        return -1;
      } else if (!a.isCompleted && b.isCompleted) {
        return 1;
      } else if (a.isCompleted && b.isCompleted) {
        return new Date(b.completedOn) - new Date(a.completedOn);
      } else {
        return new Date(a.deadline) - new Date(b.deadline);
      }
    }
    );
  }

  static closestDeadline(array) {
    // If no completed items, uses default sorting;
    if (array.every(task => !task.deadline)) {
      return this.newOnTop(array);
    }
    return array.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        const today = new Date().toLocaleString("lt").slice(0, 16);
        const aTimeDiff = new Date(a.deadline || "9999-01-01 00:00").getTime() - new Date(today).getTime();
        const bTimeDiff = new Date(b.deadline || "9999-01-01 00:00").getTime() - new Date(today).getTime();
        return aTimeDiff - bTimeDiff;
      } else {
        return a.isCompleted ? 1 : -1;
      }
    });
  }
}
