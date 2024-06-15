


const baseURL = "http://localhost:3333";

const form = document.querySelector("form");
const memberInput = document.getElementById("memberInput")
const memberInfo = document.getElementById("memberInfo")
let memberList = [];

document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch(`${baseURL}/clients`);
    const data = await response.json();
    memberList = data;

})

form.onsubmit = async (event) => {
    event.preventDefault();

    const memberData = await findMember();
    console.log(memberData)
    if (!memberData) {
        console.log("Nenhum usuário encontrado com esse ID");
        return;
    }
    memberInfo.style.display = "flex";
    buildMemberProfile(memberData);
    buildMemberHistory(memberData);
    buildFidelityStickers(memberData);
    buildProgressBar(memberData);
}

const findMember = async () => {

    const memberID = memberInput.value;

    const memberData = memberList.find((member) => {
        if (member.id.includes(memberID)) {
            return member
        }
    });
    return memberData
}

const buildMemberProfile = (memberData) => {
    const memberName = document.getElementById("memberName");
    const memberSince = document.getElementById("memberSince");
    memberName.innerHTML = memberData.name;
    memberSince.innerHTML = "Cliente desde " + memberData.clientSince;
}

const buildMemberHistory = (memberData) => {
    const appointmentHistory = memberData.appointmentHistory;
    const historyList = document.getElementById("history-list");
    const count = document.getElementById("cuts-count");
    historyList.innerHTML = "";
    count.innerHTML = appointmentHistory.length + " cortes";
    appointmentHistory.forEach((appointment) => {
        const historyItem = document.createElement("div");
        const historyDate = document.createElement("div");
        const historyDay = document.createElement("div");
        const historyHour = document.createElement("div");
        const historyCheck = document.createElement("img");

        historyItem.classList.add("history-item")
        historyDate.classList.add("history-item-date")
        historyDay.classList.add("history-item-day")
        historyHour.classList.add("history-item-hour")
        historyCheck.classList.add("history-check")

        historyDay.innerHTML = appointment.date;
        historyHour.innerHTML = appointment.time;

        historyCheck.src = "./src/assets/history-check.svg"

        historyDate.append(historyDay, historyHour);

        historyItem.append(historyDate, historyCheck);
        historyList.append(historyItem);
    })
}

const buildFidelityStickers = (memberData) => {
    const userId = document.getElementById("userId");
    userId.innerHTML = "ID: " + memberData.id;

    const cuts = memberData.loyaltyCard.totalCuts;

    const fidelityBody = document.getElementById("fidelity-body");
    fidelityBody.innerHTML = "";

    for (i = 0; i < 10; i++) {
        const fidelityItem = document.createElement("div");
        fidelityItem.classList.add("fidelity-item");
        if (i < cuts) {
            const fidelityCheck = document.createElement("img");
            fidelityCheck.src = "./src/assets/PinCheck.svg";
            fidelityItem.append(fidelityCheck);
        }
        if (i === 9 && i >= cuts) {
            const emptyGift = document.createElement("img");
            emptyGift.src = "./src/assets/Gift-Gray.svg";
            fidelityItem.append(emptyGift);
        }

        fidelityBody.append(fidelityItem);
    }
}

const buildProgressBar = (memberData) => {
    const giftSection = document.getElementById("giftSection");
    giftSection.innerHTML = "";

    const giftProgressSection = document.createElement("div");
    giftProgressSection.classList.add("giftProgressSection");

    const progressTitle = document.createElement("p");
    const cutsRemaining = memberData.loyaltyCard.cutsRemaining;
    progressTitle.classList.add("title");
    progressTitle.innerHTML = cutsRemaining + " Cortes Restantes";

    const progressArea = document.createElement("div");
    progressArea.classList.add("progressArea");

    const progressBar = document.createElement("progress");
    progressBar.id = "progressBar"
    progressBar.value = memberData.loyaltyCard.totalCuts;
    progressBar.max = 10;

    const label = document.createElement("label");
    label.for = "progressBar";
    label.innerHTML = memberData.loyaltyCard.totalCuts + " de 10"

    progressArea.append(progressBar, label);
    giftProgressSection.append(progressTitle, progressArea);

    const gift = document.createElement("img");
    gift.src = "./src/assets/Gift.svg";

    giftSection.append(giftProgressSection, gift)


}