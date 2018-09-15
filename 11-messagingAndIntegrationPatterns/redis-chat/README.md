Downloading and Setting up Redis
https://redis.io/topics/quickstart (reference)

curl http://download.redis.io/redis-stable.tar.gz -o redis-stable.tar.gz
tar xvzf redis-stable.tar.gz
cd redis-stable
make

make test

Inside the Redis distribution src folder
* redis-server is the Redis Server itself.
* redis-sentinel is the Redis Sentinel executable (monitoring and failover).
* redis-cli is the command line interface utility to talk with Redis.
* redis-benchmark is used to check Redis performances.
* redis-check-aof and redis-check-dump are useful in the rare event of corrupted data files.

sudo cp src/redis-server /usr/local/bin/
sudo cp src/redis-cli /usr/local/bin/

redis-server