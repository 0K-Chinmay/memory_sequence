var pattern=[];
var userPattern=[];
const box=document.querySelector('.box');
const P=document.querySelector('.Play');
const square=document.querySelectorAll('.square');
const gamebox=document.querySelector('.gamebox');
const errorbox=document.querySelector('.errorbox');
const img=document.querySelector('.errorbox img');
const tryagain=document.querySelector('.b1');
const arr=Array.from(square);
let x=1;
let k=0;
var count;
var getit;
let j;
const delay = ms => new Promise(res => setTimeout(res, ms));
const createPattern=async ()=>{
    for(k=0;k<x;k++){ 
        j=100;
        await delay(500);
        square[pattern[k]-1].style.animation='1000ms Glow forwards';
        square[pattern[k]-1].style.animationDuration='10s';
        square[pattern[k]-1].style.animationDelay=j+'ms';
        await delay(500);
        square[pattern[k]-1].style.animation='none';
        j+=10;
    }
}
const levels=async ()=>{
      if(x!=1){
          await delay(1000);
      }
      document.getElementById('level').innerHTML=`Level: ${x}`;
      userPattern=[];
      let number=parseInt(Math.random()*10);
      if(number==0){
        pattern.push(1);
      }
      else{
      pattern.push(number);
      }
      await createPattern();
      count=0;
      const myInterval=setInterval(async () => {
        if(userPattern.length==(count+1)){
            if(count<x){
                if(pattern[count]==userPattern[count]){
                    count++;
                }
                else{
                    document.getElementById('level').innerHTML='';
                    gamebox.style.display='none';
                    errorbox.style.display='inline';
                    box.classList.remove('okk');
                    box.style.transform='translate(40%,200%)';
                    box.classList.add('error');
                    tryagain.style.scale='1';
                    tryagain.style.opacity='1';
                    box.style.padding='0';
                    return;
                }
        }
        }
        if(count==x){
            x++;
            
            levels();
        }
    }, 500);
    }
box.addEventListener('click',async ()=>{
    if(x==1){
    box.style.backgroundImage='none';
    errorbox.style.display='none';
    box.style.transform='translate(35%,200%)';    
    box.classList.add('fadeIn');
    P.innerHTML='<br>';
    await levels();
    }
},{once : true}) 
tryagain.addEventListener('click',async ()=>{
        userPattern=[];
        pattern=[];
        x=1;
        tryagain.style.scale='0';
        tryagain.style.opacity='0';
        gamebox.style.display='inline';
        errorbox.style.display='none';
        box.classList.remove('error');
        box.classList.add('okk');
        gamebox.classList.add('ohh');
        P.innerHTML='<br>';
        box.style.transform='translate(40%,200%)';    
        await levels();
} )
async function getBlockIndex(eve){
    if(k==x && userPattern.length!=pattern.length){
     var index=arr.indexOf(eve.target);
     userPattern.push(index+1);
     var t=100;
     square[index].style.animation='1000ms Glow forwards';
     square[index].style.animationDuration='10s';
     square[index].style.animationDelay=t+'ms';
     await delay(500);
     square[index].style.animation='none';    
     t+=10;
    }
    
}
