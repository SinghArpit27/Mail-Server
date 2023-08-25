const mailValidation = [
    /*------------validation for Subject--------------*/
    /** subject can not be empty */
    body("subject")
    .not()
    .isEmpty()
    .trim()
    .withMessage("subject cannot be empty")
    .bail(),

   
    /*------------validation for Message--------------*/
    /* message cannot be empty */
    body("message")
    .not()
    .isEmpty()
    .trim()
    .withMessage("message cannot be empty")
    .bail(),

  


    /*------------validation for receiver--------------*/
    body("receiver")
    .not()
    .isEmpty()
    .trim()
    .withMessage("receiver cannot be empty")

]