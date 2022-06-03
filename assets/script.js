let requestURL = "https://api.hatchways.io/assessment/students";
//searchBarEl
let searchBarDiv = document.createElement("div");
searchBarDiv.setAttribute("class", "searchParent");
let searchBar = document.createElement("input");
searchBar.type = "text";
searchBar.className = "searchBar";
searchBar.placeholder = "Search by name...";
//searchTagEl
let searchTagDiv = document.createElement("div");
searchTagDiv.setAttribute("class", "searchParent");
let tagSearch = document.createElement("input");
tagSearch.type = "text";
tagSearch.className = "searchBar";
tagSearch.placeholder = "Search by tag...";
//append
body.appendChild(searchBarDiv);
searchBarDiv.appendChild(searchBar);
body.appendChild(searchTagDiv);
searchBarDiv.appendChild(tagSearch);
let newTag;


function getAPI() {
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (let i = 0; i < data["students"].length; i++) {
        let tags = [];
        // for flexbox structure:
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
        // append:
        body.appendChild(parentDiv);
        parentDiv.appendChild(photoDiv);
        parentDiv.appendChild(userInfoDiv);
        userInfoDiv.appendChild(nameDiv);
        userInfoDiv.appendChild(detailsDiv);
        // picture element:
        let photo = document.createElement("img");
        photo.setAttribute("class", "photo");
        photo.setAttribute("src", data["students"][i]["pic"]);
        // nameEl:
        let fullName = document.createElement("h3");
        fullName.setAttribute("class", "fullName");
        fullName.textContent =
          data["students"][i]["firstName"].toUpperCase() +
          " " +
          data["students"][i]["lastName"].toUpperCase();
        let name = fullName.textContent;
        // emailEl:
        let email = document.createElement("p");
        email.setAttribute("class", "details");
        email.textContent = "Email: " + data["students"][i]["email"];
        // companyEl:
        let company = document.createElement("p");
        company.setAttribute("class", "details");
        company.textContent = "Company: " + data["students"][i]["company"];
        // skillEl:
        let skill = document.createElement("p");
        skill.setAttribute("class", "details");
        skill.textContent = "Skill: " + data["students"][i]["skill"];
        // gradesEl:
        const gradesList = data["students"][i]["grades"];
        let grades = document.createElement("p");
        grades.setAttribute("class", "details");
        findAverage(gradesList);
        //textInputField
        const textInputContainer = document.createElement("div");
        textInputContainer.setAttribute("class", "container");
        const textInputRow = document.createElement("div");
        textInputRow.setAttribute("class", "row");
        let textInput = document.createElement("input");
        textInput.setAttribute(
          "class",
          "form-control form-control-sm textInput"
        );
        textInput.setAttribute("type", "text");
        textInput.setAttribute("placeholder", "Add a tag");
        // start append logic for existing tags
        let fetchedData = JSON.parse(localStorage.getItem(name));
        if (fetchedData) {
          console.log(fetchedData);
          for (let z = 0; z < fetchedData.length; z++) {
            let appendPersist = document.createElement("p");
            appendPersist.setAttribute("class", "newTag");
            appendPersist.textContent = fetchedData[z];
            textInputContainer.append(appendPersist);
          }
        }
        //target textInput & create a new tag every time enter is pressed.
        textInput.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            tagContent = textInput.value;
            tags.push(tagContent);
            localStorage.setItem(name, JSON.stringify(tags));
            tags = JSON.parse(localStorage.getItem(name));
            newTag = document.createElement("p");
            newTag.setAttribute("class", "newTag");
            for (let j = 0; j < tags.length; j++) {
              newTag.textContent = tags[j];
            }
            textInputContainer.appendChild(newTag);
          }
        });
        // expandIconEl
        let iconParent = document.createElement("button");
        iconParent.setAttribute("class", "iconParent");
        let icon = document.createElement("i");
        icon.setAttribute("type", "button");
        icon.setAttribute("id", "expandableList");
        icon.setAttribute("class", "bi bi-plus-square");
        // minimizeIconEl
        let minimizeToggle = document.createElement("i");
        minimizeToggle.setAttribute("type", "button");
        minimizeToggle.setAttribute("id", "expandableList");
        minimizeToggle.setAttribute("class", "bi bi-dash-square");
        // append:
        photoDiv.appendChild(photo);
        nameDiv.appendChild(fullName);
        detailsDiv.appendChild(email);
        detailsDiv.appendChild(company);
        detailsDiv.appendChild(skill);
        detailsDiv.appendChild(grades);
        detailsDiv.appendChild(textInputContainer);
        detailsDiv.appendChild(textInputRow);
        detailsDiv.appendChild(textInput);
        parentDiv.appendChild(iconParent);
        iconParent.appendChild(icon);
        // findAverage
        function findAverage(gradesList) {
          let sum = 0;
          for (let k = 0; k < gradesList.length; k++) {
            sum += Number(gradesList[k]);
          }
          let average = sum / gradesList.length;
          grades.textContent = "Grade: " + Math.round(average) + "%";
        }
        //searchNames
        function searchNames(value) {
          let readInput = value.toUpperCase().toString();
          name.toUpperCase();
          for (let l = 0; l < name.length; l++) {
            if (name.indexOf(readInput) > -1) {
              parentDiv.style.display = "";
            } else {
              parentDiv.style.display = "none";
            }
          }
        }
        //run searchNames() when enter is pressed
        searchBar.addEventListener("keydown", function (e) {
          if (e.key === "Enter") {
            searchNames(searchBar.value);
          }
        });
        // show/hide grades on toggle
        function showList() {
          for (let i = 0; i < gradesList.length; i++) {
            console.log(gradesList.length);
            let expandDiv = document.createElement("div");
            expandDiv.setAttribute("class", "expandDiv");
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            li.textContent = "Test " + [i + 1] + ": " + gradesList[i] + "%";
            // append:
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
