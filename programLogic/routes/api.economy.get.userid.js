const config = new require('../../config.json');
const statUtils = module.require('../../programLogic/statsUtils');

const catchAsync = fn => ((req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) routePromise.catch(err => next(err));
});

module.exports = function (app, bot, DBI) {
    app.get('/api/economy/get/:userid', catchAsync(async (req, res) => {
        if (!req.body || !req.body.token) return res.sendStatus(401);
        DBI.serverPrefs.findOne({ "config.economyAPI.key": req.body.token }, (err, sres) => {
            if (err) return;
            if (sres) {
                if (!sres.config.economyAPI.enabled) return res.sendStatus(401);
                DBI.stat.findOne({ id: req.params.userid }, (err, ures) => {
                    if (err) return;
                    if (ures) {
                        console.log(ures.serverPoints[sres.id])
                        console.log(sres.id)
                        if (ures.serverPoints[sres.id] == null || ures.serverPoints[sres.id] == undefined) return res.sendStatus(404);
                        res.set("Content-Type", "application/json");
                        res.send({ balance: ures.serverPoints[sres.id] });
                    } else {
                        res.sendStatus(404);
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    }));
}