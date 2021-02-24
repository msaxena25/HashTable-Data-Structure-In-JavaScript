/**
 * hash function - Get all CharCode and add them then take mod by bucket size
 */
function hash(key, size) {
  let hasCode = 0;
  for (let index in key) {
    hasCode += key.charCodeAt(index);
  }
  return hasCode % size;
}

class HashTable {
  constructor() {
    // In real scenario, bucket size always a big prime number
    this.size = 3;
    this.length = 0; // number of elements
    // Create an array of above size and initally fill all slot by null value
    this.values = new Array(this.size).fill(null);
  }

  add(key, value) {
    const hashIndex = hash(key, this.size);
    console.log(hashIndex);
    this.values[hashIndex] = [[key, value]];
    this.length++; // increase length size
  }
}

//create object of type hash table
const ht = new HashTable();

ht.add("Taylor", "222-222"); // hasCode is 2
ht.add("Krish", "333-333"); // hasCode is 0
ht.add("Mike", "666-666"); // hasCode is 0

// Mike overrides Krish element because of same Index

console.log(ht);
