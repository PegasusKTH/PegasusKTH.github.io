
// var store;

// fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation')
// .then(res => res.json())
// .then(data => obj = data)
// .then(() => console.log(obj))



// async function getData(url){
//     const response = await fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation');
//     return response.json()
// }

// async function main() {
//     const data = await getData('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation');
//     console.log(data)
// }



let jsondata;
fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation').then(
    function(u){return u.json();}
).then(function(json){
    jsondata = json;

}


// function getData('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation') {
//     return fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation')
//     .then(response => response.json())
//     .then(result => result);
// }

// getData(url)
// .then(result => console.log(result));




