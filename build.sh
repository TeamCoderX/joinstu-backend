build (){
    if [ -d "./dist/$1/" ]
    then
        rm -rf ./dist/$1/
    fi
    mkdir ./dist/$1/
    cd ../joinstu-$1-vue
    npm run build
    cd ../joinstu-backend
    cp -r ../joinstu-$1-vue/dist/* ./dist/$1/
}

if [ ! -d "./dist/" ]
then
    mkdir ./dist/
fi

if [ $# -ne 0  ]; then
    while [ $# != 0 ]
    do
        echo "Building $1 ..." # 將每個分別印出
        build $1
        shift
    done
fi