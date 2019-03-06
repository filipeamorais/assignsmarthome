const mqtt = require('mqtt')
const express = require ('express')

const client = mqtt.connect('tcp://iot.eclipse.org:1883')
app = express()

//expressserver
app.get('/MyHome', (req, res)=>{
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var timer = setInterval(()=> {
        res.write('\n')
        res.write('#');
    }, 1000);

    client.on('message', (topic, msg)=> {
        res.write('\n')
        res.write(msg);
    });
})

app.get('/Temperature', (req, res)=>{
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var timer = setInterval(()=> {
        res.write('\n')
        res.write('#');
    }, 1000);

    client.on('message', (topic, msg)=> {
        if (topic=='/temperature'){ 
            res.write('\n')
            res.write(msg);
        }
    });
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
    client.subscribe('/motionFiuab')
})