import dayjs from "dayjs"
import { openingHours } from "../../utils/opening-hours.js"
import { addClickEvent } from "./hours-click.js";

const hours = document.getElementById("hours");

export const loadHours = async (date, dailySchedules) => {
    cleanHourList();

    const unavailableHours = dailySchedules.map((schedule) => {
        return dayjs(schedule.when).format("HH:mm");
    })
    openingHours.forEach((hour) => {
        const scheduleHour = hour.split(":")[0]

        const isHourPast = dayjs(date).add(scheduleHour, "hour").isAfter(dayjs());
        const isHourAvailable = !unavailableHours.includes(hour);
        const available = isHourPast && isHourAvailable;
        createHourElement(hour, available)
    })
}

const cleanHourList = () => {
    hours.innerHTML = "";
}

const createHourElement = (hour, available) => {
    const newHourElement = document.createElement("li");
    newHourElement.classList.add("hour");
    newHourElement.classList.add(available ? "hour-available" : "hour-unavailable")
    newHourElement.textContent = hour;

    if (hour === "9:00") {
        addHourHeader("Manhã");
    } else if (hour === "13:00") {
        addHourHeader("Tarde");
    } else if (hour === "18:00") {
        addHourHeader("Noite");
    }

    if (available) {
        addClickEvent(newHourElement)
    }

    hours.append(newHourElement);
}

const addHourHeader = (title) => {
    const header = document.createElement("li");
    header.classList.add("hour-period");
    header.textContent = title;
    hours.append(header)
}

