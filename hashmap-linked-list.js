function hash(key, size) {
  let hasCode = 0;
  for (let index in key) {
    hasCode += key.charCodeAt(index);
  }
  return hasCode % size;
}

// Create a Node class
class Node {
  constructor(key, value) {
    this[key] = value;
    this.next = null; // initially it is null
  }
}

// Create List Clas with head, next and Count properties
class List {
  constructor(node) {
    this.head = node;
    this.next = null;
    this.count = 0;
  }
}

class HashTable {
  constructor() {
    this.size = 5;
    // Initially fill bucket with null value
    this.values = new Array(this.size).fill(null);
    this.length = 0;
  }

  add(key, value) {
    const hashIndex = hash(key, this.size);
    const node = new Node(key, value);
    if (!this.values[hashIndex]) {
      this.values[hashIndex] = new List(node);
    } else {
      let current = this.values[hashIndex].head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.values[hashIndex].count++;
    this.length++;
  }

  search(key) {
    const index = hash(key, this.size);
    const slot = this.values[index];
    let current = slot.head;
    if (current.hasOwnProperty(key)) {
      return current[key];
    }
    while (current.next) {
      if (current.next.hasOwnProperty(key)) {
        return current.next[key];
      } else {
        current = current.next;
      }
    }
    return "Data not found";
  }

  remove(key) {
    const index = hash(key, this.size);
    const slot = this.values[index];
    let current = slot.head;
    if (current.hasOwnProperty(key)) {
      slot.head = current.next;
      slot.count--;
      this.length--;
      return true;
    }
    while (current.next) {
      if (current.next.hasOwnProperty(key)) {
        current.next = current.next.next;
        slot.count--;
        this.length--;
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
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
ht.add("John", "77-77");
ht.add("Jack", "88-88-88");
ht.add("Jimmy", "99-99");
ht.add("Harry", "121-121");
ht.add("Meet", "232-232");
ht.add("Miraj", "454-454");
ht.add("Milan", "567-567");

console.log("Den Found -", ht.search("Den"));
console.log("Miraj Found -", ht.search("Miraj"));
console.log("Drupel Found -", ht.search("Drupel"));

console.log("Krish Deleted - ", ht.remove("Krish"));
console.log("Mack Deleted - ", ht.remove("Mack"));
console.log("Meet Deleted - ", ht.remove("Meet"));
console.log("Taylor Deleted - ", ht.remove("Taylor"));
console.log("JsMount Deleted - ", ht.remove("JsMount"));

console.log(ht);
