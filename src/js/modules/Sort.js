import Dom from "./Dom.js";
import sleep from "./sleep.js";

export default class Sort {
  constructor(amount) {
    this.elements = Dom.createElements(amount);
    this.animationTime = 50;
  }

  init() {
    // Seleciona todos os quadrados que receberão os elementos para ordenar
    const containers = document.querySelectorAll(".sort-container");

    // Adiciona um clone de cada elementos aos containers
    containers.forEach((container) => {
      this.elements.forEach((element) => {
        const clone = element.cloneNode(true);
        container.appendChild(clone);
      });
    });

    // Adiciona a funcionalidade de iniciar todos os algoritmos ao ícone de play
    const button = document.querySelector("[data-play=all]");
    button.addEventListener("click", () => {
      const area = document.querySelector(".sort-area");

      // Inicia as funções de sort com os containers de cada um como contexto e tempo de animação como parâmetro
      this.selectionSort.call(
        area.querySelector("[data-sort=selectionSort]"),
        this.animationTime
      );
      this.bubbleSort.call(
        area.querySelector("[data-sort=bubbleSort]"),
        this.animationTime
      );
      this.insertionSort.call(
        area.querySelector("[data-sort=insertionSort]"),
        this.animationTime
      );
      this.quickSort.call(
        area.querySelector("[data-sort=quickSort]"),
        this.animationTime
      );
      this.mergeSort.call(
        area.querySelector("[data-sort=mergeSort]"),
        this.animationTime
      );
    });
  }

  // Realiza o insertionSort dos elementos
  async insertionSort(time) {
    const lista = Array.from(this.querySelectorAll(".sort-element"));

    for (let i = 1; i < lista.length; i++) {
      let j = i - 1;

      // Troca os elementos enquanto o array é percorrido do fim para o começo e o elemento no índice [x] é menor que o elemento no índice [x - 1]
      while (
        j > -1 &&
        parseFloat(lista[j + 1].style.height) <
          parseFloat(lista[j].style.height)
      ) {
        // Troca os itens na UI
        await sleep(time);
        Dom.swapItems(lista[j], lista[j + 1]);

        // Troca os itens no array
        const aux = lista[j];
        lista[j] = lista[j + 1];
        lista[j + 1] = aux;

        j--;
      }
    }

    return lista;
  }

  // Realiza o bubbleSort dos elementos
  async bubbleSort(time) {
    const lista = Array.from(this.querySelectorAll(".sort-element"));

    for (let i = lista.length; i > 0; i--) {
      for (let j = 0; j < lista.length - 1; j++) {
        if (
          parseFloat(lista[j].style.height) >
          parseFloat(lista[j + 1].style.height)
        ) {
          await sleep(time);
          Dom.swapItems(lista[j + 1], lista[j]);

          const aux = lista[j];
          lista[j] = lista[j + 1];
          lista[j + 1] = aux;
        }
      }
    }

    return lista;
  }

  async selectionSort(time) {
    const lista = Array.from(this.querySelectorAll(".sort-element"));

    for (let i = 0; i < lista.length; i++) {
      for (let j = i + 1; j < lista.length; j++) {
        if (
          parseFloat(lista[i].style.height) > parseFloat(lista[j].style.height)
        ) {
          // Pausa o algoritmo em x tempo
          await sleep(time);
          Dom.swapItems(lista[i], lista[j]);

          const aux = lista[i];
          lista[i] = lista[j];
          lista[j] = aux;
        }
      }
    }
  }

  // Realiza o quickSort dos elementos
  async quickSort(time) {
    const lista = Array.from(this.querySelectorAll(".sort-element"));
    const quickSortArray = async (arr) => {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[0];
      const leftArr = [];
      const rightArr = [];

      for (let i = 1; i < arr.length; i++) {
        if (parseFloat(arr[i].style.height) < parseFloat(pivot.style.height)) {
          await sleep(time);
          Dom.throwLeft(i, pivot, arr, leftArr);
          leftArr.push(arr[i]);
        } else {
          await sleep(time);
          Dom.throwRight(
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

  // Realiza o mergeSort dos elementos
  async mergeSort(time) {
    const lista = Array.from(this.querySelectorAll(".sort-element"));

    async function merge(x, y) {
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
          parseFloat(x[index1].style.height) <
          parseFloat(y[index2].style.height)
        ) {
          array.push(x[index1]);
          index1++;
        } else {
          array.push(y[index2]);
          index2++;
        }
      }

      await Dom.turnToMerged(array, [x, y], time);
      return array;
    }

    async function mergeSortArray(array) {
      if (array.length > 1) {
        const meio = Math.floor(array.length / 2);
        const part1 = await mergeSortArray(array.slice(0, meio));
        const part2 = await mergeSortArray(array.slice(meio, array.length));

        const retorno = await merge(part1, part2);
        return retorno;
      }

      return array;
    }
    await mergeSortArray(lista);
  }
}
