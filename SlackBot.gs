var properties = PropertiesService.getScriptProperties();
var slack_token = properties.getProperty('SlackAccessToken');

function test() {
  var slackApp = SlackApp.create(slack_token);
  // 対象チャンネル
  var channelId = "#bottest";
  // 投稿するメッセージ
  var message = "TestMessage" + Math.floor(Math.random()*1000);
　//
  var options = {
  }
  slackApp.postMessage(channelId, message, options);
}