
export const addClickEvent = (newHourElement) => {
    newHourElement.addEventListener("click", (hour) => {
        removeSelectedHourClass();
        hour.target.classList.add("hour-selected")
    })
}

const removeSelectedHourClass = () => {
    const previousSelectedHour = document.querySelector(".hour-selected")
    if (previousSelectedHour) {
        previousSelectedHour.classList.remove("hour-selected")
    }

}