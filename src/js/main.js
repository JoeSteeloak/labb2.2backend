"use strict";

let url = "http://127.0.0.1:3000/api/workexperience" //URL till mitt API


window.onload = () => getData(); // kalla på funktion för att hämta in min data



/* funktion för att läsa in datan i formuläret */
const form = document.getElementById("form");
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let companyname = document.getElementById("companyname").value;
    let jobtitle = document.getElementById("jobtitle").value;
    let location = document.getElementById("location").value;
    let startdate = document.getElementById("startdate").value;
    let enddate = document.getElementById("enddate").value;
    let description = document.getElementById("description").value;

    if (companyname == "" || jobtitle == "" || location == "" || startdate == "" || enddate == "" || description == "") {
        //throw error
        alert("You must fill in everything!")
        return;
    } else {
        createWorkExperience(companyname, jobtitle, location, startdate, enddate, description);
    }
});


/* Funktion för att hämta data */
async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.table(data);

    displayData(data); //visa datan
}


/* Funktion för att lägga till data i databasen */
async function createWorkExperience(companyname, jobtitle, location, startdate, enddate, description) {
    let workexperience = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate,
        description: description
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "Application/json"
        },
        body: JSON.stringify(workexperience)
    });

    const data = await response.json();
    console.log(data);
    alert("Work experience added succesfully!");
    window.location.href = '/src/index.html'; //skicka en tillbaka till startsidan
}

/* Funktion för att skriva ut databasen till DOM */
function displayData(data) {
    const containerEl = document.getElementById("cv");
    containerEl.innerHTML = "";
    data.forEach(e => {
        // Skapa en ny div för varje CV-post
        const cvDiv = document.createElement('div');
        cvDiv.classList.add('cv');
        cvDiv.innerHTML = `
            <h2>${e.companyname}</h2>
            <h3>${e.jobtitle}</h3>
            <h4>${e.location}</h4>
            <h5>${e.startdate} - ${e.enddate}</h5>
            <p>${e.description}</p>
        `;

        // Skapa delete-knappen
        const deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = 'Delete';
        deleteBtn.id = e.id;

        // Fäst event listener till delete-knappen
        deleteBtn.addEventListener('click', () => {
            deleteData(e.id);
        });

        // Lägg till CV-div och delete-knappen i containerEl
        containerEl.appendChild(cvDiv);
        containerEl.appendChild(deleteBtn);
    });
}

/* Funktion för att ta bort data i databasen */

async function deleteData(id) {
    // Lägg märke till hur `id` läggs till i slutet av URL:en.
    // Det antas att `url` redan är definierad någonstans i din kod,
    // och att den pekar på den korrekta routen för att hantera DELETE-begäran.
    const response = await fetch(url + "/" + id, { 
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (response.ok) { // Kontrollerar om HTTP-statuskoden är 200
        const data = await response.json();
        console.log(data);
        alert("Work experience deleted successfully!");
        getData();
    } else {
        // Hantera fel, t.ex. visa ett felmeddelande
        alert("Failed to delete work experience!");
    }
}