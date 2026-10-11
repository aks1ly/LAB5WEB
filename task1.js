const subjects = [
    "Проєктування та розробка веб-застосунків",
    "Програмування .NET",
    "Комп'ютерна графіка",
    "Проєктування інформаційних систем",
    "Комп'ютерний зір"
];

const examDates = [
    "2026-10-13", "2026-10-15", "2026-10-18",
    "2026-10-20", "2026-10-22"
];

const classrooms = ["305", "412", "", "218", ""];

const dateInput = document.getElementById("checkDate");
const tableBody = document.getElementById("examTableBody");
const result = document.getElementById("examResult");

// Перетворення рядка на дату
function getDate(text) {
    const [year, month, day] = text.split("-").map(Number);
    return new Date(year, month - 1, day);
}

// Заповнення таблиці
function showExams() {
    for (let i = 0; i < subjects.length; i++) {
        tableBody.innerHTML += `
            <tr>
                <td>${subjects[i]}</td>
                <td>${getDate(examDates[i]).toLocaleDateString("uk-UA")}</td>
                <td>${classrooms[i] || "Не вказано"}</td>
            </tr>`;
    }
}

// Перевірка іспитів та консультацій
function checkExams() {
    const selectedDate = getDate(dateInput.value);
    result.innerHTML = "";

    for (let i = 0; i < subjects.length; i++) {
        const examDate = getDate(examDates[i]);
        const consultationDate = new Date(examDate);
        consultationDate.setDate(examDate.getDate() - 1);

        let event = "";

        if (+selectedDate === +examDate) {
            event = "Іспит";
        } else if (+selectedDate === +consultationDate) {
            event = "Консультація";
        }

        if (event) {
            result.innerHTML += `
                <div class="event-card">
                    <h3>${event}: ${subjects[i]}</h3>
                    <p>Аудиторія: ${classrooms[i] || "не вказана"}</p>
                    ${!classrooms[i] ? `
                        <p class="event-warning">
                            Невідоме місце проведення консультації/іспиту
                        </p>` : ""}
                </div>`;
        }
    }

    if (!result.innerHTML) {
        result.innerHTML = `
            <div class="event-card">
                <p>На обрану дату консультацій та іспитів немає.</p>
            </div>`;
    }
}

// Початкова дата та запуск
const today = new Date();
dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

document.getElementById("checkButton").addEventListener("click", checkExams);

showExams();
checkExams();
