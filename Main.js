const jsonObj = require('./data.json');
const http = require('http');
const fs = require('fs');
const url = require('url');
const util = require('util');
const alasql = require('alasql');
const querystring = require('querystring');
const { exec } = require('child_process');
const port = 3000;


const server = http.createServer(function(req, res) {
    let body = "";
    req.on('data', chunk => {
        body += chunk.toString();
    });
    

    if(req.method.toLocaleLowerCase() == 'post') {
        //exec("curl https://gateway.pinata.cloud/ipns/precon-lite.rmrk.link > data.json")
        req.on('end', () => {
        body = querystring.parse(body);
        let userInput = body.nftId;
        if(typeof userInput != undefined && userInput != ""){
        saveFile(userInput);
        var query = url.parse(req.url, true).query;
            //read the image using fs and send the image content back in the response
            fs.readFile(`./excellDocuments/Remark-snapshot-wallet_${userInput}.xlsx`, function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end("No such file");    
                } else {
                    //specify Content will be an attachment
                    res.setHeader('Content-disposition', 'attachment; filename='+`Remark-snapshot-wallet_${userInput}.xlsx`);
                    res.end(content);
                }
            });
        }
    });
    }else{
        res.writeHead(200, {'ContentType': 'text/html'})
        fs.readFile('index.html', function(error, data){
            if(error){
                res.writeHead(404);
                res.write("error");
            }else {
                res.write(data)
            }
            res.end()
        })
    }
    
})

server.listen(port, function(error) {
    if(error){
        console.log(error);
    }
})


function saveFile (collectionId) {
    var sheet_1_data = [{NFT_ID:0, OWNER_ID:0, PRICE:0, BLOCK:0}];
    for(var i in jsonObj.nfts) {
        //console.log(i)
        //console.log(collectionId)
        if(i.includes(collectionId)){
            //console.log(jsonObj.nfts[`${i}`].changes['0'].new);
            var price = jsonObj.nfts[`${i}`].changes['0'].new;
            if(isNaN(price)){
                price = 0;
            }
            var block = jsonObj.nfts[`${i}`].changes['0'].block;
            sheet_1_data.push({NFT_ID:i, OWNER_ID:jsonObj.nfts[`${i}`].owner, PRICE:price, BLOCK:block});
        }
    }
    var opts = [{sheetid:'NFT_ID',header:true},{sheetid:'OWNER_ID',header:false},{sheetid:'PRICE',header:false},{sheetid:'BLOCK',header:false}];
    var result = alasql(`SELECT * INTO XLSX("./excellDocuments/Remark-snapshot-wallet_${collectionId}.xlsx",?) FROM ?`, [opts,[sheet_1_data]]);
    exec("rm -rf ./excellDocuments/*.xlsx");
}