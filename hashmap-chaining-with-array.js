/**
 * hash function - Get all CharCode and add them then take mod by bucket size
 * @param {*} key - input string
 * @param {*} size - bucket size
 */
function hash(key, size) {
  let hasCode = 0;
  for (let index in key) {
    hasCode += key.charCodeAt(index);
  }
  return hasCode % size;
}

// Created Class HashTable using class keyword, You can use function keyword as well.

class HashTable {
  constructor() {
    this.size = 5;
    this.values = new Array(this.size).fill(null);
    this.length = 0;
  }

  add(key, value) {
    const hashIndex = hash(key, this.size);
    // check data exists or not
    if (!this.values[hashIndex]) {
      this.values[hashIndex] = [[key, value]];
      this.length++; // increase length size
    } else {
      let isKeyUpdated = false;
      // get all keys on a hashIndex and loop over
      const arrKeys = this.values[hashIndex];
      for (let i = 0; i < arrKeys.length; i++) {
        // if key found, replace its value
        if (arrKeys[i][0] === key) {
          arrKeys[i][1] = value;
          isKeyUpdated = true;
        }
      }
      // if same Key does not exist, push new [Key value]
      if (!isKeyUpdated) {
        this.values[hashIndex].push([key, value]);
        this.length++; // increase length size
      }
    }
  }

  search(key) {
    const index = hash(key, this.size);
    const slot = this.values[index]; // find slot in bucket array
    // check if slot does not exist
    if (!slot) {
      return false;
    } else {
      for (let i = 0; i < slot.length; i++) {
        if (slot[i][0] === key) {
          // match key
          return this.values[index][i][1]; // return value
        }
      }
    }
  }

  remove(key) {
    const index = hash(key, this.size);
    const slot = this.values[index]; // find slot in bucket array
    if (!slot) {
      return "Key not found";
    } else {
      for (let i = 0; i < slot.length; i++) {
        if (slot[i][0] === key) {
          slot.splice(i, 1);
          this.length--;
          return true;
        }
      }
    }
  }
}

//create object of type hash table
const ht = new HashTable();
//add data to the hash table ht
ht.add("John", "111-111-111");
ht.add("Taylor", "222-222");
ht.add("Krish", "333-333");
ht.add("Mack", "444-444");
ht.add("Den", "555-555");
ht.add("Mike", "666-666");
ht.add("John", "111-111-222");

console.log(ht);

console.log('John Found -', ht.search('John'));
console.log('Den Found -', ht.search('Den'));
console.log('Taylor Deleted - ', ht.remove('Taylor'))
console.log('Mack Deleted - ', ht.remove('Mack'))

console.log(ht);