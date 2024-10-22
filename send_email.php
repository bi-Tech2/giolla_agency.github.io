<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Email details
        $to = "jodicksonjoshua@gmail.com"; // Replace with your email address
        $subject = "New Contact Form Submission";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Email message
        $email_content = "
        <html>
        <head>
          <title>New Contact Form Submission</title>
        </head>
        <body>
          <h2>Contact Form Details</h2>
          <p><strong>Name:</strong> $name</p>
          <p><strong>Email:</strong> $email</p>
          <p><strong>Message:</strong> $message</p>
        </body>
        </html>
        ";

        // Send email
        if (mail($to, $subject, $email_content, $headers)) {
            echo "Your message has been sent successfully.";
        } else {
            echo "Sorry, there was an error sending your message. Please try again.";
        }
    } else {
        echo "Invalid email format.";
    }
} else {
    echo "Form submission error.";
}
?>
