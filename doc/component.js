export const userInput = {
  type: "object",
  properties: {
    name: {
      type: "string",
      required: "true",
      description: "Name of the user",
    },
    email: {
      type: "string",
      required: "true",
      description: "Email of the user",
    },
    phone: {
      type: "number",
      required: "true",
      description: "Phone Number of the user",
    },
    plan: {
      type: "string",
      required: "true",
      description: "Plan of the user",
    },
    password: {
      type: "string",
      required: "true",
      description: "Password of the user",
    },
  },
};

export const verifyUser = {
  type: "object",
  properties: {
    email: {
      type: "string",
      required: "true",
      description: "Email of the user",
    },
    otp: {
      type: "number",
      required: "true",
      description: "OTP for Verification",
    },
  },
};

export const resendOTP = {
  type: "object",
  properties: {
    email: {
      type: "string",
      required: "true",
      description: "Email of the user",
    },
  }
}

export const loginInput = {
  type: "object",
  properties: {
    email: {
      type: "string",
      required: "true",
      description: "Email  of the user",
    },
    password: {
      type: "string",
      required: "true",
      description: "Password of the user",
    },
  },
};

export const changePassword = {
  type: "object",
  properties: {
    password: {
      type: "string",
      required: "true",
      description: "Password  of the user",
    },
  },
};

export const updateProfile = {
  type: "object",
  properties: {
    name: {
      type: "string",
      required: "true",
      description: "Name  of the user",
    },
    phone: {
      type: "number",
      required: "true",
      description: "Phone Number of the user",
    },
    plan: {
      type: "string",
      required: "true",
      description: "Plan of the user",
    },
  },
};

export const composeMail = {
  type: "object",
  properties: {
    subject: {
      type: "string",
      required: "true",
      description: "Subject of the mail",
    },
    attachments: {
      type: "array",
      items: {
        type: "file",
      },
      description: "File uploads",
    },
    message: {
      type: "string",
      required: "true",
      description: "Enter message",
    },
    receiver: {
      type: "string",
      required: "true",
      description: "Enter Email of Receiver",
    },
    cc: {
      type: "array",
      items: {
        type: "string",
      },
      required: "true",
      description: "Enter Email CC",
    },
    bcc: {
      type: "array",
      items: {
        type: "string",
      },
      required: "true",
      description: "Enter Email of BCC",
    },
  },
};