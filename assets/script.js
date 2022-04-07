let requestURL = 'https://api.hatchways.io/assessment/students';

/* 
When trying to get data from a third-party API, 

1. Make sure that data exists. (You can do so using curl in the terminal.)
2. JSONify that data, (turn it into a javascript object so that you can read it).
3. Console.log the data and use the data.

4. Follow the data types in the response.
5. Target specific information
6. Traverse (loop) over the array.

This is a great example of boiler plate code.


Curl is back-facing. It is not useful to us when trying to display information to the user via the browser. It is only useful to us
who interact with the terminal.
*/

function getAPI() {

    fetch(requestURL) // asynchronous call to fetch the resources at our requested url
        .then(function(response) { // .then is a callback function itself
            return response.json();
        })
        .then(function(data) {

            console.log(data)

            for(let i = 0; i < data['students'].length; i++){
                console.log(data['students'][i]['firstName']) 
            }

            console.log(data['students'].length)
           // console.log(data['students'][3]['firstName']) // It's formatted this way due to the order of the data types in the JSON'd response.
            //           ^       ^     ^     ^ 
        })
}

getAPI();
