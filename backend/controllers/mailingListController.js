const MailingList = require("../models/mailingListModel");

const sendEmail = require("../utils/sendEmail");

exports.createMailingList = async (req, res) => {
  try {
    const { name, emailAddresses } = req.body;

    if (!name || !emailAddresses || emailAddresses.length === 0) {
      return res
        .status(400)
        .json({ message: "Name and at least one email address are required." });
    }

    const newMailingList = await MailingList.create({
      name,
      emailAddresses,
    });
    res.status(201).json(newMailingList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating the mailing list." });
  }
};

// Add email addresses to a mailing list
exports.addemailAddresses = async (req, res) => {
  try {
    const { mailingListId, emailAddresses } = req.body;

    if (!mailingListId || !emailAddresses || emailAddresses.length === 0) {
      return res.status(400).json({
        message: "Mailing list ID and at least one email address are required.",
      });
    }

    // Find the mailing list by ID
    const mailingList = await MailingList.findById(mailingListId);

    if (!mailingList) {
      return res.status(404).json({ message: "Mailing list not found." });
    }

    // Filter out any email addresses that are already in the mailing list
    const uniqueEmailAddresses = emailAddresses.filter(
      (email) => !mailingList.emailAddresses.includes(email)
    );

    // Add email addresses to the mailing list
    mailingList.emailAddresses.push(...uniqueEmailAddresses);

    // Save the updated mailing list
    const updatedMailingList = await mailingList.save();

    res.status(200).json(updatedMailingList);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error adding users to the mailing list." });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const { to, subject, text, mailingListIds } = req.body;

    if (!subject || !text) {
      return res
        .status(400)
        .json({ message: "Subject and text are required." });
    }

    const uniqueEmails = new Set(); // To keep track of unique email addresses

    if (mailingListIds && mailingListIds.length > 0) {
      // Send the email to selected mailing lists
      for (const mailingListId of mailingListIds) {
        const mailingList = await MailingList.findById(mailingListId);
        if (!mailingList) {
          return res
            .status(404)
            .json({
              message: `Mailing list with ID ${mailingListId} not found.`,
            });
        }

        for (const email of mailingList.emailAddresses) {
          if (!uniqueEmails.has(email)) {
            await sendEmail({ to: email, subject, text });
            uniqueEmails.add(email); // Add the email to the set
          }
        }
      }
    }

    if (to && to.length > 0) {
      // Send the email to individual addresses
      for (const email of to) {
        if (!uniqueEmails.has(email)) {
          await sendEmail({ to: email, subject, text });
          uniqueEmails.add(email); // Add the email to the set
        }
      }
    }

    res.status(200).json({ message: "Email(s) sent successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending email(s)." });
  }
};

// Controller function to fetch all mailing lists
exports.getAllMailingLists = async (req, res) => {
  try {
    // Fetch all mailing lists
    const mailingLists = await MailingList.find();

    res.status(200).json(mailingLists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching all mailing lists." });
  }
};
