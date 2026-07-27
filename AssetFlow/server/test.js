const dns = require("dns");
dns.resolveSrv("_mongodb._tcp.cluster0.uudzqk1.mongodb.net", (err, addresses) => {
    if (err) {
        console.error("DNS Error:");
        console.error(err);
    } else {
        console.log("Success!");
        console.log(addresses);
    }
});