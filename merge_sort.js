// michael sokol - 2013

// merge sort is a sorting algorithm invented by John von Neumann in 1945.
// it allowed to sort large amount of data relatively fast for the time.
// the algorithm's complexity is O(n log n), which is better than insertion
// sort or bubble sort which are O(n^2).

// the following implementation isn't designed to be efficient. it uses a lot
// of variables and rely on javascript's implementation of `concat`
// and `splice`. it isn't designed to be included or used in any real
// application.

// it is however written to be readable and to convey the insight behind
// Neumann's algorithm.

// in order to run this script, run it with node-unit:
// $ nodeunit merge_sort.js

function merge(arr1, arr2) {

// the merge function takes two sorted arrays and merge them to produce
// a single sorted array.

  var T,      // references the array items will be merged into.
      F,      // references the array items will be taken from.
      j = 0;

// the T array is the one with the smallest first item.

  if (arr1[0] <= arr2[0]) {
    T = arr1;
    F = arr2;
  } else {
    T = arr2;
    F = arr1;
  }

// knowing the arrays are sorted, we can observe that if the last element
// of the T array is less than the first element of the F array, we only
// need to concatenate them.

  if (T[T.length-1] <= F[0]) {
    return T.concat(F);
  } else {
    for (var i = 0; i < T.length-1; i++) {

// we need to insert the elements from F in T. in order to know where to
// insert them, we go through each elements of T to see if an element of F
// fits.

      if (F[j] >= T[i] && F[j] <= T[i+1]) {
        T.splice(i+1, 0, F[j]);
        j++;
      }
    }

// if any element remains in F, they can be directly appended to T, since
// they are already sorted.

    if (j < F.length) {
      T = T.concat(F.splice(j));
    }

    return T;
  }
}

function mergeSort(input) {

// sorts the given input using a divide-and-conquer strategy.
// it returns a sorted array.

  var sliceA,
      sliceB;

  if (!input) return;
  if (!input.length) return;

// the input is going to be divided in two slices. each of these
// slice will be mergeSorted and merged.

  if (input.length > 1) {
    sliceA = input.splice(0, Math.floor(input.length) / 2);
    sliceB = input;

    return merge(mergeSort(sliceA), mergeSort(sliceB));
  } else {

// the input's length is one, so the array is sorted.

    return input;
  }
}

module.exports = {
  merge: {
    'merge([1], [2]) => [1, 2]': function (test) {
      test.deepEqual(merge([1], [2]), [1, 2]);
      test.deepEqual(merge([2], [1]), [1, 2]);
      test.done();
    },

    'merge([1, 4], [2, 3]) => [1, 2, 3, 4]': function (test) {
      test.deepEqual(merge([1, 4], [2, 3]), [1, 2, 3, 4]);
      test.deepEqual(merge([2, 3], [1, 4]), [1, 2, 3, 4]);
      test.done();
    },

    'merge([1, 3], [2, 4]) => [1, 2, 3, 4]': function (test) {
      test.deepEqual(merge([1, 3], [2, 4]), [1, 2, 3, 4]);
      test.deepEqual(merge([2, 4], [1, 3]), [1, 2, 3, 4]);
      test.done();
    }
  },

  mergeSort: {
    'mergeSort([]) => []': function (test) {
      test.deepEqual(mergeSort([], []));
      test.done();
    },

    'mergeSort([1]) => [1]': function (test) {
      test.deepEqual(mergeSort([1]), [1]);
      test.done();
    },

    'mergeSort([1, 2, 3]) => [1, 2, 3]': function (test) {
      test.deepEqual(mergeSort([1, 2, 3]), [1, 2, 3]);
      test.done();
    },

    'mergeSort([3, 2, 1]) => [1, 2, 3]': function (test) {
      test.deepEqual(mergeSort([3, 2, 1]), [1, 2, 3]);
      test.done();
    },

    'mergeSort([1, 5, 2, 1]) => [1, 1, 2, 5]': function (test) {
      test.deepEqual(mergeSort([1, 5, 2, 1]), [1, 1, 2, 5]);
      test.done();
    }
  }
};