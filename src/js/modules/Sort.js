import Dom from "./Dom.js";

export default class Sort {
  constructor(amount) {
    this.elements = this.createElements(amount);
  }

  alocaArray(seletor) {
    const containers = document.querySelectorAll(seletor);
    containers.forEach((container) => {
      this.elements.forEach((element) => {
        const clone = element.cloneNode(true);
        container.appendChild(clone);
      });
    });

    const button = document.querySelector("[data-play]");
    button.addEventListener("click", () => {
      const area = document.querySelector(".sort-area");
      this.selectionSort(area.querySelector("[data-sort=selectionSort]"));
      this.bubbleSort(area.querySelector("[data-sort=bubbleSort]"));
      this.insertionSort(area.querySelector("[data-sort=insertionSort]"));
      this.quickSort(area.querySelector("[data-sort=quickSort]"));
      this.mergeSort(area.querySelector("[data-sort=mergeSort]"));
    });
  }

  createElements(amount) {
    const array = [];
    const { height, padding } = window.getComputedStyle(
      document.querySelector(".sort-area")
    );

    const maxHeight = parseFloat(height) - parseFloat(padding) - 30;

    for (let i = 0; i < amount; i++) {
      const altura = Math.floor(Math.random() * (maxHeight - 5) + 5);
      const element = document.createElement("div");
      element.innerHTML = `<div class="sort-element" style="height: ${altura}px"></div>`;
      array.push(element);
    }
    return array;
  }

  async insertionSort(container) {
    const lista = Array.from(container.querySelectorAll(".sort-element"));

    for (let i = 1; i < lista.length; i++) {
      let j = i - 1;

      // Troca os elementos enquanto o array é percorrido do fim para o começo e o elemento no índice [x] é menor que o elemento no índice [x - 1]
      while (
        j > -1 &&
        +lista[j + 1].style.height.replace("px", "") <
          +lista[j].style.height.replace("px", "")
      ) {
        // Troca os itens na UI
        await Dom.swapItems(lista[j], lista[j + 1]);

        // Troca os itens no array
        const aux = lista[j];
        lista[j] = lista[j + 1];
        lista[j + 1] = aux;

        j--;
      }
    }

    return lista;
  }

  async bubbleSort(container) {
    const lista = Array.from(container.querySelectorAll(".sort-element"));

    for (let i = lista.length; i > 0; i--) {
      for (let j = 0; j < lista.length - 1; j++) {
        if (
          +lista[j].style.height.replace("px", "") >
          +lista[j + 1].style.height.replace("px", "")
        ) {
          await Dom.swapItems(lista[j + 1], lista[j]);

          const aux = lista[j];
          lista[j] = lista[j + 1];
          lista[j + 1] = aux;
        }
      }
    }

    return lista;
  }

  async selectionSort(container) {
    const lista = Array.from(container.querySelectorAll(".sort-element"));

    for (let i = 0; i < lista.length; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        if (
          +lista[i].style.height.replace("px", "") >
          +lista[j].style.height.replace("px", "")
        ) {
          await Dom.swapItems(lista[i], lista[j]);

          const aux = lista[i];
          lista[i] = lista[j];
          lista[j] = aux;
        }
      }
    }
  }

  async quickSort(container) {
    const lista = Array.from(container.querySelectorAll(".sort-element"));
    const quickSortArray = async (arr) => {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[0];
      const leftArr = [];
      const rightArr = [];

      for (let i = 1; i < arr.length; i++) {
        if (
          +arr[i].style.height.replace("px", "") <
          +pivot.style.height.replace("px", "")
        ) {
          await Dom.throwLeft(i, pivot, arr, leftArr);
          leftArr.push(arr[i]);
        } else {
          await Dom.throwRight(
            i,
            rightArr[rightArr.length - 1]
              ? rightArr[rightArr.length - 1]
              : pivot,
            arr
          );
          rightArr.push(arr[i]);
        }
      }

      const x = await quickSortArray(leftArr);
      const y = await quickSortArray(rightArr);
      return [...x, pivot, ...y];
    };
    await quickSortArray(lista);
  }

  mergeSort(container) {
    const lista = Array.from(container.querySelectorAll(".sort-element"));

    function merge(x, y) {
      let array = [];
      let index1 = 0;
      let index2 = 0;
      const total = x.length + y.length;

      while (array.length < total) {
        if (index1 === x.length) {
          array = array.concat(y.slice(index2));
        } else if (index2 === y.length) {
          array = array.concat(x.slice(index1));
        } else if (
          +x[index1].style.height.replace("px", "") <
          +y[index2].style.height.replace("px", "")
        ) {
          array.push(x[index1]);
          index1++;
        } else {
          array.push(y[index2]);
          index2++;
        }
      }
      Dom.turnToMerged(array, [x, y]);
      return array;
    }

    function mergeSortArray(array) {
      if (array.length > 1) {
        const meio = Math.floor(array.length / 2);
        const part1 = mergeSortArray(array.slice(0, meio));
        const part2 = mergeSortArray(array.slice(meio, array.length));

        return merge(part1, part2);
      }

      return array;
    }
    mergeSortArray(lista);
  }
}
