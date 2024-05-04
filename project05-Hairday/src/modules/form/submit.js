import dayjs from "dayjs";
import { newSchedule } from "../../services/schedule.js"
import { schedulesDay } from "../schedules/load.js"
const form = document.querySelector("form");
const selectedDate = document.getElementById("date")
const clientName = document.getElementById("client")
const today = dayjs(new Date()).format("YYYY-MM-DD")

selectedDate.value = today
selectedDate.min = today

form.onsubmit = async (event) => {
    event.preventDefault();

    try {
        await createNewSchedule();
        await schedulesDay();
        clientName.value = ""
    } catch (error) {
        alert("Não foi possível marcar o horário")
        console.log(error)
    }
}

const createNewSchedule = async () => {
    const name = clientName.value.trim();
    if (!name) {
        return alert("informe o nome do cliente")
    }

    const selectedHour = document.querySelector(".hour-selected");
    if (!selectedHour) {
        return alert("Selecione a hora")
    }

    const [hour] = selectedHour.innerText.split(":");

    const when = dayjs(selectedDate.value).add(hour, "hour");
    const id = new Date().getTime();

    const schedule = {
        id,
        name,
        when
    }
    await newSchedule(schedule)
}