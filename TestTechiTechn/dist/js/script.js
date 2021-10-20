window.onload=()=>{
    const requestURLs=['https://techi.envivent.com/names.json', 'https://techi.envivent.com/description.json', 'https://techi.envivent.com/images.json'];
    const random=[]
    const randomLength=3
    const min=1
    const max=8
    const img="https://techi.envivent.com/employees/"
    const toggleMenu=document.querySelector('.menuToggle')
    const nav=document.querySelector('nav')

    function sendRequest(method, url){
        return new Promise((resolve, reject)=>{
            const xhr=new XMLHttpRequest();
            xhr.open(method, url);
            xhr.responseType='json'
            xhr.onload=()=>{
                if(xhr.status>=400){
                    reject(xhr.reponse)
                }else{
                    resolve(xhr.response)
                }
                
            }
            xhr.send()
        })
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    while(random.length!=randomLength){
        let ran=getRandom(min, max)
        if(random.includes(ran)){
            // console.log(ran)
        }else{
            random.push(ran)
        } 
    }
    // console.log(random)

    for(j=0; j<random.length; j++){
        let randItem=random[j]

        const ul=document.querySelector('.users')
        const li=document.createElement('li')
        const overuser=document.createElement('div')
        overuser.classList.add('overuser')
        
        ul.appendChild(li)
        li.appendChild(overuser)
        
        for(let i=0; i<requestURLs.length; i++){
            sendRequest('GET', requestURLs[i])
            .then(data =>{
                    getUsers(data, randItem, li, overuser)
                }
            )
            .catch(err => console.log(err))
        }
    }

    function getUsers(jsonObj, id, li, overuser){
        const users=jsonObj['employees'];
        // console.log(users)

        const userById=users.find((u)=>{
            return u.id===id
        })
        // console.log(userById)

        
        if(userById.first_name!=undefined && userById.last_name!=undefined){
        li.insertAdjacentHTML('afterbegin', `
        <h2 class="first">${userById.first_name} ${userById.last_name}</h2>
        `)
        overuser.insertAdjacentHTML('afterbegin', `
        <h2><a>${userById.first_name} ${userById.last_name}</a></h2>
        `)
        }
        if(userById.title!=undefined){
            li.insertAdjacentHTML('beforeend', `<span class="first">${userById.title}</span>`)
            overuser.insertAdjacentHTML('beforeend', `<span>${userById.title}</span>`)
        }
        if(userById.full!=undefined){
            let userImg=`url(${img}/${userById.full})`
            li.style.backgroundImage=userImg
            // console.log(userImg)
        }
        if(userById.description!=undefined){
            overuser.insertAdjacentHTML('beforeend', `<p>${userById.description}</p>`)
        }
    }

    //ToggleMenu

    toggleMenu.addEventListener( "click" , (e) => {
        e.currentTarget.classList.toggle('show')
        nav.classList.toggle('visible')
    })


}
