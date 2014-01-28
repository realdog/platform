var redis = require('redis');
var crypto = require('crypto');
var fs = require('fs');

exports.participate = function(req, res){
    if (req.params.gid && req.params.bkey && req.params.msgkey ) {
        var pem = fs.readFileSync('/users/olddog/key/server.key');
        var key = pem.toString('ascii');
        var decrypted = "";
        var decipher = crypto.createDecipher('blowfish', key);
        decrypted = decipher.update(req.params.msgkey, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        console.log(JSON.parse(decrypted.toString()));
        var password = getUserPasswordByUid();
        if (password = decrypted.password) {
            var template = getGameByGid();
            ejs.render(template, decrypted.param);
            ejs.display();
        } else {
            
        }
    }

    console.log(req.body);
    res.json(200, req.body);
};