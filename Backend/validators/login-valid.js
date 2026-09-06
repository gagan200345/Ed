const { z } = require("zod");

const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(100, { message: "Email must not be more than 100 characters" })
    .email({ message: "Invalid email address" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least of 6 characters" }),
});

module.exports = {signinSchema};