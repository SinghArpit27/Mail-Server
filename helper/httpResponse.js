const httpResponse = (res, statusCode, success, message, data = null) => {
    // res.status(statusCode).json({
    //     success,
    //     message,
    //     data
    // });


    const responseObj = {
        success,
        message,
    };

    if (data !== null) {
    responseObj.data = data;
    }
    
    res.status(statusCode).json(responseObj);
}

export default httpResponse;