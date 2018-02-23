const fetch = require('node-fetch');

fetch('https://api.blockcypher.com/v1/eth/main')
    .then(res => res.json())
    .then(json => console.log(json));
    //.catch(err => console.error(err));

    var my_json = res.json()
    //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
    var filtered_json = find_in_object(JSON.parse(my_json), {hash});
    console.log(filtered_json);
