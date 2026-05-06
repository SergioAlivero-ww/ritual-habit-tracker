const habitName = document.getElementById("inputHabit");
const addHabit = document.getElementById("addHabit");
const list = document.getElementById("habitsList");
const counter = document.getElementById("count");

let habits = [];

const quotes = [
  "Small actions. Every day.",
  "Slow is smooth. Smooth is fast.",
  "Discipline is quiet.",
  "A ritual repeated becomes direction.",
  "Do not rush. Return.",
  "Consistency shapes identity.",
  "One calm step is still movement.",
  "Small steps. Deep roots.",
  "Breathe. Focus. Repeat.",
"Gentle effort. Lasting change.",
"Show up. Let it build.",
"Patience is quiet power.",
"Return to the habit.",
"Steady wins the long game.",
"One breath. One choice.",
"Silence sharpens the mind.",
"Daily practice. Invisible growth.",
"Soft hands. Strong direction.",
"Rest. Reset. Continue.",
"Consistency is self-love.",
"The calm carries you forward.",
"Plant today. Harvest tomorrow.",
"Discipline flows in stillness.",
"Begin small. Stay true.",
"Momentum loves the patient.",
"Anchor in the ordinary.",
"Keep going. Quietly. Surely."
];

function saveToStorage () {
    localStorage.setItem("ritualHabits", JSON.stringify(habits));
};

function loadFromStorage () {
    const savedHabits = localStorage.getItem("ritualHabits");
    if (savedHabits) {
        habits = JSON.parse(savedHabits);
    };
};

function getTodayDate() {
    return new Date().toISOString().slice(0, 10);
}


function resetHabitsIfNewDay () {
    const today = getTodayDate();
    const lastResetDate = localStorage.getItem("ritualLastResetDate");

    if (lastResetDate !== today) {
        habits = habits.map(habit => {
            return {
                ...habit,
                doneToday: false
            }
        });

        localStorage.setItem("ritualLastResetDate", today);
        saveToStorage();
    }
}

function renderQuote(){
    const quote = document.getElementById("quote");
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.textContent = quotes[randomIndex];
}

addHabit.addEventListener('click', () => {
    const habitT = habitName.value.trim();
        if (!habitT) {
         return alert("Name your habit");
         };
    const newHabit = {
        id: Date.now(),
        habitT,
        doneToday: false
    };

    habits = [...habits, newHabit];
    

    habitName.value = "";
    renderHabits();
    saveToStorage();
});

function renderHabits () {
    list.innerHTML = "";
    habits.forEach(habit => {
    const div = document.createElement("div");
    div.classList.add("habit-card");
    if (habit.doneToday) {
  div.classList.add("completed");
}
    div.innerHTML = `
    <h3 class="habitTitle">${habit.habitT}</h3>
    <button class="toggleBtn" data-id="${habit.id}">
    ${habit.doneToday ? "✓" : ""}</button>
    <button class="deleteBtn" data-id="${habit.id}">Delete</button>
    `

    const toggleBtn = div.querySelector(".toggleBtn");
    toggleBtn.addEventListener('click', () => {
        const hId = Number(toggleBtn.dataset.id);
        habits = habits.map(habit => {
            if (hId === habit.id) {
                return {
                    ...habit,
                    doneToday: !habit.doneToday
                }
            } else {
                return habit
            };
        });
        saveToStorage();
        renderHabits();
        
    });

    const deleteBtn = div.querySelector(".deleteBtn");

    deleteBtn.addEventListener('click', () => {
        const hId = Number(deleteBtn.dataset.id);
        habits = habits.filter(habit => habit.id !== hId);
        saveToStorage();
        renderHabits();
    });
    list.appendChild(div);
    });

    updateCounter();
};

function updateCounter() {
const completed = habits.filter(habit => habit.doneToday === true).length;
const total = habits.length;

counter.textContent = `Completed today: ${completed}/${total}`;
};

loadFromStorage();
resetHabitsIfNewDay();
renderHabits();
renderQuote();




