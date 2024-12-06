import { Schema, model } from "mongoose";
import validator from "validator";

import {
  TGurdian,
  TLocalGurdian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";

// schema for user name
const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required!"],
    maxlength: [20, "First name can not be longer than 20 characters!"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return value === firstNameStr;
      },
      message: "{VALUE} is not in capitalized format!",
    },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required!"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid!",
    },
  },
});

// schema for gurdian
const gurdianSchema = new Schema<TGurdian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, "Father name is required!"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father occupation is required!"],
  },
  fatherContactNo: {
    type: String,
    trim: true,
    required: [true, "Father contact no is required!"],
  },
  motherName: {
    type: String,
    trim: true,
    required: [true, "Mother name is required!"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother occupation is required!"],
  },
  motherContactNo: {
    type: String,
    trim: true,
    required: [true, "Mother contact no is required!"],
  },
});

// schema for local gurdian
const localGurdianSchema = new Schema<TLocalGurdian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local gurdian name is required!"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local gurdian occupation is required!"],
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, "Local gurdian contact no is required!"],
  },
  address: {
    type: String,
    trim: true,
    required: [true, "Local gurdian address is required!"],
  },
});

// student schema
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required!"],
      unique: true,
      ref: "User",
    },
    name: {
      type: userNameSchema,
      required: [true, "Name is required!"],
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "{VALUE} is not supported!",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required!"],
      unique: true,
      // email validation check
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email type!",
      },
    },
    contactNo: {
      type: String,
      trim: true,
      required: [true, "Contact no is required!"],
    },
    emergencyContactNo: {
      type: String,
      trim: true,
      required: [true, "Emergency no is required!"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
        message: "{VALUE} is not supported!",
      },
      required: [true, "Blood group is required!"],
    },
    presentAddress: {
      type: String,
      trim: true,
      required: [true, "Present address is required!"],
    },
    permanentAddress: {
      type: String,
      trim: true,
      required: [true, "Permanent address is required!"],
    },
    gurdian: {
      type: gurdianSchema,
      required: [true, "Gurdian info is required!"],
    },
    localGurdian: {
      type: localGurdianSchema,
      required: [true, "Local Gurdian info is required!"],
    },
    profileImage: { type: String },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: "AcademicDepartment",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual ---->>
studentSchema.virtual("fullName").get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

// query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  // this.find({ isDeleted: { $ne: true } });
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
