import { changePassword, composeMail, loginInput, resendOTP, updateProfile, userInput, verifyUser } from "./component.js";

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
  "/changePassword": {
    post: {
      tags: ["Users Auth"],
      summary: "Change Password",
      description: "Change Password",
      operationId: "ChangePassword",
      requestBody: {
        content: {
          "application/json": {
            schema: changePassword,
          },
        },
      },
      responses: {
        200: {
          description: "Password changed successfully",
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
  "/updateProfile": {
    post: {
      tags: ["Users Auth"],
      summary: "Update Profile",
      description: "Update Profile",
      operationId: "UpdateProfile",
      requestBody: {
        content: {
          "application/json": {
            schema: updateProfile,
          },
        },
      },
      responses: {
        200: {
          description: "Profile updated successfully",
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
    }
  },
  "/mail/composeMail": {
    post: {
      tags: ["User Mail"],
      summary: "Compose Mail",
      description: "Compose Mail",
      operationId: "ComposeMail",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: composeMail,
          },
        },
      },
      responses: {
        200: {
          description: "Mail composed successfully",
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
  "/mail/forwardMail/{id}": {
    post: {
      tags: ["User Mail"],
      summary: "Forward Mail",
      description: "Forward Mail",
      operationId: "ForwardMail",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Mail id to forward a Mail",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Mail forward successfully",
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
  "/mail/replyMail/{id}": {
    post: {
      tags: ["User Mail"],
      summary: "Reply Mail",
      description: "Reply Mail",
      operationId: "ReplyMail",
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: composeMail,
          },
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Mail id to reply a mail",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Reply successfully done",
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
  "/mail/bookmarkMail/{id}": {
    post: {
      tags: ["User Mail"],
      summary: "Bookmark Mail",
      description: "Bookmark Mail",
      operationId: "BookmarkMail",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Mail id to bookmark a mail",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Mail bookmarked",
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
  "/mail/deleteMail/{id}": {
    post: {
      tags: ["User Mail"],
      summary: "Delete Mail",
      description: "Delete Authorized User's Mail",
      operationId: "DeleteAuthMail",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Mail id to delete a Mail",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Mail deleted successfully",
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
  "/mail/getSingleMail/{id}": {
    get: {
      tags: ["User Mail"],
      summary: "Get single Mail",
      description: "Get single Mail",
      operationId: "GetsingleMail",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Mail id to Get single Mail",
          required: "true",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: {
          description: "Get single mail successfully",
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
  "/mail/getInboxMails": {
    get: {
      tags: ["User Mail"],
      summary: "Inbox Mails",
      description: "Inbox mails of user",
      operationId: "UserInboxMail",
      responses: {
        200: {
          description: "successfully done",
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
  "/mail/getSentMails": {
    get: {
      tags: ["User Mail"],
      summary: "Sent Mails",
      description: "Sent mails of user",
      operationId: "SentMails",
      responses: {
        200: {
          description: "successfully done",
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
  "/mail/getforwardedMailByUser": {
    get: {
      tags: ["User Mail"],
      summary: "Forward Mails By User",
      description: "Mails forwarded by users to others",
      operationId: "MailsForwardedByUsers",
      responses: {
        200: {
          description: "Ok",
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
  "/mail/getForwardedMailByOthers": {
    get: {
      tags: ["User Mail"],
      summary: "Forward Mails By Others",
      description: "Mails forwarded by others to user",
      operationId: "MailsForwardedByOthers",
      responses: {
        200: {
          description: "Ok",
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

