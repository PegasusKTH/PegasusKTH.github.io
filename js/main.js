fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation')
.then(res => res.json())
.then(json => console.log(json));


/*let url = 'https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation';
let response = await fetch(url);

let commits = await response.json();

console.log(commits);*/