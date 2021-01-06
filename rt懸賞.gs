const scriptProp = PropertiesService.getScriptProperties();
const spreadSheetId = scriptProp.getProperty('spreadSheetId');  

function all(){
  var book = SpreadsheetApp.openById(spreadSheetId);
  var sheet = book.getSheetByName("シート1");
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  
  var time = new Date().getHours();
  var end = "";
  
  for(var i = 2; i <= lastRow; i++){
    var hour = range.getCell(i, 3).getValue();
    var flag = range.getCell(i, 4).getValue();
    if(hour == time && flag == 1){
      switch(rtLottery(range.getCell(i, 2).getValue(),
                   range.getCell(i, 1).getValue(),
                   0)){
        case -1:
          end = end + ",error @" + range.getCell(i, 1).getValue();
          break;
        case 1:
          //end = end + ",@" + range.getCell(i, 1).getValue();
          range.getCell(i, 4).setValue(0);
          KUnotifyer.unfollow(range.getCell(i, 1).getValue());
          break;
        default:
          break;
      }
    }
  }
  Utilities.sleep(1000);
  const logstring = Logger.getLog();
  const rtedIds = logstring.match(/(?<=<<).*?(?=>>)/mg);
  for(i in rtedIds){
    KUnotifyer.undoRetweet(rtedIds[i]);
  }

  if(end != ""){
    KUnotifyer.postTweet(end);
  }
  return 0;
}

function allS(){
  var book = SpreadsheetApp.openById(spreadSheetId);
  var sheet = book.getSheetByName("シート1");
  var range = sheet.getDataRange();
  var lastRow = range.getLastRow();
  
  for(var i = 1; i < lastRow; i++){
    var flag = range.getCell(i, 4).getValue();
    if(flag == 0){
      if(rtLotteryS(range.getCell(i, 2).getValue(),
                range.getCell(i, 1).getValue(),
                    0)==1){
        range.getCell(i, 4).setValue(1);
      }
    }
  }
  return 0;
}



function rtLottery(words,screenName,waitTime){
  var status = KUnotifyer.searchTweet(words,screenName,'');
  if(!status["statuses"][0]){
    return -1;
  }
  var statusId = JSON.stringify(status["statuses"][0]["id_str"]);
  var tweetDate = id2time(status["statuses"][0]["id"]);
  var date = new Date();
  //Logger.log("date :" + date.getTime() + "\ntweet:" + tweetDate.getTime());
  if((date.getTime() - tweetDate.getTime()) < 60*60*24*1000){
    Utilities.sleep(waitTime);
    statusId = statusId.replace(/\"/g,'');
    var rtStatus = KUnotifyer.retweet(statusId);
    Logger.log("<<%s>>",statusId);
    //Logger.log(rtStatus["id_str"]);
    var rtTime = Utilities.formatDate(id2time(rtStatus["id"]), 'JST', 'yyyy/MM/dd HH:mm:ss.SSS');
    //KUnotifyer.postTweet('@' + screenName + ' RTed at ' + rtTime + '+0900 (JST) ' + waitTime);
//    Utilities.sleep(1000);
//    KUnotifyer.undoRetweet(statusId);
    return 0;
  }
  else{
    return 1;
  }
}

function rtLotteryS(words,screenName,waitTime){
  var status = KUnotifyer.searchTweet(words,screenName,'');
  if(!status["statuses"][0]){
    return -1;
  }
  var statusId = JSON.stringify(status["statuses"][0]["id_str"]);
  var tweetDate = id2time(status["statuses"][0]["id"]);
  var date = new Date();
  if(date.getTime() - tweetDate.getTime() < 60*60*24*1000){
    KUnotifyer.follow(screenName,true);
    Utilities.sleep(waitTime);
    statusId = statusId.replace(/\"/g,'');
    KUnotifyer.retweet(statusId);
    Utilities.sleep(1000);
    KUnotifyer.undoRetweet(statusId);
    return 1;
  }
  return 0;
}

function id2time(id){
  id = id / Math.pow(2,22);
  id = id + 1288834974657;
  return new Date(id);
}

function hoge(){
  var a = new Date;
  Utilities.sleep(1000);
  var b = new Date;
  Logger.log(b.getTime() - a.getTime());
  Logger.log("<<hoge>>");
  Logger.log("fuga");
  Logger.log("<<piyo>>");
  const logstring = Logger.getLog();
  const RTedIds = logstring.match(/(?<=<<).*?(?=>>)/mg);
  Logger.log(RTedIds);
  //for(let i in RTedIds)
   // Logger.log(RTedIds[i]);
  return;
}

/*
function calbee70th(){
  var status = KUnotifyer.searchTweet("本投稿の","calbee70th",'');
  if(!status["statuses"][0]){
    return 1;
  }
  var statusId = JSON.stringify(status["statuses"][0]["id_str"]);
  var tweetDate = JSON.stringify(status["statuses"][0]["created_at"]);
  tweetDate = tweetDate.substr(1,10);
  var date = Utilities.formatDate(new Date(), 'GMT', 'EEE MMM dd');
  Logger.log(tweetDate+'\n'+date);
  
  if(date == tweetDate){
    var waitTime = Math.floor(Math.random()*1000);
    Utilities.sleep(waitTime);
    statusId = statusId.replace(/\"/g,'');
    var rtStatus = KUnotifyer.retweet(statusId);
    Logger.log(statusId);
    Logger.log(rtStatus["id_str"]);
    var rtTime = Utilities.formatDate(id2time(rtStatus["id"]), 'JST', 'yyyy/MM/dd HH:mm:ss.SSS');
    KUnotifyer.postTweet('@calbee70th RTed at ' + rtTime + '+0900 (JST) ' + waitTime);
  }
  else{
    KUnotifyer.postTweet(".@" + 'calbee70th' + ' のキャンペーンって終わった？');
  }
  
  //前日のRTを消す
  var scriptProp = PropertiesService.getScriptProperties();
  var oldId = scriptProp.getProperty('calbee70th');
  KUnotifyer.undoRetweet(oldId);
  scriptProp.setProperty('calbee70th', statusId);
  
  return 0;
}
*/