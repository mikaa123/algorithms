// michael sokol - 2013

// a binary heap is an interesting data structure, in that it keeps the 
// smallest (or biggest) element at the begining, allowing fast retrieval
// for prioritized items.

// the following script implements a minHeap class that uses the following
// functions:
// * minHeapify - O(log n)
// * upHeap - O(log n)
// * buildMaxHeap - O(n)

function minHeapify(A, i) {

// the minHeapify function re-arranges the nodes of a heap for `i`
// being a misplaced node. the node is misplaced if the tree doesn't
// satisfy the heap property.

// in the worst case, it goes through all the depth of the tree,
// giving it a O(log n) worst case.

  var left  = (2*i) + 1,  // the index of the child on the left.
      right = (2*i) + 2,  // the index of the child on the right.
      smaller = i;        // the index of the smaller child.

  if (left < A.length && A[left] < A[smaller]) {
    smaller = left;
  }

  if (right < A.length && A[right] < A[smaller]) {
    smaller = right;
  }

  if (smaller !== i) {
    swap(A, i, smaller);
    minHeapify(A, smaller);
  }

  return A;
}

function swap(A, a, b) {

// let's define a convinient function that swaps indices `a` and `b`
// in place in `A`.

    var tmp = A[a];
    A[a] = A[b];
    A[b] = tmp;
}

function buildMinHeap(A) {

// builds a min-heap from an array.
// minHeapify each parent nodes from the bottom up.
// the last parent in the array A can be found with
// Math.floor(A.length/2).

  if (!A) return;
  if (!A.length) return A;

  for (var i = Math.floor(A.length) - 1; i >= 0; i--) {
    minHeapify(A, i);
  }

  return A;
}

function upHeap(A, i) {

// percolates up the node at indice i.

  var parent = Math.floor((i-1)/2);

  if (i > 0 && A[i] < A[parent]) {
    swap(A, i, parent);
    upHeap(A, parent);
  }
}

var MinHeap = function (A) {

// MinHeap is the heap abstraction. it uses the functions
// defined above to implement the heaps operations.

  this.heap = buildMinHeap(A);
};

MinHeap.prototype.toArray = function () {

// returns the array representation of the heap.

  return this.heap;
};

MinHeap.prototype.remove = function () {

// removes the first element of the heap.

  var result = this.heap.shift();

  if (this.heap.length > 2) {
    this.heap.unshift(this.heap.pop());
    minHeapify(this.heap, 0);
  }

  return result;
};

MinHeap.prototype.insert = function (key) {

// inserts the given key in the heap.

  this.heap.push(key);
  upHeap(this.heap, this.heap.length - 1);
  return this;
};

module.exports = {
  minHeapify: {
    '[3, 2, 1] => [1, 2, 3]': function (test) {
      test.deepEqual(minHeapify([3, 2, 1], 0), [1, 2, 3]);
      test.done();
    },

    '[1, 2, 3] => [1, 2, 3]': function (test) {
      test.deepEqual(minHeapify([1, 2, 3], 0), [1, 2, 3]);
      test.done();
    },

    '[1, 3, 2] => [1, 3, 2]': function (test) {
      test.deepEqual(minHeapify([1, 3, 2], 0), [1, 3, 2]);
      test.done();
    },

    'minHeap([1, 2, 8, 4, 5, 6, 7], 2) => [1, 2, 6, 4, 5, 8, 7]': function (test) {
      test.deepEqual(minHeapify([1, 2, 8, 4, 5, 6, 7], 2),
        [1, 2, 6, 4, 5, 8, 7]);
      test.done();
    },

    'minHeap([1, 2, 8, 4, 5, 6, 7], 0) => [1, 2, 8, 4, 5, 6, 7]': function (test) {
      test.deepEqual(minHeapify([1, 2, 8, 4, 5, 6, 7], 0),
        [1, 2, 8, 4, 5, 6, 7]);
      test.done();
    },

    '[7, 1, 2, 3, 4, 5, 6] => [1, 3, 2, 7, 4, 5, 6]': function (test) {
      test.deepEqual(minHeapify([7, 1, 2, 3, 4, 5, 6], 0),
        [1, 3, 2, 7, 4, 5, 6]);
      test.done();
    }
  },

  buildMinHeap: {
    '[] => []': function (test) {
      test.deepEqual(buildMinHeap([]), []);
      test.done();
    },

    '[1] => [1]': function (test) {
      test.deepEqual(buildMinHeap([1]), [1]);
      test.done();
    },

    '[1, 2] or [2, 1] => [1, 2]': function (test) {
      test.deepEqual(buildMinHeap([1, 2]), [1, 2]);
      test.deepEqual(buildMinHeap([2, 1]), [1, 2]);
      test.done();
    },

    '[1, 2, 3] => [1, 2, 3]': function (test) {
      test.deepEqual(buildMinHeap([1, 2, 3]), [1, 2, 3]);
      test.done();
    },

    '[3, 2, 1] => [1, 2, 3]': function (test) {
      test.deepEqual(buildMinHeap([3, 2, 1]), [1, 2, 3]);
      test.done();
    },

    '[1, 2, 3, 4] => [1, 2, 3, 4]': function (test) {
      test.deepEqual(buildMinHeap([1, 2, 3, 4]), [1, 2, 3, 4]);
      test.done();
    },

    '[5, 7, 1, 8, 10, 7, 4] => [1, 7, 4, 8, 10, 7, 5]': function (test) {
      test.deepEqual(buildMinHeap([5, 7, 1, 8, 10, 7, 4]),
        [1, 7, 4, 8, 10, 7, 5]);
      test.done();
    }
  },

  'MinHeap class': {
    setUp: function (callback) {
      this.myHeap = new MinHeap([5, 7, 1, 8, 10, 7, 4]);
      callback();
    },

    'heap is built correctly': function (test) {
      test.deepEqual(this.myHeap.toArray(), [1, 7, 4, 8, 10, 7, 5]);
      test.done();
    },

    'remove preserves the heap property': function (test) {
      test.deepEqual(this.myHeap.remove(), 1);
      test.deepEqual(this.myHeap.toArray(), [4, 7, 5, 8, 10, 7]);
      test.done();
    },

    'remove with length < 3': function (test) {
      var littleHeap = new MinHeap([1, 2, 3]);
      test.deepEqual(littleHeap.remove(), 1);
      test.deepEqual(littleHeap.toArray(), [2, 3]);
      test.deepEqual(littleHeap.remove(), 2);
      test.deepEqual(littleHeap.toArray(), [3]);
      test.deepEqual(littleHeap.remove(), 3);
      test.deepEqual(littleHeap.toArray(), []);
      test.done();
    },

    'insert 3': function (test) {
      test.deepEqual(this.myHeap.insert(3).toArray(),
        [1, 3, 4, 7, 10, 7, 5, 8]);
      test.done();
    }
  }
};