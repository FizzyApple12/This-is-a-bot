const config = new require('../../config.json');
const messageUtils = module.require('../../messageUtils.js');

const catchAsync = fn => ((req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) routePromise.catch(err => next(err));
});

module.exports = function (app, bot, DBI) {
    app.post('/api/economy/subtract/:userid', catchAsync(async (req, res) => {
        if (!req.body || !req.body.token) return res.sendStatus(401);
        if (req.body.modification == null || req.body.modification == undefined || isNaN(req.body.modification) || req.body.modification < 0) return res.sendStatus(400);
        DBI.serverPrefs.findOne({ "config.economyAPI.key": req.body.token }, (err, sres) => {
            if (err) return;
            if (sres) {
                if (!sres.config.economyAPI.enabled) return res.sendStatus(401);
                var incFunc = {};
                incFunc[`serverPoints.${sres.id}`] = -req.body.modification;
                DBI.stat.updateOne({ id: req.params.userid }, { $inc: incFunc }, (err, ures) => {
                    if (err) return;
                    if (ures) {
                        res.sendStatus(200);
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