const mqtt = require('mqtt')
const express = require ('express')

const client = mqtt.connect('tcp://iot.eclipse.org:1883')
app = express()

//expressserver
app.get('/MyHome', (req, res)=>{
    client.on('message', (topic, msg)=> {
        res.write(msg);
    });
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