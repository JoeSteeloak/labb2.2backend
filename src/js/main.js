"use strict";

let url = "http://127.0.0.1:3000/api/workexperience" //URL till mitt API


getData(); // kalla på funktion för att hämta in min data


/* Funktion för att hämta data */
async function getData() {
    const response = await fetch(url);

    const data = await response.json();

    console.table(data);
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