// validation/user.validation.ts
import { z } from "zod";

export const registerUserSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required",
    })
    .min(5, "Name should be at least 5 characters")
    .max(50, "Name should be at most 50 characters"),
  
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Please provide a valid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),

  role: z
    .enum(["user", "USER", "admin", "ADMIN"])
    .optional(),

  avatar: z.object({
    public_id: z.string().optional(),
    secure_url: z.string().url().optional(),
  }).optional(),
});



export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format"),
  
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
});

export const resetPasswordSchema = z.object({
  password: z
  .string({ required_error: "Password is required" })
  .min(6, "Password must be at least 6 characters"),
});



// validators/user.validator.js
// import { z } from "zod";

// export const userRegisterSchema = z.object({
//   fullName: z
//     .string({ required_error: "Name is required" })
//     .min(5, "Name must be at least 5 characters")
//     .max(50, "Name must be at most 50 characters"),
  
//   email: z
//     .string({ required_error: "Email is required" })
//     .email("Invalid email format"),

//   password: z
//     .string({ required_error: "Password is required" })
//     .min(6, "Password must be at least 6 characters"),

//   avatar: z
//     .object({
//       public_id: z.string().optional(),
//       secure_url: z.string().optional(),
//     })
//     .optional(),
// });
