import { iot, mqtt } from 'aws-iot-device-sdk-v2';

type MessageDTO = {
  topic: string;
  message: Record<string, string>;
};

function buildConnection() {
  const config_builder =
    iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder_from_path(
      'certs/1b966a6802524e52d3d1518a4083bbda6a5b0b905830df3875f2fef29de2bb08-certificate.pem.crt',
      'certs/1b966a6802524e52d3d1518a4083bbda6a5b0b905830df3875f2fef29de2bb08-private.pem.key',
    );

  config_builder.with_certificate_authority_from_path(
    undefined,
    'certs/AmazonRootCA1.pem',
  );
  config_builder.with_clean_session(false);
  config_builder.with_client_id('clock-punching-server');
  config_builder.with_endpoint(
    'a3n8lebe2giz1g-ats.iot.us-east-1.amazonaws.com',
  );
  const config = config_builder.build();

  const client = new mqtt.MqttClient();
  const connection = client.new_connection(config);
  connection.on('error', (error) => {
    console.error(error);
  });
  try {
    connection.connect();
  } catch (err) {
    console.error('Caught', err);
  }
  return connection;
}

const connection = buildConnection();

async function sendMessage({ message, topic }: MessageDTO) {
  return new Promise<void>(async (resolve, reject) => {
    try {
      async function publish() {
        connection
          .publish(topic, JSON.stringify(message), mqtt.QoS.AtLeastOnce)
          .then(() => {
            resolve();
          });
      }
      setTimeout(publish, 1000);
    } catch (error) {
      reject(error);
    }
  });
}

export { sendMessage };
