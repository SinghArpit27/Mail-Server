import { check } from "express-validator";

export const mailValidation = [

    check("subject")
        .trim()
        .notEmpty().withMessage("Subject is required"),

    check("message")
        .trim()
        .notEmpty().withMessage("Message is required"),

    check("to")
        .trim()
        .notEmpty().withMessage("Receiver is required")
];