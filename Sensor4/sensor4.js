var mqtt = require('mqtt')
var client = mqtt.connect('tcp://iot.eclipse.org:1883')

client.on('connect', function(){
    client.subscribe('/owner')
    client.subscribe('/motion')
    var count1 = 0
    var count2 = 0
    var lastMotionState = ''
    var lastOwnerState = 'away'

    var intervalObject = setInterval ( ()=>{
        count1++
        client.publish('/motion', 'motion detected')
        console.log('motion detected')
        if (count1 == 20){
            console.log('exiting')
            clearInterval(intervalObject)
        }
    }, 1000)

    var intervalObject = setInterval ( ()=>{
        count2++
        client.publish('/motion', 'motion detected')
        console.log('motion detected')
        if (count2 == 300){
            console.log('turning the lights off')
            client.publish('/lights', 'off')
            console.log('exiting')
            clearInterval(intervalObject)
        }
    }, 1000)
})

client.on('message', function (topic, message){
    if (topic=='/motion'){
        lastMotionState = message.toString();
        console.log('motion: ', lastMotionState)
    }
    if (topic=='/owner'){
        lastOwnerState = message.toString()
        console.log('motion: ', lastOwnerState)
    }
    if ((lastMotionState=='motion detected')&&(lastOwnerState=='away')){
        client.publish('warning', 'intruder detection')
        console.log('warning: intruder detection')
    }
})