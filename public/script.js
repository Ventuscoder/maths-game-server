let result, timer, remainingTime
let timerStatus = false

$('.ask-btn').click(() => {
    if (timerStatus) {
        $('.points-input').attr('value', $('.points-input').attr('value')-2)
        $('.question-status').text('Your points have been decreased for clicking on the question generator button while the timer is running')
        timerStatus = false
        clearInterval(timer)
    } else {
        let firstNum, secondNum
        firstNum = Math.floor(Math.random() * 30) + 1
        secondNum = Math.floor(Math.random() * 30) + 1
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
        let endTime = new Date().getTime() + 5000
        timer = setInterval(()=>{
            $('.question-status').text('Timer is running!')
            timerStatus = true
            let now = new Date().getTime()
            remainingTime = endTime-now
            $('.time-left').text((remainingTime-(remainingTime%10))/1000)
            console.log('remaining time', remainingTime)
            if (remainingTime <= 0) {
                $('.time-status').text('Time up! ')
                $('.points-input').attr('value', $('.points-input').attr('value')-3)
                $('.question-status').text('You lost points since the timer is up!')
                timerStatus = false
                clearInterval(timer)
            }
        }, 1)
    }
})

$('.btn').click(e=>{
    let ans = $('.btn-'+e.target.classList[1][4]).text()
    if (ans == result) {
        console.log('correct answer')
        $('.points-input').attr('value', Number($('.points-input').attr('value'))+Math.floor(remainingTime/1000)+1)
        $('.question-status').text('Correct answer! Your point total for today has been increased')
    } else {
        console.log('wrong answer')
        $('.points-input').attr('value', $('.points-input').attr('value')-3)
        $('.question-status').text('Wrong answer! Your point total has been decreased')
    }
    timerStatus = false
    clearInterval(timer)
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