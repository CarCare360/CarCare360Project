const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const mailingListSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailAddresses: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("MailingList", mailingListSchema);
