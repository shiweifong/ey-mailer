// User to get energy reading
var sendMail = exports.sendMail = function (req, res, override, callback){
    if (
        req.body.FullName &&
        req.body.Email
    ) {

        var fullName = req.body.FullName,
            email = req.body.Email,
            phone = req.body.Phone,
            travelDate = req.body.TravelDate,
            destinations = req.body.Destinations, // array
            otherDestination = req.body.OtherDestination,
            experiences = req.body.Experiences,
            otherExperience = req.body.otherExperience,
            styleLevel = req.body.Style,
            noOfTravellers = req.body.NoOfTravellers,
            comeFrom = req.body.ComeFrom,
            questionRequests = req.body.QuestionsRequests;
;

        // Form the HTMl
        var html = "";
        

        var htmlContent = html
            , from = email
            , fromName = fullName
            , replyTo = email
            , text = null
            , importantMessage = true
            , subject = "Customized Trip Enquiry"
            , mailinglist = [{
                email : 'info@extravagantyak.com',
                name : 'Extravagant Yak',
                bcc : 'shiweifong@gmail.com',
                cc : ''
            }]

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

    }else{
        apiHelper.apiResponse(req, res, true, 401, "Not found", null, null, null, callback);
    }
}