var restify = require('restify');
var botbuilder = require('botbuilder');
var cognitiveservices = require('botbuilder-cognitiveservices');

// setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3987, function(){
	console.log('%s bot started at %s', server.name, server.url);
});


// create chat connector
var connector = new botbuilder.ChatConnector({
	appId: process.env.APP_ID,
	appPassword: process.env.APP_SECRET
});


// listening for user inputs
server.post('/api/messages', connector.listen());

var bot = new botbuilder.UniversalBot(connector);

var recognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: '5fc4b0d2-9292-47eb-a086-3f77451d2a60',
	subscriptionKey: '61ec0d878b514a85bf5c5dae03869452'
});

var basicQnaMakerDialog = new cognitiveservices.QnAMakerDialog({
	recognizers: [recognizer],
	defaultMessage: "Pas de correspondance",
	qnaThreshold: 0.3
});

bot.dialog('/', basicQnaMakerDialog);