$('.ask-btn').click(() => {
    let firstNum, secondNum
    firstNum = Math.floor(Math.random() * 20) + 1
    secondNum = Math.floor(Math.random() * 20) + 1
    $('.first-num').text(firstNum)
    $('.last-num').text(secondNum)
    let randomNum = Math.floor(Math.random() * 20) + 1
    let oper, result
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
    $('.b1').text(shuffledNum[0])
    $('.b2').text(shuffledNum[1])
    $('.b3').text(shuffledNum[2])
})

function generateNumbers(num) {
    const randomNum1 = Math.floor(Math.random() * 6) - 3
    const randomNum2 = Math.floor(Math.random() * 6) - 3
    return [num + randomNum1, num + randomNum2]
}

function shuffleNumbers(num1, num2, num3) {
    const arr = [num1, num2, num3]
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}