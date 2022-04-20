let requestURL = "https://api.hatchways.io/assessment/students";

//search bar
let searchBarDiv = document.createElement("div");
searchBarDiv.setAttribute("class", "searchParent");
let searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.className = "searchBar";
searchBar.placeholder = "Search by name...";
//searchIcon
let searchIcon = document.createElement("i");
searchIcon.setAttribute("class", "bi bi-search");
//append searchBar and searchIcon
body.appendChild(searchBarDiv);
searchBarDiv.appendChild(searchBar);
searchBarDiv.appendChild(searchIcon);

function getAPI() {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < data["students"].length; i++) {
        // for flex div structure:
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
        // appending children to parents:
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
        // icon
        let iconParent = document.createElement("button");
        iconParent.setAttribute("class", "iconParent");
        let icon = document.createElement("i");
        icon.setAttribute("type", "button");
        icon.setAttribute("id", "expandableList");
        icon.setAttribute("class", "bi bi-plus-square fa-5x");
        // toggle icon
        let minimizeToggle = document.createElement("i");
        minimizeToggle.setAttribute("type", "button");
        minimizeToggle.setAttribute("id", "expandableList");
        minimizeToggle.setAttribute("class", "bi bi-dash-square fa-5x");
        // appending children elements to parents:
        photoDiv.appendChild(photo);
        nameDiv.appendChild(fullName);
        detailsDiv.appendChild(email);
        detailsDiv.appendChild(company);
        detailsDiv.appendChild(skill);
        detailsDiv.appendChild(grades);
        parentDiv.appendChild(iconParent);
        iconParent.appendChild(icon);
        //average
        function findAverage(gradesList) {
          let sum = 0;
          for (let i = 0; i < gradesList.length; i++) {
            sum += Number(gradesList[i]);
          }
          let average = sum / gradesList.length;
          grades.textContent = "Grade: " + Math.round(average) + "%";
        }
        //search names
        function searchNames(value) {
          let readInput = value.toUpperCase().toString();
          let name =
            data["students"][i]["firstName"].toUpperCase() +
            " " +
            data["students"][i]["lastName"].toUpperCase();
          for (let i = 0; i < name.length; i++) {
            if (name.indexOf(readInput) > -1) {
              parentDiv.style.display = "";
            } else {
              parentDiv.style.display = "none";
            }
          }
        }
        //function runs when enter key pressed
        searchBar.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            searchNames(searchBar.value);
          }
        });
        // show/hide grades functionality.
        function showList() {
          for (let i = 0; i < gradesList.length; i++) {
            console.log(gradesList.length);
            let expandDiv = document.createElement("div");
            expandDiv.setAttribute("class", "expandDiv");
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            li.textContent = "Test " + [i + 1] + ": " + gradesList[i] + "%";
            // appending children to parent(s)
            userInfoDiv.appendChild(expandDiv);
            expandDiv.appendChild(ul);
            ul.appendChild(li);
            // when minimize toggle is clicked, remove expand icon and run hideList function.
            minimizeToggle.addEventListener("click", () => {
              iconParent.removeChild(iconParent.children[0]);
              hideList();
            });
            // re-append the expand icon and remove the list.
            function hideList() {
              iconParent.appendChild(icon);
              expandDiv.removeChild(ul);
            }
          }
        }
        // when expand icon is clicked, remove expand icon, switch to minimize icon and run the showList function.
        icon.addEventListener("click", () => {
          iconParent.appendChild(minimizeToggle);
          iconParent.removeChild(iconParent.children[0]);
          showList();
        });
      }
    });
}
getAPI();
