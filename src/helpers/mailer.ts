import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        console.log("MAIL", userId);
        console.log("EMAIL TYPE", emailType);
        console.log(typeof emailType);

        if (emailType === "VERIFY") {
            console.log("VERIFY SECTION");

            const updatedUser = await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
            console.log("Updated User for VERIFY", updatedUser);

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)
                }
            });
        }

        console.log("Out side if else")

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c0a3fc4b2e5b2b",
                pass: "e281c9b0e82ed6"
            }
        });

        const mailOptions = {
            from: 'sender@example.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser.<br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
        }

        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse; // Add a semicolon here
    } catch (error:any) {
        throw new Error(error.message);
    }
}
