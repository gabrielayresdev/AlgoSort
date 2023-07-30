import Sort from "./modules/Sort.js";
import initConfig from "./modules/config.js";
import { getConfig, setSort } from "./modules/globalVariables.js";

// Os containers terão [totalElementos] elementos.
const sort = new Sort(getConfig());
setSort(sort);
sort.init();

initConfig();
