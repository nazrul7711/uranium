//user routes
router.post('/register',userController.register)
router.post('/login',userController.login)

//book routes
router.post('/books',middleware.auth,bookController.createBook)
router.get('/books',middleware.auth,bookController.getBook)
router.get('/books/:bookId',middleware.auth,bookController.getBookById)
router.put('/books/:bookId',middleware.auth,bookController.updateBookById)
router.delete('/books/:bookId',middleware.auth,bookController.deleteBookById)


//Review routes
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updateReview)
router.delete("/books/:bookId/review",reviewController.deleteReview)


module.exports = router;