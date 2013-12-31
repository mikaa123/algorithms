; A trivial bloom-filter implementation in Chicken Scheme.
; Bloom filters are used to find out whether an element is *not*
; available.

(require-extension FNVHash)
(require-extension PJWHash)
(require-extension readline)

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

; Hashes str and put it in the bloom array
(define bloom-filter
	(lambda (str)
		(vector-set! bloom-array (hash1 str) 1)
		(vector-set! bloom-array (hash2 str) 1)))

; Checks whether a string is contained in the bloom filter
(define is-available
	(lambda (str)
		(cond
			((= (vector-ref bloom-array (hash1 str)) 1) (print "maybe!"))
			((= (vector-ref bloom-array (hash2 str)) 1) (print "maybe!"))
			(else (print "nope.")))))

