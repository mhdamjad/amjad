// pages/api/sendEmail.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type Data = {
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
  
    });

    const mailOptions = {
      from: email,
      to: process.env.GMAIL_USER,
      subject: `New message from ${name}`,
      text: `name: ${name}, email: ${email}, msg: ${message}`,
    };

    console.log(mailOptions, 'mailOptionss')

    try {
     const data = await transporter.sendMail(mailOptions);
     console.log(data, 'data')
      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.log(error, 'error')
      res.status(500).json({ error: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
