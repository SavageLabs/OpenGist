var cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const database = require("./database/DatabaseConnection")

if(cluster.isMaster) {
   // Fork workers.
   for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
}

cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
});

} else {
    const express = require('express');
    const bodyParser = require('body-parser');

    const path = require('path');
    const app = express();
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, 'build')));
    
    database.startDatabase("database", 27017, "opengist", (err, dbApi) => {
        if(err) {
            return;
        }
        app.get("/api/fetch/:id", (request, response) => {
            const { id } = request.params;
            dbApi.getPaste(id).then(paste => {
                response.json({success: true, paste});
            }).catch(err => {
                response.json({success: false, message: "not found"});

            })
        })
        app.post("/api/add", (request, response) => {
          const { language, content } = request.body;
          dbApi.addPaste(language, content).then(id => {
              response.json({success: true, id})
          }).catch(err => {
            response.json({success:false , messsage: "err"})
          })
        })
    
        app.get('/*', (req, res) => {
            res.sendFile(path.join(`${__dirname}/build/index.html`));
          })
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            
            console.log('App is listening on port ' + port);
        });
        
    })


}
