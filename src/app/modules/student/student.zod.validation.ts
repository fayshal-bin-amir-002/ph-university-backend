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
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().trim().max(20),
    student: z.object({
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
      permanentAddress: z
        .string()
        .trim()
        .min(1, "Permanent address is required!"),
      gurdian: gurdianValidationSchema,
      localGurdian: localGurdianValidationSchema,
      profileImage: z.string().url().optional(),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

const updateStudentNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required!")
    .max(20, "First name cannot be longer than 20 characters!")
    .refine(
      (value) => /^[A-Z][a-z]*$/.test(value),
      (value) => ({ message: `${value} is not in capitalized format!` }),
    )
    .optional(),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required!")
    .refine(
      (value) => /^[a-zA-Z]+$/.test(value),
      (value) => ({ message: `${value} is not valid!` }),
    )
    .optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z
      .object({
        name: updateStudentNameValidationSchema.optional(),
        gender: z
          .enum(["Male", "Female", "Other"], {
            errorMap: () => ({
              message: "Gender must be one of Male, Female, or Other!",
            }),
          })
          .optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().trim().email("Email is not valid!").optional(),
        contactNo: z.string().trim().optional(),
        emergencyContactNo: z.string().trim().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"], {
            errorMap: () => ({ message: "Blood group must be a valid type!" }),
          })
          .optional(),
        presentAddress: z.string().trim().optional(),
        permanentAddress: z.string().trim().optional(),
        gurdian: gurdianValidationSchema.optional(),
        localGurdian: localGurdianValidationSchema.optional(),
        profileImage: z.string().url().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        isDeleted: z.boolean().optional(),
      })
      .optional(),
  }),
});

export const studentValidations = {
  createStudentValidationSchema,
};
