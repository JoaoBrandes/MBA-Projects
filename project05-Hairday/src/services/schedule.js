import dayjs from "dayjs"
import { apiConfig } from "./api-config"

export const newSchedule = async ({ id, name, when }) => {
    try {
        await fetch(`${apiConfig.baseURL}/schedules`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, name, when }),
        })
    } catch (error) {
        console.log(error)
        alert("Não foi possível agendar");
    }
}

export const fetchSchedulesByDay = async ({ date }) => {
    try {
        const response = await fetch(`${apiConfig.baseURL}/schedules`);
        const data = await response.json();
        const dailySchedules = data.filter((schedule) => dayjs(date).isSame(schedule.when, "day"))
        return dailySchedules;
    } catch (error) {
        console.log(error);
        alert("Não foi possível buscar os agendamentos do dia")
    }
}

export const cancelSchedule = async (element, schedule) => {
    const isConfirm = confirm("Deseja mesmo realizar o cancelamento?")
    if (isConfirm) {
        await deleteFromServer(schedule.id);
    }
}

const deleteFromServer = async (id) => {
    console.log("ID Delete ", id)
    try {
        await fetch(`${apiConfig.baseURL}/schedules/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.log(error)
    }

}