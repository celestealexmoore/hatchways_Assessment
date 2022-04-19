let requestURL = "https://api.hatchways.io/assessment/students";

//search bar
let searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.className = "searchBar";
searchBar.placeholder = "Search for names...";
body.appendChild(searchBar);

function getAPI() {
  // performing fetch request and translating into json object:
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // to view data response from fetch:
      console.log(data);

      for (let i = 0; i < data["students"].length; i++) {
        // for flexbox div structure:
        let parentDiv = document.createElement("div");
        parentDiv.setAttribute("id", "parentDiv");
        let photoDiv = document.createElement("div");
        photoDiv.setAttribute("id", "photoDiv");
        let userInfoDiv = document.createElement("div");
        userInfoDiv.setAttribute("id", "userInfoDiv");
        let nameDiv = document.createElement("div");
        nameDiv.setAttribute("id", "nameDiv");
        let detailsDiv = document.createElement("div");
        detailsDiv.setAttribute("id", "detailsDiv");

        // appending children divs to parent divs:
        body.appendChild(parentDiv);
        parentDiv.appendChild(photoDiv);
        parentDiv.appendChild(userInfoDiv);
        userInfoDiv.appendChild(nameDiv);
        userInfoDiv.appendChild(detailsDiv);

        // picture element:
        let photo = document.createElement("img");
        photo.setAttribute("class", "photo");
        photo.setAttribute("src", data["students"][i]["pic"]);
        // name element:
        let fullName = document.createElement("h3");
        fullName.setAttribute("class", "fullName");
        fullName.textContent =
          data["students"][i]["firstName"].toUpperCase() +
          " " +
          data["students"][i]["lastName"].toUpperCase();
        // email element:
        let email = document.createElement("p");
        email.setAttribute("class", "details");
        email.textContent = "Email: " + data["students"][i]["email"];
        // company element:
        let company = document.createElement("p");
        company.setAttribute("class", "details");
        company.textContent = "Company: " + data["students"][i]["company"];
        // skill element:
        let skill = document.createElement("p");
        skill.setAttribute("class", "details");
        skill.textContent = "Skill: " + data["students"][i]["skill"];
        // grades element:
        const gradesList = data["students"][i]["grades"];
        let grades = document.createElement("p");
        grades.setAttribute("class", "details");
        findAverage(gradesList);

        // appending children elements to parent divs:
        photoDiv.appendChild(photo);
        nameDiv.appendChild(fullName);
        detailsDiv.appendChild(email);
        detailsDiv.appendChild(company);
        detailsDiv.appendChild(skill);
        detailsDiv.appendChild(grades);

        //average
        function findAverage(gradesList) {
          let sum = 0;

          for (let i = 0; i < gradesList.length; i++) {
            sum += Number(gradesList[i]);
          }

          // sum += value; //sum should equal 711 for first student
          let average = sum / gradesList.length;
          grades.textContent = "Grade: " + Math.round(average) + "%";
        }

        //search names
        function searchNames(value) {
          // Declare variables
          // let txtValue;
          let readInput = value.toUpperCase().toString();
          console.log(readInput);
          let name =
            data["students"][i]["firstName"].toUpperCase() +
            " " +
            data["students"][i]["lastName"].toUpperCase();
          console.log(name);

          //  Loop through all names, and hide those who don't match the search query

          for (let i = 0; i < name.length; i++) {
            //     textValue = name.textContent || name.innerText;
            //     if (txtValue.indexOf(filter) > -1) {
            //         parentDiv.classListAdd('visible');
            //     } else {
            //         parentDiv.classListAdd('hide');
            //     }
          }
        }

        searchBar.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            searchNames(searchBar.value);
          }
        });
      }
    });
}

getAPI();
