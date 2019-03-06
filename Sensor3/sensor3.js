var mqtt = require('mqtt')
var client = mqtt.connect('tcp://iot.eclipse.org:1883')

client.on('connect', function(){
    var count = 0
    var intervalObject = setInterval ( ()=>{
        count++
        t = Math.floor(Math.random()*30 + 50)
        console.log(t)
        client.publish('/temperature', ''+t)
        if ((t<60)||(t>90)){
            console.log('extreme temperatures')
            client.publish('/warning', 'extreme temperatures')
        }
        if (count == 500){
            console.log('exiting')
            clearInterval(intervalObject)
        }
    }, 2000)
})