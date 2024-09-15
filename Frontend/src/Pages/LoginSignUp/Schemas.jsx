import { z } from 'zod';

// Signup schema 
const signupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(3, "Password should be at least 6 characters"),
  age: z.number().min(18, "Must be at least 18 years old"),
  mobile: z.string().length(10, "Mobile number must be 10 digits"),
  address: z.string().min(1, "Address is required"),
  aadharCardNumber: z
  .string()
  .length(12, "Aadhar Card Number must be exactly 12 digits")
  .regex(/^\d{12}$/, "Aadhar Card Number must be a 12-digit number"),
});

// Login schema 
const loginSchema = z.object({
  aadharCardNumber: z
  .string()
  .length(12, "Aadhar Card Number must be exactly 12 digits")
  .regex(/^\d{12}$/, "Aadhar Card Number must be a 12-digit number"),
  password: z.string().min(3, "Password should be at least 6 characters"),
});

export { signupSchema, loginSchema };
