// michael sokol - 2013

// heapsort was first published in 'Communication of the ACM' vol 7,
// in 1964. it makes heavy use of the binary heap data structure.

// a binary heap retrieve the smallest element with a complexity of O(log n).
// heapsort will use the binary heap's `remove` function n times, giving it
// an overall complexity of O(n log n).

// heapsort uses only a constant amount of space, making it efficient for
// embedded systems with small memory available. this contrasts with merge sort
// whose memory consuption grows linearly with the input's size.

// the following algorithm implements heapsort with expressivity of the code in
// mind, not performance.

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

  if (this.heap.length) {
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

function heapSort(A) {

// sorts the given input by making use of a binary min-heap.
// when the array is sorted, it is returned.

// the first step is to turn the given input into a binary min-heap.
// to do so, we use the MinHeap class defined above.

  var heap = new MinHeap(A),
      key,
      result = [];

  if (!A) return;
  if (!A.length) return A;

  while (key = heap.remove()) {

// now that we have a binary min-heap, we simply remove the smallest
// item and push it into the result array.

    result.push(key);
  }

  return result;
}

module.exports = {
  'heapSort([]) => []': function (test) {
    test.deepEqual(heapSort([]), []);
    test.done();
  },

  'heapSort([1]) => [1]': function (test) {
    test.deepEqual(heapSort([1]), [1]);
    test.done();
  },

  'heapSort([1, 2, 3]) => [1, 2, 3]': function (test) {
    test.deepEqual(heapSort([1, 2, 3]), [1, 2, 3]);
    test.done();
  },

  'heapSort([3, 2, 1]) => [1, 2, 3]': function (test) {
    test.deepEqual(heapSort([3, 2, 1]), [1, 2, 3]);
    test.done();
  },

  'heapSort([1, 5, 2, 1]) => [1, 1, 2, 5]': function (test) {
    test.deepEqual(heapSort([1, 5, 2, 1]), [1, 1, 2, 5]);
    test.done();
  },

  'heapSort([9, 10, 25, 7, 2, 3, 4, 1, 8]) => [1, 2, 3, 4, 7, 8, 9, 10, 25]': function (test) {
    test.deepEqual(heapSort([9, 10, 25, 7, 2, 3, 4, 1, 8]), [1, 2, 3, 4, 7, 8, 9, 10, 25]);
    test.done();
  }
};