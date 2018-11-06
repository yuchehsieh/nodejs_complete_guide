const fs = require('fs');

const requestHandler = (req, res) => {
  const { url, method } = req;
  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title><head>');
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    const body = [];
    req.on('data', chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const message = parseBody.split('=')[1];
      fs.writeFile('message.txt', 'message =' + message, err => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
      // writeFileSync 會等到這行執行完畢後（建完檔案）才執行下面的 code，不好的作法！
      // third parameter is a callback function, once the writeFile done,
      // the following logic will get exected. EX: send the response
    });
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title><head>');
  res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
  res.write('</html>');
  res.end();
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some hard coded text';
// 輸出的內容跟第二個相同

exports.handler = requestHandler;
exports.someText = 'Some hard coded text';
// node.js 提供的簡寫
// 輸出的內容跟第二個及第三個相同
