const { z } = require("zod");

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(50, { message: "Name must not be more than 50 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(100, { message: "Email must not be more than 100 characters" })
    .email({ message: "Invalid email address" }),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" }),
});

module.exports = { signupSchema };