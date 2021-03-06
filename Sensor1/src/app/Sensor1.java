package app;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import java.net.*;

/*
 * Classname
 * 
 * Version information
 *
 * Date
 */

//sensor of presence
public class Sensor1 {

    //atributes
    public static final String BROKER_URL = "tcp://iot.eclipse.org:1883";
    private MqttClient client;
    String topic = "owner";

    //constructor
    //setting up the client
    public Sensor1(){
        String clientId = getMacAddress() + "-pub";
        System.out.println("Client ID="+clientId);
        try{
            client = new MqttClient(BROKER_URL, clientId);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            final MqttTopic temperatureTopic = client.getTopic(topic);
            options.setWill(temperatureTopic, "I'm gone".getBytes(), 2, true);
            client.connect();
        }catch (MqttException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void startPublishing() throws MqttException{
        try{
            for(int i=0;i<10;i++)
            publishOwnerPresence("away");
            Thread.sleep(2000);
            for(int i=0; i<10;i++)
                publishOwnerPresence("home");
            client.disconnect();
        }catch(Exception e){e.printStackTrace();}
    }

    public void publishOwnerPresence(String situation) throws MqttException{
        MqttMessage message = new MqttMessage(situation.getBytes());
        client.publish(topic, message);
        System.out.println("Publishing"+message);
    }

    public byte[] getMacAddress(){
        byte[] mac=new byte[6];
        try{
            InetAddress address = InetAddress.getLocalHost();
            NetworkInterface nwi = NetworkInterface.getByInetAddress(address);
            mac = nwi.getHardwareAddress();
            System.out.println(mac);
        }catch(Exception e) {System.out.println(e);}
        return mac;
    }

    public static void main(String[] args) throws Exception {
        try{
            System.out.println("MQTT Broker: " + BROKER_URL);
            new Sensor1().startPublishing();
        } catch(MqttException e) {System.out.println(e);}
    }
}