// michael sokol - 2013

// insertion sort sorts inputs just like a human would intuitively
// sort a pack of cards in their hands.

// the way it works is like this: first you scan your first card,
// then the second one. if that second card is smaller than the first
// one, you swap them, then you keep going for each cards, inserting them
// at the correct position in your hand.

// this algorithm sorts the array in place and is stable. it performs better
// than other quadratic complexity algorithm such as bubble sort, especially
// for small input size. the complexity is O(n^2).

function insertionSort(input) {
  var key, // the current element
      i;

// loop on each element of the input

  for (var j = 1; j < input.length; j++) {
    key = input[j];
    i = j - 1;

// insert key in the sorted sub-array input[0..j-1]
// by shifting the subarray to the right

    while(i > -1 && input[i] > key) {

// swap position

      input[i + 1] = input[i];
      i = i - 1;
    }

    input[i + 1] = key;
  }

  return input;
}

module.exports = {
  insertionSort: {
    'insertionSort([]) => []': function (test) {
      test.deepEqual(insertionSort([]), []);
      test.done();
    },

    'insertionSort([1]) => [1]': function (test) {
      test.deepEqual(insertionSort([1]), [1]);
      test.done();
    },

    'insertionSort([1, 2, 3]) => [1, 2, 3]': function (test) {
      test.deepEqual(insertionSort([1, 2, 3]), [1, 2, 3]);
      test.done();
    },

    'insertionSort([3, 2, 1]) => [1, 2, 3]': function (test) {
      test.deepEqual(insertionSort([3, 2, 1]), [1, 2, 3]);
      test.done();
    },

    'insertionSort([1, 5, 2, 1]) => [1, 1, 2, 5]': function (test) {
      test.deepEqual(insertionSort([1, 5, 2, 1]), [1, 1, 2, 5]);
      test.done();
    }
  }
};