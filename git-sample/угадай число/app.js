const secretNum = Math.ceil(Math.random() * 10);
let trels=5;

function guessNum(num){
while(trels>=0){
    if(trels==0){
        alert(`Вы проиграли у вас ${trels}` )
        if(confirm((`Вы проиграли у вас ${trels} Хотите сыграть заново ?`))){
            trels=5
        }
        break;
    }

        if(num==secretNum ){
            if(confirm((`Вы выйграли с ${trels+1-trels} попытки  хотите сыграть заново ?`))){
                trels=5
            }
            break
        }
           
        
        else{
            alert('Вы не угадали число')
       
            trels=trels-1
            document.getElementById ("trels").value = trels ;
            if(confirm((`Хотите подсказку ?`))){
               alert( "это число "+ secretNum>num?`это число больше вашегочисла ${num}`:`это число меньше вашегочисла ${num}`)
            }
            if(confirm((`продалжайте стараьтся вашь шанс выйграть составляет ${Math.ceil(trels/(10-1)*100)/100} %`))){
            }
            break;
        }
        
    }
    
}


/*const secretNum = Math.ceil(Math.random() * 10);
        let tries = 0;
        
        function guessNum(num) {}*/