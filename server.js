const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 8000;

// Middleware to parse incoming form data
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // for handling application/json

// POST route to handle form submissions
app.post('/submit-form', (req, res)  => {
    const { name, email, message } = req.body;

    // Log the form data to see if it's coming through correctly
    console.log('Form data:', { name, email, message });

    // Validate form data (optional, but good practice)
    if (!name || !email || !message) {
        return res.status(400).send('Please fill out all fields');
    }

    // Nodemailer email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kavyaaram@gmail.com', 
            pass: 'xyza bcde fghi jklm'   
        }
    });

    // Email message options
    const mailOptions = {
        from: email, // Sender's email address
        to: 'kavyaaram@gmail.com', 
        subject: 'New Contact Form Submission',
        text: `You have received a new message from your website contact form.

        Name: ${name}
        Email: ${email}
        Message: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Message sent successfully!');
    });

});

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
