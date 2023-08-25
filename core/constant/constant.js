export const responseMessages = {
    
    EMAIL_ALREADY_EXIST: "Email already exists",
    PHONE_ALREADY_EXIST: "Phone already exists",
    REGISTRATION_SUCCESS: "Registration Successfully done, OTP has been sent to your registered email address. Please verify the OTP",
    REGISTRATION_FAILED: "Registration Failed Please try again",
    OTP_EXPIRED : "Your OTP has expired. Please generate a new OTP",
    ALREADY_VERIFIED: "oopss seems like you are already verified.",
    OTP_VERIFIED_SUCCESSFULLY: "OTP verified successfully.",
    INVALID_OTP: "You are entered incorrect OTP.",
    EMAIL_NOT_FOUND: "This Email does not exist in our community.Please check it out",
    OTP_SEND: "OTP has been sent to your registered Phone Number. Please verify the OTP.",
    INCORRECT_CREDENTIALS: "Incorrect Credentials",
    NOT_VERIFIED: "You are not Verified, Please verify your details",
    UNAUTHORIZED: "Unauthorized User",
    LOGIN_SUCCESS: "Login Successfully",
    TOKEN_ERROR: "Invalid Token",
    PASSWORD_CHANGE: "Password changed successfully",
    PROFILE_UPDATE: "Profile update successfully",
    MAIL_SEND: "Mail Send Successfully",
    MESSAGE_EXCEED: "Message limit exceeds for the plan",
    RECIPIENT_EXCEED: "Recipient count exceeds for the plan limit",
    ATTACHMENT_EXCEED: "Attachment count exceeds for the plan limit",
    CC_EXCEED: "Recipient limit exceeded for CC",
    BCC_EXCEED: "Recipient limit exceeded for BCC",

    SUCCESS: 'Success',
    CREATED: 'Resource created successfully',
    BAD_REQUEST: 'Bad request',
    NOT_FOUND: 'Resource not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
};

export const responseStatus = {
    SUCCESS: 1,
    FAILURE: 0,
};
export const statusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
};