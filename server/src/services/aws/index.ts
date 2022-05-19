import { auth, iot, mqtt } from 'aws-iot-device-sdk-v2';

type MessageDTO = {
  topic: string;
  message: string;
};

function buildConnection() {
  const config_builder =
    iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
      'src/services/aws/certs/1b966a6802524e52d3d1518a4083bbda6a5b0b905830df3875f2fef29de2bb08-certificate.pem.crt',
      'src/services/aws/certs/1b966a6802524e52d3d1518a4083bbda6a5b0b905830df3875f2fef29de2bb08-private.pem.key',
    );

  // iot.AwsIotMqttConnectionConfigBuilder.new_with_websockets({
  //   region: 'us-east-1',
  //   credentials_provider: auth.AwsCredentialsProvider.newDefault(),
  // });

  config_builder.with_certificate_authority_from_path(
    undefined,
    'src/services/aws/certs/AmazonRootCA1.pem',
  );

  config_builder.with_clean_session(false);
  config_builder.with_client_id('clock-punching-server');
  config_builder.with_endpoint(
    'a3n8lebe2giz1g-ats.iot.us-east-1.amazonaws.com',
  );
  const config = config_builder.build();

  const client = new mqtt.MqttClient();
  return client.new_connection(config);
}

const connection = buildConnection();

async function sendMessage({ message, topic }: MessageDTO) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      connection
        .publish(topic, JSON.stringify(message), mqtt.QoS.AtLeastOnce)
        .then(() => {
          resolve();
        });
    } catch (error) {
      reject(error);
    }
  });
}

export { sendMessage };
