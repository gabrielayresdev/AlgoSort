import Dom from "./Dom.js";

export default class Sort {
  constructor(amount) {
    this.elements = this.createElements(amount);
  }

  alocaArray(seletor) {
    const container = document.querySelector(seletor);
    this.elements.forEach((element) => {
      const clone = element.cloneNode(true);
      container.appendChild(clone);
    });

    const button = document.querySelector("[data-play]");
    button.addEventListener("click", () => {
      this.bubbleSort(container);
    });
  }

  createElements(amount) {
    const array = [];
    for (let i = 0; i < amount; i++) {
      const altura = Math.floor(Math.random() * (600 - 15) + 15);
      const element = document.createElement("div");
      element.innerHTML = `<div class="element-bar" style="height: ${altura}px"></div>`;
      array.push(element);
    }
    return array;
  }

  async insertionSort(container) {
    const lista = Array.from(container.querySelectorAll(".element-bar"));

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

    console.log(lista.map((item) => item.style.height));
    return lista;
  }

  async bubbleSort(container) {
    const lista = Array.from(container.querySelectorAll(".element-bar"));

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
}
