import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import java.net.*;

/*
 * Classname Sensor 2
 * 
 * Description Responsible for turning the lights on/off and sending out the status
 * 
 * Version information v1
 *
 * Date March 3rd, 2019
 */

//sensor of presence
public class Sensor2 {

    //atributes
    public static final String BROKER_URL = "tcp://iot.eclipse.org:1883";
    private MqttClient client;
    String topicLights = "/lights";
    String topicLightsStatus = "/lights status";

    //constructor
    //setting up the client
    public Sensor2(){
        String clientId = getMacAddress() + "-pub";
        System.out.println("Client ID="+clientId);
        try{
            client = new MqttClient(BROKER_URL, clientId);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setCleanSession(true);
            final MqttTopic lightsTopic = client.getTopic(topicLights);
            final MqttTopic lightsStatusTopic = client.getTopic(topicLightsStatus);
            options.setWill(lightsTopic, "I'm gone".getBytes(), 2, true);
            options.setWill(lightsStatusTopic, "I'm gone".getBytes(), 2, true);
            client.connect();
        }catch (MqttException e){
            e.printStackTrace();
            System.exit(1);
        }
    }

    public void startPublishing() throws MqttException{
        try{
            for(int i=0;i<10;i++){
                publishLights("on");
                publishLightsStatus("on");
            }
            Thread.sleep(2000);
            for(int i=0; i<10;i++){
                publishLights("off");
                publishLightsStatus("off");
            }
            client.disconnect();
        }catch(Exception e){e.printStackTrace();}
    }

    public void publishLights(String situation) throws MqttException{
        MqttMessage message = new MqttMessage(situation.getBytes());
        client.publish(topicLights, message);
        System.out.println(message);
    }

    public void publishLightsStatus(String situation) throws MqttException{
        MqttMessage message = new MqttMessage(situation.getBytes());
        client.publish(topicLights, message);
        System.out.println("Status: " + message);
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
            new Sensor2().startPublishing();
        } catch(MqttException e) {System.out.println(e);}
    }
}