# joinstu-backend
## .gitignore Example
``` .gitignore
SSL_KEY='/path/to/private.key'
SSL_CRT='/path/to/certificate.crt'
MONGO_URI='mongodb+srv://joinstu_server:0000/test'
OAUTH_CLIENT_ID='XXXXX.apps.googleusercontent.com'
OAUTH_CLIENT_SECRET='YOUR_SECRET'
OAUTH_CALLBACK='https://joinstu-ec48u.ondigitalocean.app/api/auth/google/callback'
OAUTH_CALLBACK_DEV='https://127.0.0.1/api/auth/google/callback'
```
https://github.com/TeamCoderX/joinstu-index-vue

https://github.com/TeamCoderX/joinstu-admin-vue

https://github.com/TeamCoderX/joinstu-backend

**.env for prod**
```
MONGO_URI='mongodb+srv://joinstu_server:LnEkBTjWqD0OcnZS@cluster0.u240pmw.mongodb.net/test'
OAUTH_CLIENT_ID='963371699123-9es2ofihc2lod0lhnim7sno4efsnipmq.apps.googleusercontent.com'
OAUTH_CLIENT_SECRET='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'
OAUTH_CALLBACK='https://joinstu-ec48u.ondigitalocean.app/api/auth/google/callback'
```
**.env for dev**
```
SSL_KEY='ssl/private.key'
SSL_CRT='ssl/certificate.crt'
MONGO_URI='mongodb+srv://joinstu_server:LnEkBTjWqD0OcnZS@cluster0.u240pmw.mongodb.net/test'
OAUTH_CLIENT_ID='963371699123-9es2ofihc2lod0lhnim7sno4efsnipmq.apps.googleusercontent.com'
OAUTH_CLIENT_SECRET='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'
OAUTH_CALLBACK='https://joinstu-ec48u.ondigitalocean.app/api/auth/google/callback'
OAUTH_CALLBACK_DEV='https://127.0.0.1/api/auth/google/callback'
```

## 初始化開發環境：
1. 在同一個資料夾把上面三個repo clone下來
2. `cd joinstu-backend`
3. 建立一個文字檔`.env`，內容為上述**.env for dev**
4. 執行初始化指令`npm run init`
5. `npm run start`即可開始

## 所有`npm run `指令：
`init`：初始化

`start-ssl`：運行後端（啟用ssl，需要在.env指定前兩行ssl憑證檔案）

`start`：運行後端（無ssl，.env可忽略前兩行）

`prod`：正式運行（用於託管）

（以下指令須照上述初始化步驟方可使用）

`dev-admin`：前端admin預覽

`dev-index`：前端index預覽

`build-admin`：產生admin靜態頁面

`build-index`：產生index靜態頁面
