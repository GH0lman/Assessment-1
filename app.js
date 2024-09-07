const nextPageBtn = document.getElementById("nextBtn");
const prevPageBtn = document.getElementById("prevBtn");

const progressBar = document.querySelector("progress");

const formData = document.getElementById("collected-data");

let currentPage = 1;
let totalPages = 5;

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

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
    else {
        showPage(currentPage = 1);
        resetInput();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

const replayBtn = document.getElementById("sidebarReplay");
replayBtn.addEventListener("click", play);
let sceneNumber = 0;
let timer = null;

let scenes = [
    document.getElementById("sidebarAdScene1"),
    document.getElementById("sidebarAdScene2"),
    document.getElementById("sidebarAdScene3")
];

function changeScene() {
    switch (sceneNumber) {
        case 0:
            scenes[0].style.visibility = "visible";
            scenes[1].style.visibility = "hidden";
            scenes[2].style.visibility = "hidden";
            replayBtn.style.visibility = "hidden";
            break;
        case 1:
            scenes[0].style.visibility = "hidden";
            scenes[1].style.visibility = "visible";
            scenes[2].style.visibility = "hidden";
            replayBtn.style.visibility = "hidden";
            break;
        case 2:
            scenes[0].style.visibility = "hidden";
            scenes[1].style.visibility = "hidden";
            scenes[2].style.visibility = "visible";
            replayBtn.style.visibility = "visible";
            break;
        default:
            break;
    }
}

function animateSidebar() {
    if (sceneNumber >= scenes.length) {
        clearInterval(timer);
    }

    switch (sceneNumber) {
        case 0:
            sceneNumber++;
            break;
        case 1:
            sceneNumber++;
            break;
        default:
            break;
    }

    changeScene();
}

function play() {
    sceneNumber = 0;
    changeScene();
    timer = setInterval(animateSidebar, 5000);
}

play();

function getFormData() {
    const fNameInput = document.getElementById("fName").value;
    const lNameInput = document.getElementById("lName").value;
    const emailInput = document.getElementById("email").value;
    const dateInput = document.getElementById("date").value;
    const adultInput = document.getElementById("adult").value;
    const childrenInput = document.getElementById("children").value;
    const ticketColourValue = document.getElementById("ticketColour").value;
    const includeLockerValue = document.querySelector('input[name=storage-locker]:checked').value;

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

function submitData() {
    const dataRow = document.createElement("tr");

    const cellName = document.createElement("td");
    const cellEmail = document.createElement("td");
    const cellDate = document.createElement("td");
    const cellAdult = document.createElement("td");
    const cellChildren = document.createElement("td");
    const cellTicketColour = document.createElement("td");
    const cellLocker = document.createElement("td");

    dataRow.appendChild(cellName);
    dataRow.appendChild(cellEmail);
    dataRow.appendChild(cellDate);
    dataRow.appendChild(cellAdult);
    dataRow.appendChild(cellChildren);
    dataRow.appendChild(cellTicketColour);
    dataRow.appendChild(cellLocker);

    const data = getFormData();

    cellName.innerHTML = data.name;
    cellEmail.innerHTML = data.email;
    cellDate.innerHTML = data.date;
    cellAdult.innerHTML = data.adult;
    cellChildren.innerHTML = data.children;
    cellTicketColour.innerHTML = data.ticketColour;
    cellLocker.innerHTML = data.locker;

    formData.appendChild(dataRow);
}

function resetInput() {
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("date").value = "";
    document.getElementById("adult").value = "";
    document.getElementById("children").value = "";
    document.getElementById("ticketColour").value = "#000000";
}