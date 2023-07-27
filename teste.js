const x = [0, 2, 6, 7, 19, 21];
const y = [1, 5, 8, 11, 15];
const z = [5, 3, 1, 6, 3, 7, 12, 6, 10, 11, 32];

function merge(x, y) {
  let array = [];
  let i1 = 0;
  let i2 = 0;
  let repet = 0;
  const total = x.length + y.length;

  while (array.length < total && repet < 20) {
    if (i1 === x.length) {
      array = array.concat(y.slice(i2));
    } else if (i2 === y.length) {
      array = array.concat(x.slice(i1));
    } else if (x[i1] < y[i2]) {
      array.push(x[i1]);
      i1++;
    } else {
      array.push(y[i2]);
      i2++;
    }
    repet++;
  }
  return array;
}

function mergeSort(array) {
  if (array.length > 1) {
    const meio = Math.floor(array.length / 2);
    const part1 = mergeSort(array.slice(0, meio));
    const part2 = mergeSort(array.slice(meio, array.length));

    return merge(part1, part2);
  }

  return array;
}

/* console.log(merge(x, y)); */
console.log(mergeSort(z));
