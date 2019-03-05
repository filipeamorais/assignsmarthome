const mqtt = require('mqtt')
const express = require ('express')

const client = mqtt.connect('tcp://iot.eclipse.org:1883')
app = express()

//expressserver
app.get('/MyHome', (req, res)=>{
    //res.write('oi')
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    res.write('\n')
    var timer = setInterval(()=> {
        res.write('#');
    }, 1000);

    // req.on("close", ()=> {
    //     clearTimeout(timer);
    //     client.end();
    // });
    // client.on('message', (topic, msg)=> {
    //     res.write('oi2')
    //     res.end('Coffee Maker not connected')
    // });
    //res.end('Coffee Maker not connected')
})

app.get('/Temperature', (req, res)=>{
    if (topic=='/temperature'){ 
        client.on('message', (topic, msg)=> {
            res.write(msg);
        })
    }
})

app.listen(3000, function(){
    console.log("App listening on port 3000")
})

//mqttclient
client.on('connect', ()=>{
    console.log('Client connected')
    client.subscribe('/owner')
    client.subscribe('/lights')
    client.subscribe('/ligths status')
    client.subscribe('/temperature')
    client.subscribe('/warning')
    client.subscribe('/motion')
})