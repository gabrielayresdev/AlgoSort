import sleep from "./sleep.js";

export default class Dom {
  // Troca dois elementos de lugar contanto que ambos estejam cercados por divs diferentes
  static swapItems(from, to) {
    const fromParent = from.parentElement;
    const toParent = to.parentElement;

    fromParent.appendChild(to);
    toParent.appendChild(from);
  }

  // Insere o elemento array[item] atrás do elemento pivot
  static throwLeft(item, pivot, array) {
    const parent = array[item].parentElement;

    pivot.parentNode.parentNode.insertBefore(parent, pivot.parentNode);
  }

  // Transfere o elemento na posição [item] do [array] para depois do [lastRightArrayItem]
  static throwRight(item, lastRightArrayItem, array) {
    const parent = array[item].parentElement;

    const container = lastRightArrayItem.parentNode.parentNode;
    // [lastRightArrayItem] [alvo] [nextElement]
    const nextElement = lastRightArrayItem.parentNode.nextSibling;
    container.insertBefore(parent, nextElement);
  }

  // Realiza a animação do mergeSort. Recebe como parâmetro o array ordenado e os dois array que sofrerão o merge desordenados
  static async turnToMerged(array, [array1, array2], time) {
    // Pega o array antes de ser ordenado
    const originalPosition = array1
      .concat(array2)
      .map((item) => item.parentNode);

    // Transfere os elementos ordenados na sua posição pós ordenação.
    for (let i = 0; i < originalPosition.length; i++) {
      await sleep(time);
      originalPosition[i].appendChild(array[i]);
    }
  }

  // Retorna um array com todos os elementos que serão inseridos nos containers
  static createElements(amount) {
    // Array que será preenchido com os elementos a serem ordenados
    const array = [];
    // Define o tamanho de cada barra considerando que o tamanho máximo é igual ao tamanho do container - padding + [margem de 30px]
    const { width } = window.getComputedStyle(
      document.querySelector(".sort-container")
    );
    const maxHeight = parseFloat(width) / 1.5;

    // Preenche o array com os elementos de altura aleatória.
    for (let i = 0; i < amount; i++) {
      const altura = Math.floor(Math.random() * (maxHeight - 5) + 5);
      /* 
        Cada barra deve ser um elemento do tipo
        <div>
          <div class="sort-element" style="height: ${altura}px">
          </div>
        </div>
      */
      const element = document.createElement("div");
      element.innerHTML = `<div class="sort-element" style="height: ${altura}px"></div>`;
      array.push(element);
    }
    return array;
  }

  static insertElements(elements) {
    // Seleciona todos os quadrados que receberão os elementos para ordenar
    const containers = document.querySelectorAll(".sort-container");

    // Adiciona um clone de cada elementos aos containers
    containers.forEach((container) => {
      elements.forEach((element) => {
        const clone = element.cloneNode(true);
        container.appendChild(clone);
      });
    });
  }

  static deleteElements(selector) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((item) => item.parentElement.remove());

    const buttons = document.querySelectorAll("[data-play]");

    buttons.forEach((btn) => {
      btn.parentElement.appendChild(btn.cloneNode(true));
      btn.remove();
    });
    console.log(buttons);
  }
}
