let requestURL = 'https://api.hatchways.io/assessment/students';

//search bar
let searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.className = 'searchBar';
searchBar.placeholder = "Search for names..."
// searchBar.onkeypress = searchNames();

body.appendChild(searchBar);

function getAPI() {

    // performing fetch request and translating into json object:
    fetch(requestURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            // to view data response from fetch:
            console.log(data)

            for(let i = 0; i < data['students'].length; i++) {
   
                // for flexbox div structure:
                let parentDiv = document.createElement('div');
                parentDiv.setAttribute('id', 'parentDiv');
                let photoDiv = document.createElement('div');
                photoDiv.setAttribute('id', 'photoDiv');
                let userInfoDiv = document.createElement('div');
                userInfoDiv.setAttribute('id', 'userInfoDiv');
                let nameDiv = document.createElement('div');
                nameDiv.setAttribute('id', 'nameDiv');
                let detailsDiv = document.createElement('div');
                detailsDiv.setAttribute('id', 'detailsDiv');

                // appending children divs to parent divs:
                body.appendChild(parentDiv);
                parentDiv.appendChild(photoDiv);
                parentDiv.appendChild(userInfoDiv);
                userInfoDiv.appendChild(nameDiv);
                userInfoDiv.appendChild(detailsDiv);

                // picture element:
                let photo = document.createElement('img');
                photo.setAttribute('class', 'photo');
                photo.setAttribute (
                    "src",
                    data['students'][i]['pic']
                );
                // name element:
                let fullName = document.createElement('h3');
                fullName.setAttribute('class', 'fullName');
                fullName.textContent = data['students'][i]['firstName'].toUpperCase() + " " + data['students'][i]['lastName'].toUpperCase();
                // email element:
                let email = document.createElement('p');
                email.setAttribute('class', 'details');
                email.textContent = "Email: " + data['students'][i]['email'];
                // company element:
                let company = document.createElement('p');
                company.setAttribute('class', 'details');
                company.textContent = "Company: " + data['students'][i]['company'];
                // skill element:
                let skill = document.createElement('p');
                skill.setAttribute('class', 'details');
                skill.textContent = "Skill: " + data['students'][i]['skill'];

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
                
                // appending children elements to parent divs:
                photoDiv.appendChild(photo);
                nameDiv.appendChild(fullName);
                detailsDiv.appendChild(email);
                detailsDiv.appendChild(company);
                detailsDiv.appendChild(skill);
            }

        })
}
getAPI();

// function searchNames() {

//     // Declare variables
//     let txtValue;
//     let readInput = searchBar.value.toUpperCase().toString();
//     console.log(readInput)

//   //  Loop through all names, and hide those who don't match the search query

//     for(let i = 0; i < fullName.length; i++){
//         textValue = fullName.textContent || fullName.innerText;
//         if (txtValue.indexOf(filter) > -1) {
//             parentDiv.classListAdd('visible');
//         } else {
//             parentDiv.classListAdd('hide');
//         }
//     }
// }

