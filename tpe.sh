#!bin/sh
MONGO_URI="mongodb://127.0.0.1:27017"
path=`pwd | rev | cut -d '/' -f 1 | rev`
if [ "$path" == "joinstu-backend" ]
then
    echo "You are in joinstu-backend!"
    chmod +x ./bin/www
    mongod --dbpath ./db & export NODE_ENV='dev' MONGO_URI="$MONGO_URI" && nodemon ./bin/www
else
    echo "$path"
    echo "Please cd to joinstu-backend!"
fi