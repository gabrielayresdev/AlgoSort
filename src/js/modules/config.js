import Dom from "./Dom.js";
import Sort from "./Sort.js";
import { getConfig, setAmount, setSpeed } from "./globalVariables.js";

export default function initConfig() {
  const amount = document.querySelectorAll(".menu-amount [data-config]");
  const speed = document.querySelectorAll(".menu-speed [data-config]");

  function handleAmount() {
    const total = Number(this.innerHTML);
    setAmount(total);

    Dom.deleteElements(".sort-element");
    const sort = new Sort(getConfig());
    sort.init();
  }

  function handleSpeed() {
    let time;
    if (this.innerHTML.includes("ms")) {
      time = parseFloat(this.innerHTML);
    } else {
      time = parseFloat(this.innerHTML) * 1000;
    }

    setSpeed(time);

    Dom.deleteElements(".sort-element");
    const sort = new Sort(getConfig());
    sort.init();
  }

  amount.forEach((item) => item.addEventListener("click", handleAmount));
  speed.forEach((item) => item.addEventListener("click", handleSpeed));
}
