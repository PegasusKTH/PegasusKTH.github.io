

var string = ' ';
const request = async() => {
    const json = await fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation').then(response => response.json());
    console.log(json)

}

string = JSON.stringify(request());



// var out = '';
// console.log(out);
// fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation')
// .then(response => response.json())
// .then(data => {
// console.log(data);
// })
// .catch(error => console.error(error))
// out = data;
// console.log(data);
