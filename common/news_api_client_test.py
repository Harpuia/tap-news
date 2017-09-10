import news_api_client as client

# Todo: add tests to handle 404/ url errors, etc.
def test_basic():
    news = client.getNewsFromSource()
    print news
    assert len(news) > 0
    news = client.getNewsFromSource(sources=['bbc-news'])
    assert len(news) > 0
    print 'test_basic passed!'

if __name__ == "__main__" :
    test_basic()
