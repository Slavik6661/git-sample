let i=0
var riddle = {
    question: ['Каких камне не бывает в речке','Что не вместится в самую большую кастрюлю ','что может одновременно стоять и ходить висеть и стоять ходить и лежать'],
    correctAnswer: ['мокрых','крышка','часы'],
    hints: ['что-то связанное с местом где они находятся', 'H2O','это что-то идет в комплекте ','это что-то сверху','у этого предмеиа есть стрелки','его часто ноасят на руках'],
    tries: 5,
    
    
    checkAnswer(str) {
    
        // TODO: написать логику проверки правильного ответа
        // alert для пользователя, console.log()
       
        if (this.tries < 1) {
            console.log('Игра окончена');
            return alert('Игра окончена');
        }
        if(i>=this.question.length){
            return alert('вы оветили на все загадки');
           
            
           }
        if (str.toLowerCase().includes(this.correctAnswer[i])) {
            alert('Правильный ответ');
            console.log('Правильный ответ');
             i++
             document.getElementById('riddle').innerText = riddle.question[i];
            this.tries++;
            document.getElementById ("trels").value =this.tries;
           

        } else {
            alert('Неправильный ответ');
            console.log('Неправильный ответ');
            this.tries--;
            document.getElementById ("trels").value =this.tries;

            if(confirm((`Хотите подсказку ?`))){
            const hint = this.hints[this.tries % 2 ==0? [i] : [i+1]];


            if (this.tries) {
                alert('Подсказка: ' + hint );
            }
            }
        }
    },
}
    
window.onload = function() {
   
 document.getElementById('riddle').innerText = riddle.question[i];
}  


function check() {
    var input = document.getElementsByTagName('input')[1];
    

    var guessedAnswer = input.value;

    if (guessedAnswer) {
        // TODO: вызвать функцию checkAnswer у объекта загадки, передав туда ответ
        riddle.checkAnswer(guessedAnswer);
    }
    
}
