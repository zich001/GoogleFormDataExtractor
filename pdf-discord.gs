var docTemplate = "17q9HpvfEjBM1cD7wQ2MXOR7Pkabd5WE3npDqVmnTBso";

function onSubmit(e){
  var POST_URL = "https://discord.com/api/webhooks/1170961959307448350/qlyYw8JDjPLutmV6Hy9KCVC0OSm8AhuL6_lWJmwW5OkeSqMDZ-pr5g-Yj9yejyaHKfWa";
    var form = FormApp.getActiveForm();
    var allResponses = form.getResponses();
    var latestResponse = allResponses[allResponses.length - 1];
    var response = latestResponse.getItemResponses();
  var formatedDate = Utilities.formatDate(new Date(), "BST", "dd/MM/yyyy");
  var copyId = DriveApp.getFileById(docTemplate)
  .makeCopy()
  .setName(response[0].getResponse())
  .getId();
  var copyDoc = DocumentApp.openById(copyId);
  var copyBody = copyDoc.getActiveSection();
  copyBody.replaceText("2000USER000NAME00022000USER000NAME0002", response[0].getResponse());
  copyBody.replaceText("2000TIME000STAMP00022000TIME000STAMP0002", formatedDate);
  for (var i = 1; i < response.length; i++){
    var temp = `ANSLOCKQUESTION${i}ANS`;
    var responses = response[i].getResponse();
    copyBody.replaceText(temp, responses);
  }
  copyDoc.saveAndClose();
  
  var pdf = DriveApp.getFileById(copyId).getAs("application/pdf");
  var payload = {
    "content": `**Username:** ${response[0].getResponse()}\n**Date:** ${formatedDate}}`,
    "file": pdf
  }; 
 
  var params = {
    "method": "post",
    "payload": payload,
    "muteHttpExceptions": true
  };
  UrlFetchApp.fetch(POST_URL, params); 
  Drive.Files.remove(copyId);
};
