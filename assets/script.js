let requestURL = 'https://api.hatchways.io/assessment/students';

function getAPI() {

    fetch(requestURL)
        .then(function(response) {
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
        })
}

getAPI();
