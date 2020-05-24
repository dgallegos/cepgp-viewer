var luaToJson = require('lua-to-json')
const fs = require('fs');

var cepgpTraffic;
var currentCepgp;

module.exports = CepgpService;
function CepgpService() {
}

CepgpService.Upload = function(cepgpLuaFile) {
	cepgData = this.convertLuaToJSON(cepgpLuaFile);
	cepgpTraffic = this.buildTrafficArray(cepgData.TRAFFIC);
	currentCepgp = this.buildCurrentCepgp(cepgpTraffic);
  return;
};

CepgpService.convertLuaToJSON = function(cepgpLuaFile) {
	var cepgpLuaData = cepgpLuaFile.data.toString('utf8');
	var ast = luaToJson(cepgpLuaData);
	return ast;
};

CepgpService.GetTraffic = function() {
	return cepgpTraffic;
};

CepgpService.GetCurrentCepgp = function() {
	return currentCepgp;
};


CepgpService.buildTrafficArray = function(cepgpTrafficArray) {
	var cepgpTraffic = [];
	// Rebuild using named keys
	for (var i = 0; i < cepgpTrafficArray.length; i++) {
		var trafficItem = {};
		trafficItem.player = cepgpTrafficArray[i]["0"];
		trafficItem.issuer = cepgpTrafficArray[i]["1"];
		trafficItem.action = cepgpTrafficArray[i]["2"];
		trafficItem.epb = cepgpTrafficArray[i]["3"];
		trafficItem.epa = cepgpTrafficArray[i]["4"];
		trafficItem.gpb = cepgpTrafficArray[i]["5"];
		trafficItem.gpa = cepgpTrafficArray[i]["6"];
		trafficItem.itemLink = cepgpTrafficArray[i]["7"];
		trafficItem.itemName = trafficItem.itemLink ? trafficItem.itemLink.split('|h[').pop().split(']|h')[0] : trafficItem.itemLink;
		trafficItem.itemId = trafficItem.itemLink ? trafficItem.itemLink.split('Hitem:').pop().split(':')[0] : trafficItem.itemLink;
		trafficItem.itemUrl = trafficItem.itemLink ? 'https://classic.wowhead.com/item=' + trafficItem.itemId : trafficItem.itemLink ;
		trafficItem.timeStamp = cepgpTrafficArray[i]["8"] ? Number(cepgpTrafficArray[i]["8"]) : 0;
		trafficItem.prio = null;
		cepgpTraffic.push(trafficItem);
	}
	return cepgpTraffic;
}

CepgpService.buildCurrentCepgp = function(cepgpTraffic) {
	var currentCepgpBuild = {}
	// Get all usernames and last of each username
	// for each line item
	for (var i = 0; i < cepgpTraffic.length; i++) {
		var cepgpTrafficItem = cepgpTraffic[i];
		// if name doesn't exist
		if (cepgpTrafficItem.player && !currentCepgpBuild.hasOwnProperty(cepgpTrafficItem.player)) {
			currentCepgpBuild[cepgpTrafficItem.player] = cepgpTrafficItem;
		} else {
			// if date is greater than current date
			if(cepgpTrafficItem.player && (cepgpTrafficItem.timeStamp > currentCepgpBuild[cepgpTrafficItem.player].timeStamp)) {
				// replace latest
				currentCepgpBuild[cepgpTrafficItem.player] = cepgpTrafficItem;
			}
		}
	}
	delete currentCepgpBuild.Raid;
	delete currentCepgpBuild.Guild;
	
	currentCepgpBuild = Object.values(currentCepgpBuild);
	// Add prio
	for (var i = 0; i < currentCepgpBuild.length; i++) {
		currentCepgpBuild[i].prio = currentCepgpBuild[i].epa / currentCepgpBuild[i].gpa;
	}

	return currentCepgpBuild;
};