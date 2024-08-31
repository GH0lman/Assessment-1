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