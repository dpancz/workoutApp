let ip;

getIPAddress();

function getIPAddress(){
    fetch('https://api.ipify.org/?format=json')
        .then(result => result.json())
        .then(data => {
            ip = data.ip;
        });
}