// // var http=require("http")
// // var fs=require("fs")
// // const port=3000

// // const server=createServer(function(req,res){
// //     res.writeHead(200, {'Content-Type':'text/html'})
// //     fs.readFile('index.html', function(error, data){
// //         if(error){
// //             res.writeHead(404)
// //             res.write('Error: File Not Found')
// //         }else{
// //             res.write(data)
// //         }
// //         res.end()
// //     })
// // })

// // server.listen(port, function(error){
// //     if (error){
// //         console.log('something went wrong', error)
// //     }else{
// //         console.log('server is listening on port '+port)
// //     }
// // })
// var express=require('express')
// var app=express()
// var http = require("http");
// var fs=require("fs")

// app.use(express.static(__dirname+'public'))

// var server = http.createServer(function(request, res) {
//   res.writeHead(200, {"Content-Type": "text/html"});
//  fs.readFile('index.html', function(error, data){
//     if(error){
//         res.writeHead(404)
//         res.write('Error: File Not Found')
//     }else{
//         res.write(data)
//     }
//   res.end();
// })
// });

// server.listen(3000);
// console.log("Server is listening");



const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
// you can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 9000;

// maps file extention to MIME types
const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'appliaction/vnd.ms-fontobject',
  '.ttf': 'aplication/font-sfnt'
};

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);

  // extract URL path
  // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
  // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
  // by limiting the path to current directory only
  const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
  let pathname = path.join(__dirname, sanitizePath);

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // if is a directory, then look for index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // based on the URL path, extract the file extention. e.g. .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
