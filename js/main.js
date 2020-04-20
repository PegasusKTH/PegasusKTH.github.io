fetch('https://api.kth.se/api/kopps/v2/course/DD1321/detailedinformation')
.then(response => response.json())
.then(data => {
  console.log(data) // Prints result from response.json() in getRequest
})
.catch(error => console.error(error))