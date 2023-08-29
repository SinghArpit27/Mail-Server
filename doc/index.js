import { loginInput, resendOTP, userInput, verifyUser } from "./component.js";

export const userPaths = {
    "/register": {
        post: {
            tags: ["Users Auth"],
            summary: "Register User",
            description: "Register user",
            operationId: "RegisterUser",
            requestBody: {
                content: {
                    "application/json": {
                        schema: userInput,
                    },
                },
            },
            responses: {
                201: {
                    description: "User Registered successfully",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                400: {
                    description: "Bad Request",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                401: {
                    description: "Unauthorized",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
            },
        },
    },
    "/verifyUser": {
        post: {
            tags: ["Users Auth"],
            summary: "OTP Verification",
            description: "Verify OTP",
            operationId: "OTPVerify",
            requestBody: {
                content: {
                    "application/json": {
                        schema: verifyUser,
                    },
                },
            },
            responses: {
                200: {
                    description: "User Verified successfully",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                400: {
                    description: "Bad Request",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                401: {
                    description: "Unauthorized",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
            },
        },
    },
    "/resendOTP": {
        post: {
            tags: ["Users Auth"],
            summary: "Resend OTP",
            description: "Resend OTP",
            operationId: "resendOTP",
            requestBody: {
                content: {
                    "application/json": {
                        schema: resendOTP,
                    },
                },
            },
            responses: {
                200: {
                    description: "OTP send successfully",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                400: {
                    description: "Bad Request",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
                401: {
                    description: "Unauthorized",
                    status: {
                      type: "string",
                    },
                    message: {
                      type: "string",
                    },
                },
            },
        },
    },
    "/login": {
        post: {
          tags: ["Users Auth"],
          summary: "Login",
          description: "Login",
          operationId: "Login",
          requestBody: {
            content: {
              "application/json": {
                schema: loginInput,
              },
            },
          },
          responses: {
            200: {
              description: "Login successfully",
              status: {
                type: "string",
              },
              message: {
                type: "string",
              },
            },
            400: {
              description: "Bad Request",
              status: {
                type: "string",
              },
              message: {
                type: "string",
              },
            },
            401: {
                description: "Unauthorized",
                status: {
                  type: "string",
                },
                message: {
                  type: "string",
                },
              },
          },
        },
    },
    



}

