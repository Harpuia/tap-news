from cloudAMQP_client import CloudAMQPClient

CLOUDAMQP_URL = "amqp://hoamejlv:tlr-stbY0WU6WCR9rgEfEdzFuANiRj0K@donkey.rmq.cloudamqp.com/hoamejlv"

TEST_QUEUE_NAME = 'test'

def test_basic():
    client = CloudAMQPClient(CLOUDAMQP_URL, TEST_QUEUE_NAME)
    # send and receive a message

    sentMsg = {'test':'demo'}
    client.sendMessage(sentMsg)
    client.sleep(10)
    receivedMsg = client.getMessage()
    assert sentMsg == receivedMsg
    print 'test_basic passed!'

if __name__=="__main__":
    test_basic()