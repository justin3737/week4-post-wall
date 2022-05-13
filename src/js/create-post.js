$on(qs('#sendPost'), 'click', function(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "user": "626fcf6f07f49d8b1a320fb0",
        "content": qs('#content').value
    });

    var options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("http://127.0.0.1:3000/posts", options)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch(error => console.log('error', error));

})