exports.sendMail = function(req, res, override, callback, apiOptions) {
    var htmlContent = "hi"
        , text = "hi"
        , subject = "hello"
        , mailinglist = [{
            email : 'shiweifong@gmail.com',
            name : 'Shi Wei',
            bcc : '',
            cc : ''
        }]
        , importantMessage = false
        , replyTo = 'shiweifong@gmail.com'
        , from = 'info@extravagantyak.com'
        , fromName = "Extravagant Yak";

    mailSenderHelper.sendMail(
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
        , function(response){
            res.json(response);
        })
};