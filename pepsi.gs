function compareNumbers(a, b) {
  return a - b;
}

var sum = function(arr) {
    return arr.reduce(function(prev, current, i, arr) {
        return prev+current;
    });
};

function id2date(id){
  id = id / Math.pow(2,22);
  id = id + 1288834974657;
  return new Date(id);
}

function pepsi(){
  const N=50;
  
  var difsum = 0;
  var difmax5 = [0,0,0,0,0];
  var waitTime = 0;
  
  for (var i = 1; i <= N; i++){
    var date = new Date();
    var status333 = JSON.parse(KUnotifyer.postTweet("pepsi" + i));
    var date333 = id2date(status333["id"]);
    
    var dif = date333.getMilliseconds() - date.getMilliseconds();
    KUnotifyer.deleteTweet(status333["id_str"]);
    if(dif<=0) dif += 1000;
    if(dif>150){
      i--;
      continue;
    }
    difsum += dif;
    difmax5.push(dif)
    difmax5.sort(compareNumbers).shift();
  }
  waitTime = (difsum - sum(difmax5)) / (N - 1);
  
  var content = "#本田とじゃんけん2020 #本田に" + (Math.floor(Math.random()*3)==0?'グー':(Math.random()>0.5?'チョキ':'パー')) + "で勝つ @pepsi_jpn #ペプシ #ジャパンコーラ";
  
  do{
    date = new Date();
  }while(date.getMilliseconds() < 1010 - waitTime);
  var status334 = JSON.parse(KUnotifyer.postTweet(content));
  KUnotifyer.postTweet( Utilities.formatDate(id2date(status334["id"]), 'JST', 'HH:mm:ss.SSS') + "\n" 
                       + Utilities.formatDate(date, 'JST', 'HH:mm:ss.SSS') + "\n" 
                       + waitTime
                       + " #SK334 pepsi");
  return 0;
}

function kindai(){
  KUnotifyer.postTweet("＼ #マグロとじゃんけん ／ 私は、#マグロに" + (Math.floor(Math.random()*3)==0?'グー':(Math.random()>0.5?'チョキ':'パー')) + "で勝つ @kinkidaigakuPR をフォローして最強の #近大マグロ と勝負しよう！");
  return 0;
}


function Epic7(){
  var status = JSON.parse(KUnotifyer.postTweet("#エピックセブンでクリスマス@Epic7_jp #エピックセブン #アルカサスサンタ #クリスマスアルゥ #クリスマスボックス"));
  Utilities.sleep(100);
  KUnotifyer.deleteTweet(status["id_str"]);
  return 0;
}

function athome_co(){
  var status = JSON.parse(KUnotifyer.postTweet("@athome_co #アットホームであった #今日のあったらラッキーアイテム占い"));
  Utilities.sleep(100);
  KUnotifyer.deleteTweet(status["id_str"]);
  return 0;
}

function PanasonicBeauty(){
  var status = JSON.parse(KUnotifyer.postTweet("@PanasonicBeauty #はずさないギフト #クリスマスボックス"));
  Utilities.sleep(100);
  KUnotifyer.deleteTweet(status["id_str"]);
  return 0;
}

function shuchinikurin(){
  var book = SpreadsheetApp.openById("1bNArnWAL78MxLQz4tQ85V2aeN_XQh3Tpz6rfLDYn7jA");
  var range = book.getSheetByName("フォームの回答 1").getDataRange();
  var lastRow = 21;
  var table = range.getValues(); //sheetのi行[列]目は行列のi-1行[列]目になる
  for(var i=0;i<lastRow;i++){
    KUnotifyer.postTweet(table[i][2]+"\nNF模擬店「酒池肉林」の抽選応募者募集に回答していただいてありがとうございました。\n9/6(金)23:55までに下のURLから'xM-189: 酒池肉林'の企画に登録をお願いします。NF当日手伝っていただけない方でも登録していただけると幸いです。https://penguin.nf.la/mogi/sanka/378/X4jRK6xxrP8axq4LvPCm");
  }
  return 0;
}