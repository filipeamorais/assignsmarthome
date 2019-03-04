var mqtt = require('mqtt')
var client = mqtt.connect('tcp://iot.eclipse.org:1883')
client.on('connect', function(){
    var count = 0
    var intervalObject = setInterval ( ()=>{
        count++
        t = Math.floor(Math.random()*30 + 50)
        console.log(t)
        client.publish('temperature', ''+t)
        if (count ==100){
            console.log('exiting')
            clearInterval(intervalObject)
        }
    }, 2000)
})