const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  if (mongodb.readyState === mongodb.ReadyStates.connected) {
    res.status(200).send({
      status: 'OK'
    })
  } else {
    res.status(503).send({
      status: 'UNAVAILABLE',
      readyState: mongodb.readyState
    })
  }
}
