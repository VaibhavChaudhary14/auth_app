import nodemailer from 'nodemailer'

export const sendEmail = async({email,emailType, userId}:any) => {
  try {

    //TODO: configure mail for usage 
    
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
            user: "Vaibhav14",
            pass: "Vaibhav.14",
        },
    });

    const mailOptions = {
        from: '14vaibhav2002@gmail.com',
        to: email,
        subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password", 
        html: "<b>Hello world?</b>",  
      }

      const mailResponse = await transporter.sendMail(mailOptions)
      return mailResponse


  } catch (error:any)  { 
      throw new Error(error.message)
  }
}  