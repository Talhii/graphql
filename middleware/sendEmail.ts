import nodemailer from "nodemailer";

async function sendEmail(email:any){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"fa18-bcs-080@cuiatk.edu.pk",
            pass:"Talhiandroid5"
        }
    });

    let mailOptions  = {
        from: "fa18-bcs-080@cuiatk.edu.pk",
        to: email,
        subject : "Welcome to Our Site",
        text: "You are registered successfully"
    }

    transporter.sendMail(mailOptions,function(err,data){
        if(err){
            console.log(err);
        }
        else{
            console.log("Email sent :" + data.response);
        }
    })
}

export default {sendEmail};