import { loadHours } from "../form/hours-load"
import { fetchSchedulesByDay, cancelSchedule } from "../../services/schedule.js"
import dayjs from "dayjs";
const selectedDate = document.getElementById("date")
const morningPeriod = document.getElementById("period-morning")
const afternoonPeriod = document.getElementById("period-afternoon")
const nightPeriod = document.getElementById("period-night")

export const schedulesDay = async () => {
    const date = selectedDate.value;
    const dailySchedules = await fetchSchedulesByDay({ date });

    loadExistingSchedules(date, dailySchedules);
    loadHours(date, dailySchedules)
}

const loadExistingSchedules = (date, dailySchedules) => {
    try {
        clearCurrentSchedulesElements();
        dailySchedules.forEach((schedule) => {
            createScheduleElement(schedule);
        })

    } catch (error) {
        console.log(error)
    }
}

const clearCurrentSchedulesElements = () => {
    morningPeriod.innerHTML = "";
    afternoonPeriod.innerHTML = "";
    nightPeriod.innerHTML = "";
}

const createScheduleElement = ({ id, name, when }) => {
    const item = document.createElement("li");
    const time = document.createElement("strong");
    const nameSpan = document.createElement("span");

    item.setAttribute("data-id", id);
    time.textContent = dayjs(when).format("HH:mm");
    nameSpan.textContent = name;

    const cancelIcon = document.createElement("img");
    cancelIcon.classList.add("cancel-icon");
    cancelIcon.setAttribute("src", "./src/assets/cancel.svg");
    cancelIcon.setAttribute("alt", "Cancelar");
    cancelIcon.addEventListener("click", async (event) => {
        await cancelSchedule(event.target, { id, name, when })
        await schedulesDay()
    })

    item.append(time, nameSpan, cancelIcon);

    const hour = dayjs(when).hour();
    if (hour <= 12) {
        morningPeriod.appendChild(item);
    } else if (hour > 12 && hour <= 18) {
        afternoonPeriod.appendChild(item);
    } else {
        nightPeriod.appendChild(item);
    }
}