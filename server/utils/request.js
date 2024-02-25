const isSecureHost = (host) => {
    console.log(host)
    return (
        host == "manometalica.in"
    );
};


module.exports = { isSecureHost }