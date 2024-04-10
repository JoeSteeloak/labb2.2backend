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
        alert("Work experience added succesfully!");
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
}

/* Funktion för att ta bort data i databasen */

/* Funktion för att skriva ut databasen till DOM */
function displayData(data) {

    data.forEach(e => {

        const containerEl = document.getElementById("cv");
        const companyname = e.companyname;
        const jobtitle = e.jobtitle;
        const location = e.location;
        const startdate = e.startdate;
        const enddate = e.enddate;
        const description = e.description;

        containerEl.innerHTML += `
        <div class='cv'>
            <h2>${companyname}</h2>
            <h3>${jobtitle}</h3>
            <h4>${location}</h4>
            <h5>${startdate} - ${enddate}</h5>
            <p>${description}</p>
        </div>
        `;
    });
};