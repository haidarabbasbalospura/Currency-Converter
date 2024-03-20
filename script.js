const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
// "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")
const container = document.querySelector(".container")
const loader = document.querySelector("svg")

// const flagFrom = document.querySelector(".from img")
// const flagTo = document.querySelector(".to img")

for (const select of dropdowns) {
  for (const currCode in countryList) {
    // console.log(code, countryList[code])
    let newOption = document.createElement("option")
    newOption.innerText = currCode
    newOption.value = currCode
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = true
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = true
    }
    select.append(newOption)
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target)
    updateExchangeRate()
  })
}
const updateFlag = (element) => {
  let currCode = element.value
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc
  //   msg.innerText = `${fromCurr.value} = ${toCurr.value}`
  //   let fromOrTo = element.name
  //   if (fromOrTo === "from") {
  //     flagFrom.src = newSrc
  //   }
  //   else if (fromOrTo === "to") {
  //     flagTo.src = newSrc
  //   }
  //   console.log(currCode, fromOrTo)
}

async function updateExchangeRate(evt) {
  let newFromCurr = fromCurr.value.toLowerCase()
  let newToCurr = toCurr.value.toLowerCase()
  let amount = document.querySelector(".amount input")
  let amtVal = amount.value
  amtVal = Number(amtVal)
  console.log(amtVal)
  console.log(amtVal)
  if (amtVal == "" || amtVal < 1 || isNaN(amtVal)) {
    amtVal = 1
    amount.value = "1"
  }
  //   console.log(fromCurr, fromCurr.value, toCurr, toCurr.value)
  const URL = `${BASE_URL}/${newFromCurr}.json`
  // console.log(URL)
  let response = await fetch(URL)
  let data = await response.json()
  console.log(data)
  // dummyData = data[newFromCurr][newToCurr]
  // json[fromCurrency][toCurrency]
  let rate = data[newFromCurr][newToCurr]
  let finalAmount = amtVal * rate
  console.log(finalAmount)
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

window.addEventListener("load", () => {
  updateExchangeRate()
  setTimeout(() => {
    container.classList.remove("hide")
    loader.style.display = "none"
    document.body.style.backgroundColor = "#f4b4ea"
  }, 1500)
})
btn.addEventListener("click", (evt) => {
  evt.preventDefault()
  updateExchangeRate()
})
