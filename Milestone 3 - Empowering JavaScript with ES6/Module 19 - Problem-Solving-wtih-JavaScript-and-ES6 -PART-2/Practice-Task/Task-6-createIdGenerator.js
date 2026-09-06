function createIdGenerator() {
  let id = 0;

  return function () {
    id++;
    return id;
  };
}

const nextId = createIdGenerator();

console.log(nextId()); // 1
console.log(nextId()); // 2
console.log(nextId()); // 3