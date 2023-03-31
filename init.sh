# bin/sh
# initialize for joinstu-dev-env
# npm install
cd ..
git clone git@github.com:TeamCoderX/joinstu-index-vue.git
git clone git@github.com:TeamCoderX/joinstu-admin-vue.git
cd ../joinstu-index-vue
npm install
cd ../joinstu-admin-vue
npm install
echo modules install complete!
cd ../joinstu-backend
echo "\n"
echo "Please input your MongoDB URI:"
read MONGO_URI
echo creating .env file
touch .env
echo MONGO_URI="$MONGO_URI" >> .env
echo OAUTH_CALLBACK_DEV="https://127.0.0.1/api/auth/google/callback" >> .env
echo initialize complete!
echo building...
bash ./build.sh index admin