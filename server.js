const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");

function rps() {
  rand = Math.random();
  if (rand < 1 / 3) {
    return "rock";
  } else if (rand < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/otherpage") {
    fs.readFile("otherpage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/otherotherpage") {
    fs.readFile("otherotherpage.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/rockpaperscissors") {
    fs.readFile("rockpaperscissors.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  } else if (page == "/rps") {
    if ("choice" in params) {
      let serverChoice = rps();
      let roundResult;
      if (params["choice"] === "rock") {
        if (serverChoice === "rock") {
          roundResult = "tie";
        } else if (serverChoice === "paper") {
          roundResult = "loss";
        } else if (serverChoice === "scissors") {
          roundResult = "win";
        }
      }
      else if (params["choice"] === "paper") {
        if (serverChoice === "rock") {
          roundResult = "win";
        } else if (serverChoice === "paper") {
          roundResult = "tie";
        } else if (serverChoice === "scissors") {
          roundResult = "loss";
        }
      }
      else if (params["choice"] === "scissors") {
        if (serverChoice === "rock") {
          roundResult = "loss";
        } else if (serverChoice === "paper") {
          roundResult = "win";
        } else if (serverChoice === "scissors") {
          roundResult = "tie";
        }
      }
      const objToJson = {
        computerChoice: serverChoice,
        result: roundResult,
      };
      res.end(JSON.stringify(objToJson));
    }
  } else if (page == "/api") {
    if ("student" in params) {
      if (params["student"] == "leon") {
        console.log("Hello, I am alive");
        res.writeHead(200, { "Content-Type": "application/json" });
        let flipRes = Math.ceil(Math.random() * 2) === 1 ? "heads" : "tails";
        let rockPaperScissors = rps();
        console.log(rockPaperScissors);
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: "Baller",
          flip: flipRes,
          rpsResult: rockPaperScissors,
        };
        res.end(JSON.stringify(objToJson));
      } //student = leon
      else if (params["student"] != "leon") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          name: "unknown",
          status: "unknown",
          currentOccupation: "unknown",
        };
        res.end(JSON.stringify(objToJson));
      } //student != leon
    } //student if
  } //else if
  else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else if (page == "/js/rockpaperscissors.js") {
    fs.readFile("js/rockpaperscissors.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
