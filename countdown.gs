function myFunction() {
  var name = '';
  name = KUnotifyer.getUserInfo().name;

  var date = new Date();
  Logger.log(date);
  var day = date.getDate();
  var month = date.getMonth();

  var lastDays = month != 11 ? -1 : (31 - day);

  Logger.log(lastDays);
  if (lastDays > 0) {
    const hour = date.getHours();
    const lastHour = 23 - hour + lastDays * 24;
    name = name.replace(/あと.*/, 'あと' + lastHour + '時間');
    //name = name.replace(/あと.*/,'あと' + lastDays + '日');
  }
  else if (lastDays == 0){
    var hour = date.getHours();
    var minute = date.getMinutes();
    var lastMin = 59 - minute;
    var lastHour = 23 - hour;
    if (lastHour > 0) {
      name = name.replace(/あと.*/, 'あと' + lastHour + '時間' + lastMin + '分');
    }
    else{
      name = name.replace(/あと.*/, 'あと' + lastMin + '分');
    }
  }
  else {
      name = name.replace(/あと.*/, 'あけましておめでとうございます。本年もよろしくお願いいいたします。');
  }
  name = name.replace(/@/g, '%40');
  KUnotifyer.setUserInfo(name, '', '', '');
  return 0;
}

function followersList() {
  const list = KUnotifyer.getFollowerAll();
  let screenNameList = [];
  for (i in list.users) {
    screenNameList.push(list.users[i].screen_name);
    if(screenNameList.length == 100){
      KUnotifyer.addListMember("1340968543085465603",screenNameList);
      screenNameList=[];
    }
  }
  KUnotifyer.addListMember("1340968543085465603",screenNameList);
  return 0;
}