const fetch = require('node-fetch');
const config = new require('../../config.json');

const catchAsync = fn => ((req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) routePromise.catch(err => next(err));
});

module.exports = function (app, bot, DBI) {
    app.get('/userdata/servers', catchAsync(async (req, res) => {
        if (!req.headers || !req.headers.sessionid) {
            res.sendStatus(404);
            return
        }
    
        DBI.webPanelUsers.findOne({ "token.sessionid": req.headers.sessionid } , async (err, dres) => {
            if (err) {
                res.sendStatus(404);
                return;
            }
            if (dres) {
                const userRes = await fetch(`http://discordapp.com/api/users/@me`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${dres.token.token}`,
                        },
                    });
                var userResJson = await userRes.json();
                const serverRes = await fetch(`http://discordapp.com/api/users/@me/guilds`,
                    {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${dres.token.token}`,
                        },
                    });
                var serverResJson = await serverRes.json();
                var finalJson = [];
                serverResJson.forEach(server => {
                    if (bot.guilds.get(server.id) && (userResJson.id == config.ownerID || server.owner)) {
                        finalJson.push(server);
                    }
                });
                if (finalJson.code != undefined && finalJson.code == 0) {
                    res.sendStatus(404);
                } else {
                    res.set("Content-Type", "application/json");
                    res.send(finalJson);
                }
            } else {
                res.sendStatus(404);
            }
        });
    }));
}