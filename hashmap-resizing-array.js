function hash(key, size) {
  let hasCode = 0;
  for (let index in key) {
    hasCode += key.charCodeAt(index);
  }
  return hasCode % size;
}

class HashTable {
  constructor() {
    this.size = 5;
    this.length = 0; // number of elements
    this.bucket = new Array(this.size).fill(null);
  }

  /**
   * Resizing bucket if Load Factor becomes greater then 60%
   * Means increase bucket size by double when 60% space is filled.
   * Loop on all bucket item and push into new bucket
   * And last assign this new bucket into origional bucket.
   */
  resize() {
    this.length = 0; // set length 0
    this.size = this.size * 2; // double size
    const newBucket = new Array(this.size).fill(null);

    this.bucket.forEach((element) => {
      if (element) {
        element.forEach((item) => {
          const [key, value] = item;
          const hashIndex = hash(key, this.size);
          if (!newBucket[hashIndex]) {
            newBucket[hashIndex] = [[key, value]];
          } else {
            newBucket[hashIndex].push([key, value]);
          }
          this.length++;
        });
      }
    });
    this.bucket = newBucket;
  }

  // Calculate laod factor  - Total elements / bucket size
  loadFactor() {
    return this.length / this.size;
  }

  add(key, value) {
    if (this.loadFactor() > 0.6) {
      this.resize();
    }
    const hashIndex = hash(key, this.size);
    if (!this.bucket[hashIndex]) {
      this.bucket[hashIndex] = [[key, value]];
    } else {
      this.bucket[hashIndex].push([key, value]);
    }

    this.length++; // increase length size
  }
}

//create object of type hash table
const ht = new HashTable();

ht.add("Mike", "666-666");
ht.add("John", "77-77");
ht.add("Jack", "88-88-88");
ht.add("Jimmy", "99-99");
ht.add("Harry", "121-121");
ht.add("Meet", "232-232");
ht.add("Miraj", "454-454");
ht.add("Milan", "567-567");
ht.add("Bobby", "111-111-111");
ht.add("Taylor", "222-222");
ht.add("Krish", "333-333");
ht.add("Mack", "444-444");
ht.add("Den", "555-555");

// Mike overrides Krish element because of same Index

console.log(ht);
