
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");


const expenseList = document.querySelector("ul");
const expenseQuantity = document.getElementById("total-expenses");
const expenseTotal = document.querySelector("aside header h2");
amount.oninput = (event) => {
    let value = amount.value.replace(/\D/g, "");

    value = Number(value) / 100;

    amount.value = formatCurrencyBRL(value);
}

const formatCurrencyBRL = (value) => {
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
    return value;
}

form.onsubmit = (event) => {
    event.preventDefault();
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    addExpense(newExpense)
}

const addExpense = (newExpense) => {
    try {

        const expenseItem = document.createElement("li");
        expenseItem.classList.add("expense");

        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        const expenseInfo = document.createElement("div");
        expenseInfo.classList.add("expense-info");

        const expenseName = document.createElement("strong");
        expenseName.textContent = newExpense.expense;

        const expenseCategory = document.createElement("span");
        expenseCategory.textContent = newExpense.category_name;

        const expenseAmount = document.createElement("span");
        expenseAmount.classList.add("expense-amount");
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;

        const removeIcon = document.createElement("img");
        removeIcon.classList.add("remove-icon");
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover");
        removeIcon.addEventListener("click", (event) => removeItem(newExpense, event))

        expenseInfo.append(expenseName, expenseCategory);
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
        expenseList.append(expenseItem)

        clearForm();

        updateTotals();
    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas")
        console.log("Deu erro")
    }
}

const updateTotals = () => {
    try {
        const items = expenseList.children;
        expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

        let total = 0;

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector(".expense-amount");

            //Remove caracteres não numéricos e substitui a vírgula por ponto
            let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

            value = parseFloat(value);
            if (isNaN(value)) {
                return alert("Valor não é um número");
            }
            total += value;
        }

        const symbolBRL = document.createElement("small");
        symbolBRL.textContent = "R$";

        total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");
        expenseTotal.innerHTML = "";
        expenseTotal.append(symbolBRL, total);


    } catch (error) {
        console.log(error);
        alert("Não foi possível atualizar os totais");
    }
}

const removeItem = (expense, event) => {
    const item = event.target.closest(".expense");
    item.remove();

    updateTotals();
}

const clearForm = () => {
    expense.value = "";
    category.value = "";
    amount.value = "";
    expense.focus();
}