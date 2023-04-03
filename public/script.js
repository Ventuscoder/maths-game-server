let result

$('.ask-btn').click(() => {
    let firstNum, secondNum
    firstNum = Math.floor(Math.random() * 20) + 1
    secondNum = Math.floor(Math.random() * 20) + 1
    $('.first-num').text(firstNum)
    $('.last-num').text(secondNum)
    let randomNum = Math.floor(Math.random() * 20) + 1
    let oper
    if (randomNum % 2 == 0) {
        oper = '+'
        result = firstNum + secondNum
    } else {
        oper = '-'
        result = firstNum - secondNum
    }
    $('.operator').text(oper)
    let extraNum = generateNumbers(result)
    let shuffledNum = shuffleNumbers(result, extraNum[0], extraNum[1])
    $('.btn-1').text(shuffledNum[0])
    $('.btn-2').text(shuffledNum[1])
    $('.btn-3').text(shuffledNum[2])
})

$('.btn').click(e=>{
    console.log($('.btn-'+e.target.classList[1][4]).text())
})

function generateNumbers(num) {
    let random1, random2
    while (true) {
        random1 = (Math.floor(Math.random() * 8) - 4) + num
        random2 = (Math.floor(Math.random() * 8) - 4) + num
        if (!(random1 == random2) && !(num == random1) && !(num == random2)) {
            break
        }
    }
    return [random1, random2]
}

function shuffleNumbers(num1, num2, num3) {
    const arr = [num1, num2, num3]
    for (let i = 0; i < 5; i++) {
        let j = Math.floor(Math.random() * 3)
        let elemToShift = arr.splice(j, 1)
        arr.push(...elemToShift)
    }
    return arr
}