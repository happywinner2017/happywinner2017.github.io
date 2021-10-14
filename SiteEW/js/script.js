let date=new Date('Oct 31 2021 00:00:00');
function counts(){
    let now=new Date();
    let gap=date-now;
    
    let days=Math.floor(gap/1000/60/60/24);
    let hours=Math.floor(gap/1000/60/60)%24;
    let minutes=Math.floor(gap/1000/60)%60;
    let seconds=Math.floor(gap/1000)%60;

    if(gap<0){
        let get=document.getElementById('focus')
        get.innerText="Акция завершена";
        console.log(get)
        clearInterval(intId)
    }else{
        document.getElementById('d').innerText=days;
        document.getElementById('h').innerText=hours;
        document.getElementById('m').innerText=minutes;
        document.getElementById('s').innerText=seconds;
    }
    
}
// counts();
const intId=setInterval(counts, 1000);
