const nodemailer= require('nodemailer');
const ejs= require('ejs');
const path= require('path');


let transporter= nodemailer.createTransport({
    service:'gmail',
    host:'smtp.gmail.com',
    port: 465,
    secure:false,
    auth:{
        user:'internhoarway@gmail.com',
        pass: 'qzgazrmueibduldp'
    }
});

let renderTemplate= (data,relativepath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativepath),
        data,function(err,template){
            if(err){
                console.log("Error in Mail",err);
            }
            mailHtml=template;
        }
        )
        return mailHtml;
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}