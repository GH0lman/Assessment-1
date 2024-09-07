// Created by George Holman - Student ID: 1580967

// Constrants Setup
const nextPageBtn = document.getElementById("nextBtn");
const prevPageBtn = document.getElementById("prevBtn");
const progressBar = document.querySelector("progress");

const replayBtn = document.getElementById("sidebarReplay");

const bookingFormData = document.getElementById("collected-data");

// Variables Setup
let currentPage = 1;
let totalPages = 5;

let sceneNumber = 0;
let sidebarScenes = [
    document.getElementById("sidebarAdScene1"),
    document.getElementById("sidebarAdScene2"),
    document.getElementById("sidebarAdScene3")
];
let timer = null;

// Show Page Function is used to setup the shown page and alter the buttons and functions when used.
function showPage(pageNumber) {
    var termsCheckBox = document.getElementById("termsConditions").checked;

    // Update the Next Page Button Text to Submit Booking on Final Page
    if (pageNumber == totalPages - 1)
        nextPageBtn.textContent = 'Submit Booking';
    else if (pageNumber == totalPages && termsCheckBox == true) {
        nextPageBtn.textContent = 'Enter New Booking';
        alert('Booking Submitted!');
        submitData();
    }
    else if (pageNumber == totalPages && termsCheckBox != true) {
        alert('Error! Please agree to Terms and Conditions to Book.');
        currentPage = 4;
        return;
    }
    else
        nextPageBtn.textContent = 'Next Page';

    // Remove Previous Button on Page 1
    if (pageNumber == 1 || pageNumber == totalPages)
        prevPageBtn.style.display = 'none';
    else
        prevPageBtn.style.display = 'inline-block';

    // Update Progress Bar
    progressBar.value = 25 * pageNumber;

    // Hide all pages except Selected Page
    for (let i = 1; i <= totalPages; i++) {
        if (i != pageNumber)
            document.getElementById('form-page' + i).style.display = 'none';
        else
            document.getElementById('form-page' + pageNumber).style.display = 'block';
    }
}

// Function called when User clicks on Next Page Button
function nextPage() {
    // If current page is lesser than total number of pages, it will bring user to next page.
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
    else { // Else it will return the user back to page one. This is when the user gets to the last page.
        showPage(currentPage = 1);
        resetInput();
    }
}

// Function called when User clicks on Previous Page Button
function prevPage() {
    // If current page is greater than one, it will return the user to the previous page.
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Setup and Hide other pages when loading page.
showPage(currentPage);

//Booking Form Summary Page
// Get Form Data is used to collect form data and set up to be used.
function getFormData() {
    // Data Input Collection Setup
    const fNameInput = document.getElementById("fName").value;
    const lNameInput = document.getElementById("lName").value;
    const emailInput = document.getElementById("email").value;
    const dateInput = document.getElementById("date").value;
    const adultInput = document.getElementById("adult").value;
    const childrenInput = document.getElementById("children").value;
    const ticketColourValue = document.getElementById("ticketColour").value;
    const includeLockerValue = document.querySelector('input[name=storage-locker]:checked').value;

    // Data Collection Table
    return data = {
        name: fNameInput + " " + lNameInput,
        email: emailInput,
        date: dateInput,
        adult: adultInput,
        children: childrenInput,
        ticketColour: ticketColourValue,
        locker: includeLockerValue
    };
}

// Submit Data Funcion is called when User Submits Booking. Setting up a new row for the created booking then collecting the data from the function to place data into new row then appending it to the table to be viewed by the user.
function submitData() {
    // New Row and Data Elements Setup
    const dataRow = document.createElement("tr");

    const cellName = document.createElement("td");
    const cellEmail = document.createElement("td");
    const cellDate = document.createElement("td");
    const cellAdult = document.createElement("td");
    const cellChildren = document.createElement("td");
    const cellTicketColour = document.createElement("td");
    const cellLocker = document.createElement("td");
    
    // New Row and Cells Created
    dataRow.appendChild(cellName);
    dataRow.appendChild(cellEmail);
    dataRow.appendChild(cellDate);
    dataRow.appendChild(cellAdult);
    dataRow.appendChild(cellChildren);
    dataRow.appendChild(cellTicketColour);
    dataRow.appendChild(cellLocker);

    // Collects Data inputted into Booking Form
    const data = getFormData();

    // Sets new cells to collected data to be read by user.
    cellName.innerHTML = data.name;
    cellEmail.innerHTML = data.email;
    cellDate.innerHTML = data.date;
    cellAdult.innerHTML = data.adult;
    cellChildren.innerHTML = data.children;
    cellTicketColour.innerHTML = data.ticketColour;
    cellLocker.innerHTML = data.locker;

    // Sets new booking to the table.
    bookingFormData.appendChild(dataRow);
}

// Reset Input Function is called to reset the data tables when user decides to create new booking.
function resetInput() {
    // Sets values of each input field back to nothing.
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date").value = "";
    document.getElementById("adult").value = "";
    document.getElementById("children").value = "";
    document.getElementById("ticketColour").value = "#000000";
}

//Sidebar Advertisement Scene Transition
// Change Scene Function is used to change between each scene depending on the value of scene number is at that moment.
function changeScene() {
    switch (sceneNumber) {
        case 0:
            // Reveals Scene One of the Sidebar Advertisement
            sidebarScenes[0].style.visibility = "visible";
            sidebarScenes[1].style.visibility = "hidden";
            sidebarScenes[2].style.visibility = "hidden";
            replayBtn.style.visibility = "hidden";
            break;
        case 1:
            // Reveals Scene Two of the Sidebar Advertisement
            sidebarScenes[0].style.visibility = "hidden";
            sidebarScenes[1].style.visibility = "visible";
            sidebarScenes[2].style.visibility = "hidden";
            replayBtn.style.visibility = "hidden";
            break;
        case 2:
            // Reveals Scene Three of the Sidebar Advertisement and Replay Button to restart animation
            sidebarScenes[0].style.visibility = "hidden";
            sidebarScenes[1].style.visibility = "hidden";
            sidebarScenes[2].style.visibility = "visible";
            replayBtn.style.visibility = "visible";
            break;
        default:
            break;
    }
}

// Animate Sidebar is used to keep track of time and animate the sidebar with each scene.
function animateSidebar() {
    // If the Scene Number is out of range of the length of amount of scenes, it will clear the timer.
    if (sceneNumber >= sidebarScenes.length)
        clearInterval(timer);
    // Else if the Scene Number is lesser than the length amount of scenes, it will increase the scene number by one.
    else if (sceneNumber < sidebarScenes.length)
        sceneNumber++;

    changeScene();
}

// Play Function is used to setup animation by setting the Scene Number back to start and changing the scene to start then using Set Interval to set 5 second timer for each scene.
function play() {
    sceneNumber = 0;
    changeScene();
    timer = setInterval(animateSidebar, 5000);
}

// Starts playing animation when the user loads the page.
play();
// When User clicks Replay Button, it will call the Play Function.
replayBtn.addEventListener("click", play);