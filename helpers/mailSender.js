/*
 * AST Mail Sender Helper
 *
 * Copyright 2015 Astralink Technology
 *
 * Version 2.3
 * Release date - 2015-05-12
 * Released by - Fong Shi Wei
 *
 * Change Log
 * ----------
 *
 */

//config
var sendgridKey = config.sendgrid.sendGridApiKey
, sendgrid = require('sendgrid')(sendgridKey)
, mailHelper = require('sendgrid').mail;

exports.sendMail = function(
    req
    , res
    , htmlContent
    , text
    , subject
    , mailinglist
    , importantMessage
    , replyTo
    , from
    , fromName
    , callback
){

    if (mailinglist && _.isArray(mailinglist) && !_.isEmpty(mailinglist)){
        async.eachSeries(mailinglist, function(mailTo, sendMailCallback){

            var receiverEmail = mailTo.email;
            var receiverName = mailTo.name;
            var bcc = mailTo.bcc;
            var cc = mailTo.cc;

            if (receiverEmail && receiverName && subject){
                var mailObject = new mailHelper.Mail();

                var from_email = new mailHelper.Email(from, fromName);
                mailObject.setFrom(from_email);

                var personalization = new mailHelper.Personalization()
                var to_email = new mailHelper.Email(receiverEmail, receiverName);
                personalization.addTo(to_email);
                var email_subject = subject;
                personalization.setSubject(email_subject);
                if (cc){
                    var mail_cc = new mailHelper.Email(cc)
                    personalization.addCc(mail_cc);
                }
                if (bcc && _.isArray(bcc) && !_.isEmpty(bcc)){
                    _.each(bcc, function(bcc_email){
                        var mail_bcc = new mailHelper.Email(bcc_email)
                        personalization.addBcc(mail_bcc);
                    })
                }
                mailObject.addPersonalization(personalization);


                if (replyTo) {
                    var reply_to = new mailHelper.Email(replyTo)
                    mailObject.setReplyTo(reply_to)
                }
                if (text) {
                    // mailObject.text = text;
                    var content = new mailHelper.Content("text/plain", text)
                    mailObject.addContent(content);
                }
                if (htmlContent) {
                    var content = new mailHelper.Content("text/html", htmlContent)
                    mailObject.addContent(content);
                }


                var emptyRequest = require('sendgrid-rest').request;
                var requestPost = JSON.parse(JSON.stringify(emptyRequest))
                requestPost.method = 'POST';
                requestPost.path = '/v3/mail/send';
                requestPost.body = mailObject;
                sendgrid.API(requestPost, function (error, response) {
                    if (!error){
                        sendMailCallback(response);
                    }else{
                        sendMailCallback(error);
                    }
                })

            }else{
                sendMailCallback("Parameters required");
            }
        }, function(err){
            if (!err){
                if (callback) callback();
                return;
            }else{
                if (callback) callback(err);
                return;
            }
        });
    }else{
        if (callback) callback("Parameters required");
        return;
    }

}