import Sort from "./Sort.js";

let speed = 10;
let amount = 20;
let actualSort = new Sort(amount, speed);
export function getConfig() {
  console.log({ amount, speed });
  return { amount, speed };
}
export function setSpeed(vel) {
  speed = vel;
}
export function setAmount(qnt) {
  amount = qnt;
}

export function getSort() {
  return actualSort;
}

export function setSort(sort) {
  actualSort = sort;
}
