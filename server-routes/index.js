const node = require('./node')
const pool = require('./pool')
const timer = require('./timer')

module.exports = (app) => {
    app.route('/api').get(function(req, res){
        res.send('Welcome to api')
    })

    app.use('/api/node', node);
    app.use('/api/pool', pool);
    app.use('/api/timer', timer);
}