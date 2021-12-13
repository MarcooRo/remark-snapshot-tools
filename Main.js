const http = require('http');
const fs = require('fs');
var axios = require('axios');
const url = require('url');
const util = require('util');
const alasql = require('alasql');
const querystring = require('querystring');
const { exec } = require('child_process');
const port = 3000;
const  { ApiPromise } = require('@polkadot/api');
const WsProvider = require('@polkadot/api')
const hexToString = require('@polkadot/util')

function requestDb(req, body,res) {

    axios.get('https://gateway.pinata.cloud/ipns/precon-lite.rmrk.link')
    .then(async response => {
     let jsonObj = JSON.parse(JSON.stringify(response.data));
     let userInput = body.nftId;
        if(typeof userInput != undefined && userInput != ""){
        await saveFile(userInput, jsonObj);
        var query = url.parse(req.url, true).query;
            fs.readFile(`./excellDocuments/Remark-snapshot-wallet_${userInput}.xlsx`, function (err, content) {
                if (err) {
                    res.writeHead(400, {'Content-type':'text/html'})
                    console.log(err);
                    res.end("No such file");    
                } else {
                    res.setHeader('Content-disposition', 'attachment; filename='+`Remark-snapshot-wallet_${userInput}.xlsx`);
                    res.end(content);
                }
            });
        }
     
    })
    .catch(err => {
        console.log(err)
    });
}

const server = http.createServer(function(req, res) {
    let body = "";
    req.on('data', chunk => {
        body += chunk.toString();
    });
    if(req.method.toLocaleLowerCase() == 'post') {
        req.on('end', () => {
        body = querystring.parse(body);
        requestDb(req, body, res)
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


async function saveFile (collectionId, jsonObj) {
    const provider = new WsProvider.WsProvider('wss://kusama-rpc.polkadot.io/');
    const api = await ApiPromise.create({ provider });
    var sheet_1_data = [{NFT_ID:0, OWNER_ID:0, PRICE:0, BLOCK:0, DATA:0}];
    for(var i in jsonObj.nfts) {
        if(i.includes(collectionId)) {

            for(var index in jsonObj.nfts[`${i}`].changes){

                var opType0 = jsonObj.nfts[`${i}`].changes[`${index}`].opType;
                console.log('opType0: '+opType0);
                var opTypeX =jsonObj.nfts[`${i}`].changes[`${index++}`].opType;

                if(opTypeX === undefined){
                    var opType1 = 'LIST';
                    console.log('opType1 f: '+opType1); 
                } else {
                    var opType1 = opTypeX;
                    console.log('opType1 t: '+opType1);
                }

                if(opType0 == 'LIST' && opType1 == 'BUY'){
                    var price = jsonObj.nfts[`${i}`].changes[`${index}`].new;
                    var block = jsonObj.nfts[`${i}`].changes[`${index++}`].block;
                   break;
                } else {
                    var price = 0;
                    var block = jsonObj.nfts[`${i}`].changes['0'].block; // block genesis
                }
            }

            price = (price/1000000000000)/0.95
            price = Number(price)
            price = price.toFixed(2)
            price = Number(price)
            if(isNaN(price))price = 0;
            const blockHash = await api.rpc.chain.getBlockHash(block);
            const signedBlock = await api.rpc.chain.getBlock(blockHash);
            var date = signedBlock.block.extrinsics[0].args[0].toString();
            var d = new Date(Math.floor(date)); // The 0 there is the key, which sets the date to the epoch
            sheet_1_data.push({NFT_ID:i, OWNER_ID:jsonObj.nfts[`${i}`].owner, PRICE:price, BLOCK:block, DATA:d.toLocaleString()});
        }
    }
    var opts = [{sheetid:'NFT_ID',header:true},{sheetid:'OWNER_ID',header:false},{sheetid:'PRICE',header:false},{sheetid:'BLOCK',header:false}, {sheetid:'DATA',header:false}];
    var result = alasql(`SELECT * INTO XLSX("./excellDocuments/Remark-snapshot-wallet_${collectionId}.xlsx",?) FROM ?`, [opts,[sheet_1_data]]);
    exec("rm -rf ./excellDocuments/*.xlsx");
}