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

                //picture
                let photo = document.createElement('img');
                photo.setAttribute (
                    "src",
                    data['students'][i]['pic']
                );
                //name
                let fullName = document.createElement('h3');
                fullName.textContent = data['students'][i]['firstName'] + " " + data['students'][i]['lastName'];
                //email
                let email = document.createElement('p');
                email.textContent = data['students'][i]['email'];
                //company
                let company = document.createElement('p');
                company.textContent = data['students'][i]['company'];
                //skill
                let skill = document.createElement('p');
                skill.textContent = data['students'][i]['skill'];


                //average

                /* 
                function findAverage(grades) {
                let total = 0;
                for(let i = 0; i < grades.length; i++) {
                total += grades;
                }
                let average = total / grades.length;
                console.log(average);
                }

                findAverage(data['students'][i]['grades'])
                */
                
                body.appendChild(photo)
                body.appendChild(fullName)
                body.appendChild(email)
                body.appendChild(company)
                body.appendChild(skill)
    
            }

            console.log(data['students'].length)
           // console.log(data['students'][3]['firstName']) // It's formatted this way due to the order of the data types in the JSON'd response.
            //           ^       ^     ^     ^ 
        })
}

getAPI();
