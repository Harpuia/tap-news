import pika
import json

class CloudAMQPClient:
    # wrap client use class. one url links to one instance and many queues, thus we also need to specify the queue name
    def __init__(self, cloud_amqp_url, queue_name):
        # queue name could be different, thus we use class, not singleton
        # if a queue already exists on CloudAMQP instance, no action will be fired
        # when re-declare it, so there won't be duplicate queue
        self.cloud_amqp_url = cloud_amqp_url
        self.queue_name = queue_name
        self.params = pika.URLParameters(cloud_amqp_url)
        self.params.socket_timeout = 3
        self.connection = pika.BlockingConnection(self.params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue = queue_name)

    # send a message
    def sendMessage(self, message):
        # use no exchange and direct without binding
        self.channel.basic_publish(exchange='',
                                   routing_key=self.queue_name,
                                   # turn json into string
                                   body=json.dumps(message))
        print "[X] Sent message to %s: %s" % (self.queue_name, message)
        return

    # get message
    def getMessage(self):
        method_frame, header_frame, body = self.channel.basic_get(self.queue_name)
        # if method_frame, means method is send and message was get successfully , network is fine
        if method_frame is not None:
            print "[O] Received message from %s: %s" % (self.queue_name, body)
            # send acknowledgement to server to tell it message was received
            # so server could delete message to avoid duplicate
            # use delivery_tag for identification, could avoid fake ack
            self.channel.basic_ack(method_frame.delivery_tag)
            # load body as dictionary
            return json.loads(body)
        else:
            print "No message returned"
            return None

    # sleep, this program should not always be running, it will be a burden for our server
    # and we might be blocked by other websites
    def sleep(self, seconds):
        self.connection.sleep(seconds)