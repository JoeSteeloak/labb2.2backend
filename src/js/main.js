"use strict";

let url = "http://127.0.0.1:3000/api/workexperience" //URL till mitt API


window.onload = () => getData(); // kalla på funktion för att hämta in min data

/* Funktion för att hämta data */
async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.table(data);

    displayData(data); //visa datan
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
        console.table(data);
        alert("Work experience deleted successfully!");
        getData();
    } else {
        // Hantera fel, t.ex. visa ett felmeddelande
        alert("Failed to delete work experience!");
    }
}