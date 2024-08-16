import { z } from "zod";

export const signinFormValidation = z.object({
  phone: z
    .string()
    .trim() 
    .refine(
      (phone) => /^\+?[1-9]\d{1,14}$/.test(phone),
      "Invalid phone number"
    ),
  password: z
    .string()
    .trim() 
    .min(4, "Password must be at least 4 characters long"),
});

export const signupFormValidation = z
  .object({
    name: z
      .string()
      .trim() 
      .min(3, "Full Name must be at least 3 characters long")
      .max(50, "Name must be at most 50 characters."),
    email: z
      .string()
      .trim() 
      .email("Invalid email address"),
    phone: z
      .string()
      .trim() 
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be at most 15 digits"),
    password: z
      .string()
      .trim() 
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 15 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .trim() 
      .min(8, "Password must be at least 4 characters long"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The Password did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const registerFormValidation = z.object({
  birthDate: z.coerce.date(),
  gender: z.enum(["Male", "Female", "Other"]),
  bloodType: z.enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]),
  disease: z
    .string()
    .trim() 
    .min(1, "Primary Disease is required"),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must agree to the Privacy Consent ",
    }),
  concent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must Consent to Treatment",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((val) => val === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  address: z
    .string()
    .trim() 
    .min(4, "Address is required"),
  occupation: z
    .string()
    .trim() 
    .min(3, "Occupation is required"),
});

export const appointmentFormValidation = z.object({
  appointmentType: z.enum(['outpatient','inpatient']),
  reason: z
    .string()
    .trim() 
    .min(5, "Reason must be at least 5 characters long"),
  note: z
    .string()
    .trim() 
    .min(5, "Notes must be at least 5 characters long"),
  schedule: z.coerce.date(),
  payment: z.enum(['online','payment']),
});
