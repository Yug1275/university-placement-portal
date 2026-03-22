const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    salary: String,
    location: String,
    skillsRequired: [String],
    eligibility: String,
    deadline: Date,

    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);