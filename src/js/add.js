"use strict";

let url = "http://127.0.0.1:3000/api/workexperience" //URL till mitt API

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

