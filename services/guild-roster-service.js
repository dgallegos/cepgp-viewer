var guildRoster;

module.exports = GuildRosterService;
function GuildRosterService() {
}

GuildRosterService.UpdateGuildRoster = function(guildRosterData) {
	guildRoster = this.parseGuildRosterData(guildRosterData);

  return;
};

GuildRosterService.parseGuildRosterData = function(guildRosterData) {
	var guildRoster = [];
	var guildRosterArray = guildRosterData.split('\n');
	// Rebuild using named keys
	for (var i = 0; i < guildRosterArray.length; i++) {
		var character = {};
		var guildRosterItemArray= guildRosterArray[i].split(';');
		character.name = guildRosterItemArray["0"];
		character.rank = guildRosterItemArray["1"];
		character.level = guildRosterItemArray["2"];
		character.class = guildRosterItemArray["2"];

		guildRoster.push(character);
	}
	return guildRoster;
};

GuildRosterService.GetGuildRoster = function() {
	return guildRoster;
};

GuildRosterService.IsCharacterInGuild = function(name) {
	var character = guildRoster.filter(function(character){ return character.name === name });
	return (character.length > 0);
}
