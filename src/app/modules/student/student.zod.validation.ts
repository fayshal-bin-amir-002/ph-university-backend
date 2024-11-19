import { z } from "zod";

// Zod schema for user name
const studentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required!")
    .max(20, "First name cannot be longer than 20 characters!")
    .refine(
      (value) => /^[A-Z][a-z]*$/.test(value),
      (value) => ({ message: `${value} is not in capitalized format!` }),
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required!")
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value),
      (value) => ({ message: `${value} is not valid!` }),
    ),
});

// Zod schema for gurdian
const gurdianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, "Father name is required!"),
  fatherOccupation: z.string().trim().min(1, "Father occupation is required!"),
  fatherContactNo: z.string().trim().min(1, "Father contact no is required!"),
  motherName: z.string().trim().min(1, "Mother name is required!"),
  motherOccupation: z.string().trim().min(1, "Mother occupation is required!"),
  motherContactNo: z.string().trim().min(1, "Mother contact no is required!"),
});

// Zod schema for local gurdian
const localGurdianValidationSchema = z.object({
  name: z.string().trim().min(1, "Local gurdian name is required!"),
  occupation: z.string().trim().min(1, "Local gurdian occupation is required!"),
  contactNo: z.string().trim().min(1, "Local gurdian contact no is required!"),
  address: z.string().trim().min(1, "Local gurdian address is required!"),
});

// Zod schema for student
const studentZodValidationSchema = z.object({
  id: z.string().trim().min(1, "ID is required!"),
  password: z.string().trim().max(20),
  name: studentNameValidationSchema,
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({
      message: "Gender must be one of Male, Female, or Other!",
    }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .trim()
    .email("Email is not valid!")
    .min(1, "Email is required!"),
  contactNo: z.string().trim().min(1, "Contact no is required!"),
  emergencyContactNo: z.string().trim().min(1, "Emergency no is required!"),
  bloodGroup: z
    .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], {
      errorMap: () => ({ message: "Blood group must be a valid type!" }),
    })
    .optional(),
  presentAddress: z.string().trim().min(1, "Present address is required!"),
  permanentAddress: z.string().trim().min(1, "Permanent address is required!"),
  gurdian: gurdianValidationSchema,
  localGurdian: localGurdianValidationSchema,
  profileImage: z.string().url().optional(),
  isActive: z.enum(["Active", "Blocked"], {
    errorMap: () => ({ message: "Status must be either Active or Blocked!" }),
  }),
  isDeleted: z.boolean(),
});

export default studentZodValidationSchema;
