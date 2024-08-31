const nextPageBtn = document.getElementById("nextBtn");
const prevPageBtn = document.getElementById("prevBtn");

const progressBar = document.querySelector("progress");

let currentPage = 1;
let totalPages = 4;

function showPage(pageNumber) {
    // Hide all pages except Selected Page
    for (let i = 1; i <= totalPages; i++) {
        if (i != pageNumber)
            document.getElementById('form-page' + i).style.display = 'none';
        else
            document.getElementById('form-page' + pageNumber).style.display = 'block';
    }

    // Update the Next Page Button Text to Submit Booking on Final Page
    if (pageNumber == totalPages)
        nextPageBtn.textContent = 'Submit Booking';
    else
        nextPageBtn.textContent = 'Next Page';

    // Remove Previous Button on Page 1
    if (pageNumber == 1)
        prevPageBtn.style.display = 'none';
    else
        prevPageBtn.style.display = 'inline-block';

    // Update Progress Bar
    progressBar.value = 25 * pageNumber;
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
    else // Submit Form when Complete
        alert('Booking Submitted!');
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

const bannerAdText = document.getElementById("bannerAdText");

let sceneNumber = 0;
let timer = null;
let scenes = [
    document.getElementById("bannerAdScene1"),
    document.getElementById("bannerAdScene2")
];

function changeScene() {
    switch (sceneNumber) {
        case 0:
            scenes[0].style.visibility = "visible";
            scenes[1].style.visibility = "hidden";
            bannerAdText.textContent = 'Interested in More Fun at Parakai Springs?';
            break;
        case 1:
            scenes[0].style.visibility = "hidden";
            scenes[1].style.visibility = "visible";
            bannerAdText.textContent = 'Check out the new "Fast Pass" entry ticket!';
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
            sceneNumber--;
            break;
        default:
            break;
    }

    changeScene();
}

function play() {
    sceneNumber = 0;
    changeScene();
    timer = setInterval(animateSidebar, 3000);
}

play();