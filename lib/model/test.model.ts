import mongoose, { Model, Schema, model, models } from "mongoose";

export interface ITest {
  fname: string;
  lname: string;
  email: string;
  password: string;
}

export interface TestDocument extends ITest, mongoose.Document {
  fullName: string;
  updatedAt: Date;
  createdAt: Date;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const testSchema = new Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true,
    },
  },
  { timestamps: true }
);

testSchema.virtual("fullName").get(function (this: TestDocument) {
  return `${this.fname} ${this.lname}`;
});

testSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const test = this as TestDocument;
  const password = test.password;
  const isMatch = password === candidatePassword;
  return isMatch;
};

const Test: Model<TestDocument> =
  models.Test || model<TestDocument>("Test", testSchema);

export default Test;
