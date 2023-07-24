export default class Dom {
  static swapItems(from, to) {
    const fromParent = from.parentElement;
    const toParent = to.parentElement;

    return new Promise((resolve) => {
      fromParent.appendChild(to);
      toParent.appendChild(from);
      setTimeout(resolve, 20); // Wait for 1 second (1000 milliseconds)
    });
  }
}
