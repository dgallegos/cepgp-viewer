var express = require('express');
var router = express.Router();
var CepgpService = require('../services/cepgp-service');
var GuildRosterService = require('../services/guild-roster-service');

/* POST upload listing. */
router.post('/', function(req, res, next) {
  // Check Password
  if (!(req.body.uploadPass && (req.body.uploadPass === "changeme"))) {
    return res.status(401).send('Bad Password');
  }
  
  if(req.body.guildRoster) {
    GuildRosterService.UpdateGuildRoster(req.body.guildRoster);
  }

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadFile = req.files.cepgplua;
  CepgpService.Upload(uploadFile);

  // Return a response to client.
  return res.json({ status: "ok" });
});

router.get('/traffic', function(req, res, next) {
  const cepgpTraffic =  CepgpService.GetTraffic();

  // Return a response to client.
  return res.json(cepgpTraffic);
});

router.get('/current', function(req, res, next) {
  const currentCepgp =  CepgpService.GetCurrentCepgp();

  // Return a response to client.
  return res.json(currentCepgp);
});

module.exports = router;
