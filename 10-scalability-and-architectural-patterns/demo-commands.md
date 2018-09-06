node app.js
ab -c200 -t10 http://localhost:8080/

node clusteredApp.js
ab -c200 -t10 http://localhost:8080/

node resilientCrashingApp.js
siege -c200 -t10s http://localhost:8080/

pm2 start app.js -i 0
pm2 describe 0
pm2 list
pm2 monit
pm2 stop all
pm2 delete all

npm i babel-core
node es2017app.js
npm build
node build/es2017app.js
