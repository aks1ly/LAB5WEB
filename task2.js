// Завдання 2.1 — обрізання тексту
function cutText() {
    const blocks = document.querySelectorAll("#textBlocks div");

    for (let block of blocks) {
        block.textContent = block.textContent.trim().slice(0, 10) + "...";
    }
}

// Завдання 2.2 — сума стовпців
function calculateSums() {
    const rows = document.querySelectorAll("#numberTable tr");
    const lastRow = rows[rows.length - 1];

    for (let j = 0; j < lastRow.cells.length; j++) {
        let sum = 0;

        for (let i = 0; i < rows.length - 1; i++) {
            sum += Number(rows[i].cells[j].textContent);
        }

        lastRow.cells[j].textContent = sum;
    }
}

document.getElementById("cutButton").addEventListener("click", cutText);
document.getElementById("sumButton").addEventListener("click", calculateSums);