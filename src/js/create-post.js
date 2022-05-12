$on(qs('#sendPost'), 'click', function(){
    const contentVal = qs('#content').value;
    console.log(contentVal)
    return;
    var url = 'https://example.com/profile';
    var data = {username: 'example'};

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
})