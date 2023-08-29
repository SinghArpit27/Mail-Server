import {
    userInput,
    loginInput,
    changePassword,
    update,
    compose,
  } from "./component.js";
  
  export const userPaths = {
    "/auth/signup": {
      post: {
        tags: ["Users Auth"],
        summary: "Register User",
        description: "Register user",
        operationId: "registerser",
        requestBody: {
          content: {
            "application/json": {
              schema: userInput,
            },
          },
        },
        responses: {
          200: {
            description: "User registered successfully",
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
              description: "UNauthorized",
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
    "/auth/login": {
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
              description: "UNauthorized",
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
    "/auth/changePassword": {
      post: {
        tags: ["Users Auth"],
        summary: "changePassword",
        description: "Change Password",
        operationId: "Change Password",
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
              description: "UNauthorized",
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
    "/auth/update": {
      post: {
        tags: ["Users Auth"],
        summary: "update",
        description: "Update",
        operationId: "Update",
        requestBody: {
          content: {
            "application/json": {
              schema: update,
            },
          },
        },
        responses: {
          200: {
            description: "User info Updated",
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
              description: "UNauthorized",
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
    "/mail/compose": {
      post: {
        tags: ["UserMail"],
        summary: "Compose Mail",
        description: "Compose Mai",
        operationId: "Compose",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: compose,
            },
          },
        },
        responses: {
          200: {
            description: "Mail composed",
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
              description: "UNauthorized",
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
    "/mail/reply/{id}": {
      post: {
        tags: ["UserMail"],
        summary: "Reply Mail",
        description: "reply a Mail",
        operationId: "reply a Mail",
        requestBody: {
          content: {
            "multipart/form-data": {
              schema: compose,
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "mail id to reply a mail",
            required: "true",
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          200: {
            description: "Mail replyed",
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
              description: "UNauthorized",
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
    "/mail/bookmark/{id}": {
      post: {
        tags: ["UserMail"],
        summary: "Bookmark a Mail",
        description: "Bookmark a Mail",
        operationId: "Bookmark a Mail",
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
            description: "UNauthorized",
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
    "/mail/singlemail/{id}": {
      get: {
        tags: ["UserMail"],
        summary: "Get single Mail",
        description: "Get single Mail",
        operationId: "Get single  Mail",
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
            description: "single Mail",
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
            description: "UNauthorized",
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
    "/mail/delete/{id}": {
      post: {
        tags: ["UserMail"],
        summary: "Delete  Mail",
        description: "Delete authorized Mail",
        operationId: "Delete authorized Mail",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "Mail id to delete a  Mail",
            required: "true",
            schema: {
              type: "string",
            },
          },
        ],
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
            description: "UNauthorized",
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
    "/mail/forward/{id}": {
      post: {
        tags: ["UserMail"],
        summary: "Forward  Mail",
        description: "Forward Mail",
        operationId: "Forward Mail",
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
            description: "UNauthorized",
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
    "/mail/getforward": {
      get: {
        tags: ["UserMail"],
        summary: "Forward  Mail",
        description: "mails forwarded by users to others",
        operationId: "mails forwarded by users to others",
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
            description: "UNauthorized",
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
    "/mail/forwardedtouser": {
      get: {
        tags: ["UserMail"],
        summary: "Forward  Mail",
        description: "mails forwarded by others to user",
        operationId: "mails forwarded by others to user",
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
            description: "UNauthorized",
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
    "/mail/inbox": {
      get: {
        tags: ["UserMail"],
        summary: "Inbox  Mails",
        description: "Inbox mails of user",
        operationId: "Inbox mails of user",
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
            description: "UNauthorized",
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
    "/mail/sent": {
      get: {
        tags: ["UserMail"],
        summary: "Sent  Mails",
        description: "Sent mails of user",
        operationId: "Sent mails of user",
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
            description: "UNauthorized",
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
    "/mail/search/{key}": {
      get: {
        tags: ["UserMail"],
        summary: "Search  Mail",
        description: "Search Mail",
        operationId: "Search Mail",
        parameters: [
          {
            name: "key",
            in: "path",
            description: "key to search mails",
            required: "true",
            schema: {
              type: "string",
            },
          },
        ],
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
            description: "UNauthorized",
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
  };
  