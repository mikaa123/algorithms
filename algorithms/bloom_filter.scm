; A trivial bloom-filter implementation in Chicken Scheme.
; Bloom filters are used to find out whether an element is *not*
; available.

(require-extension FNVHash)
(require-extension PJWHash)
(require-extension srfi-1)

;;;;;;;;;;;;;;;;
; Variables

; The size of the bit vector.
(define m 32)

; The number of elements in the bloom filter.
(define n 0);

; The bit-vector that's gonna be used as the filter.
(define bloom-array (make-vector 32 0))

; The following are hash functions. It's good to have evenly-distributed
; hash functions for better results.
(define hash1
	(lambda (str)
		(modulo (FNVHash str) 32)));

(define hash2
	(lambda (str)
		(modulo (PJWHash str) 32)));

;;;;;;;;;;;;;;;;
; Functions

; Number of ones in the bloom filter
(define X
	(lambda ()
		(reduce + 0 (vector->list bloom-array))))

; Hashes str and put it in the bloom array
(define insert-element
	(lambda (str)
		(vector-set! bloom-array (hash1 str) 1)
		(vector-set! bloom-array (hash2 str) 1)
		(set! n (add1 n))))

; Checks whether a string is contained in the bloom filter
(define is-available
	(lambda (str)
		(cond
			((= (vector-ref bloom-array (hash1 str)) 0) (print "Nope."))
			((= (vector-ref bloom-array (hash2 str)) 0) (print "Nope."))
			(else (print "Maybe.")))))

; Returns the probability of a false positive with the bloom filter.
; .parameter m The size of the bit vector.
; .parameter k The number of hash functions.
; .parameter n the number of element in the set.
(define false-positive-probability
		(lambda ()
			(expt (- 1 (exp (/ (* (- 2) n) m))) 2)))

(define optimal-hash-functions
	(lambda ()
			(* (/ m n) (log 2))))

(define number-of-item
	(lambda ()
		(- (/ (* 32 (log (- 1 (/ (X) n)))) 2))))

