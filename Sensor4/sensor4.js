var mqtt = require('mqtt')
var client = mqtt.connect('tcp://iot.eclipse.org:1883')
var lastmotionFiuabState = ''
var lastOwnerState = 'away'

client.on('connect', function(){
    client.subscribe('/owner')
    client.subscribe('/motionFiuab')
    var count = 0

    var intervalObject = setInterval ( ()=>{
        count++
        if (count<50){
            client.publish('/motionFiuab', 'motion detected')
        }else{
            client.publish('/motionFiuab', 'no motion detected')
            if (count == 300){
                console.log('turning the lights off')
                client.publish('/lights', 'off')
                console.log('exiting')
                clearInterval(intervalObject)
            }
        }
    }, 1000)
})

client.on('message', function (topic, message){
    if (topic=='/motionFiuab'){
        lastmotionFiuabState = message.toString();
        console.log('motion: ', lastmotionFiuabState)
    }
    if (topic=='/owner'){
        lastOwnerState = message.toString()
        console.log('motion: ', lastOwnerState)
    }
    if ((lastmotionFiuabState=='motion detected')&&(lastOwnerState=='away')){
        client.publish('/warning', 'intruder detection')
        console.log('warning: intruder detection')
    }
})