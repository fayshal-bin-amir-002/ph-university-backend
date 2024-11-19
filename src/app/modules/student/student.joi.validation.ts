import Joi from "joi"; // data validator import

// creating a schema validation using joi
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, "capitalized format")
    .messages({
      "string.empty": "First name is required!",
      "string.max": "First name cannot be longer than 20 characters!",
      "string.pattern.name": "{#value} is not in capitalized format!",
    }),
  middleName: Joi.string().trim().allow(null, ""),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      "string.empty": "Last name is required!",
      "string.pattern.base": "{#value} is not valid!",
    }),
});

// Joi schema for gurdian
const gurdianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    "string.empty": "Father name is required!",
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    "string.empty": "Father occupation is required!",
  }),
  fatherContactNo: Joi.string().trim().required().messages({
    "string.empty": "Father contact no is required!",
  }),
  motherName: Joi.string().trim().required().messages({
    "string.empty": "Mother name is required!",
  }),
  motherOccupation: Joi.string().trim().required().messages({
    "string.empty": "Mother occupation is required!",
  }),
  motherContactNo: Joi.string().trim().required().messages({
    "string.empty": "Mother contact no is required!",
  }),
});

// Joi schema for local gurdian
const localGurdianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Local gurdian name is required!",
  }),
  occupation: Joi.string().trim().required().messages({
    "string.empty": "Local gurdian occupation is required!",
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.empty": "Local gurdian contact no is required!",
  }),
  address: Joi.string().trim().required().messages({
    "string.empty": "Local gurdian address is required!",
  }),
});

// Joi schema for student
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.empty": "ID is required!",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required!",
  }),
  gender: Joi.string().valid("Male", "Female", "Other").required().messages({
    "any.only": "{#value} is not supported!",
    "string.empty": "Gender is required!",
  }),
  dateOfBirth: Joi.string().allow(null, ""),
  email: Joi.string().trim().required().email().messages({
    "string.empty": "Email is required!",
    "string.email": "{#value} is not a valid email type!",
  }),
  contactNo: Joi.string().trim().required().messages({
    "string.empty": "Contact no is required!",
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    "string.empty": "Emergency no is required!",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
    .required()
    .messages({
      "any.only": "{#value} is not supported!",
      "string.empty": "Blood group is required!",
    }),
  presentAddress: Joi.string().trim().required().messages({
    "string.empty": "Present address is required!",
  }),
  permanentAddress: Joi.string().trim().required().messages({
    "string.empty": "Permanent address is required!",
  }),
  gurdian: gurdianValidationSchema.required().messages({
    "any.required": "Gurdian info is required!",
  }),
  localGurdian: localGurdianValidationSchema.required().messages({
    "any.required": "Local Gurdian info is required!",
  }),
  profileImage: Joi.string().uri().allow(null, ""),
  isActive: Joi.string()
    .valid("Active", "Blocked")
    .default("Active")
    .required()
    .messages({
      "any.only": "{#value} is not supported!",
      "string.empty": "Status is required!",
    }),
});

export default studentValidationSchema;
