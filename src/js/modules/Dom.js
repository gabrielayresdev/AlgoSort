export default class Dom {
  static swapItems(from, to) {
    const fromParent = from.parentElement;
    const toParent = to.parentElement;

    return new Promise((resolve) => {
      fromParent.appendChild(to);
      toParent.appendChild(from);
      setTimeout(resolve, 100); // Wait for 1 second (1000 milliseconds)
    });
  }

  static throwLeft(item, pivot, array) {
    const parent = array[item].parentElement;

    // Pauses the loop to allow the user to see changes
    return new Promise((resolve) => {
      pivot.parentNode.parentNode.insertBefore(parent, pivot.parentNode);
      setTimeout(resolve, 10);
    });
  }

  static throwRight(item, lastRightArrayItem, array) {
    const parent = array[item].parentElement;

    // Pauses the loop to allow the user to see changes
    return new Promise((resolve) => {
      lastRightArrayItem.parentNode.parentNode.insertBefore(
        parent,
        lastRightArrayItem.parentNode.nextSibling
      );
      setTimeout(resolve, 10);
    });
  }

  static turnToMerged(array, [array1, array2]) {
    const originalPosition = array1.concat(array2);
    originalPosition.forEach((item, index) => {
      const toParent = item.parentElement;
      const fromParent = array[index].parentElement;

      toParent.appendChild(array[index]);
      fromParent.appendChild(item);
    });
  }
}
