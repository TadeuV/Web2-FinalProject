
const baseURL= "https://pokeapi.co/api/v2/pokemon?limit=1154";

const container=document.body.querySelector(".container");
const containerb=document.body.querySelector(".containerb");

var audiopikachu= new Audio('Pikapika.mp3');
audiopikachu.play();
// intro animations
window.addEventListener("load",revealAnimation);

audiopikachu.play();

function revealAnimation() {
    const TimeLine = gsap.timeline({
        defaults:{
            duration:1.5,
            autoAlpha:0,
            ease: Sine.easeO
            // ease:"power2.out"
        }
    });

    TimeLine
    .from("body",{backgroundColor: "black" ,autoAlpha:0})
    .from(".pokebook",{ fontSize:1})
    .audiopikachu.play()
   
}

// fecthing data
async function getData(i){
    const response = await fetch(baseURL);
    const jsonData=response.json();
    jsonData.then(value =>{

        return fetch(value.results[i].url);
        
    }).then (async ind =>{
        const result = await ind.json();

        const type=firstLetter(result.types[0].type.name);
        const height=result.height*10;
        const weight=result.weight/10;
        const xp=result.base_experience;
        const ability=firstLetter(result.abilities[0].ability.name);
        const pokename=firstLetter(result.species.name);
        const hp=result.stats[0].base_stat;
        const attack=result.stats[1].base_stat;
        const defense=result.stats[2].base_stat;
        const sattack=result.stats[3].base_stat;
        const sdefense=result.stats[4].base_stat;
        const speed=result.stats[5].base_stat;
        // console.log(result);
        renderHTML(pokename,type,height,weight,xp,ability,i,hp,speed,attack,defense,sattack,sdefense);
    })
}

let i=0;
getData(0);

// info tab
container.addEventListener("click",function(e){
    if((e.target.parentNode.classList[0] ==="bright")||(e.target.classList[0]==="bright")){
        i+=1;
        if(i>904){
            i=0;
            getData(i);
        }
        
        getData(i);
    }else if((e.target.parentNode.classList[0]==="bleft")||(e.target.classList[0]==="bleft")){
        i-=1;
        if(i<0){
            i=904;
            getData(i);
        }
        getData(i);
    }
})

// battle tab

containerb.addEventListener("click",function(e){
    if((e.target.parentNode.classList[0] ==="bright")||(e.target.classList[0]==="bright")){
        i+=1;
        if(i>904){
            i=0;
            getData(i);
        }
        
        getData(i);
    }else if((e.target.parentNode.classList[0]==="bleft")||(e.target.classList[0]==="bleft")){
        i-=1;
        if(i<0){
            i=904;
            getData(i);
        }
        getData(i);
    }
})

// function to capitalize the first letter of the name
function firstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

// function to modify the index
function padLeft(nr, n, str){
    return Array(n-String(nr).length+1).join(str||'0')+nr;
}

//function find the picture
// imageCreate("pokepics/00"+2+"-Ivysaur.png","Ivysaur")

function imageCreate(src,alt){
    pic=document.body.querySelector(".pokethumb");
    var img = document.createElement("img");
    img.src=src;
    img.alt=alt;

    pic.appendChild(img);

}
function imageCreateb(src,alt){
   
    picb=document.body.querySelector(".pokethumbb");
    var img = document.createElement("img");
    img.src=src;
    img.alt=alt;

    
    picb.appendChild(img);
}
function imageCreatep(src,alt){
    let lastCardp=document.body.querySelector(".allcards :last-child");
    console.log(lastCardp);

    picp=lastCardp.firstElementChild.nextElementSibling;
    var img = document.createElement("img");
    img.src=src;
    img.alt=alt;

    
    picp.appendChild(img);
}


//HTML render function
card=document.body.querySelector(".card");
cardb=document.body.querySelector(".cardb");

function renderHTML(name,type,height,weight,xp,ability,index,hp,speed,attack,defense,sattack,sdefense){

    card.innerHTML= `
    <div class="contName">
        <div class="name">${name}</div>
        <div class="id">${index+1}</div>
    </div>
    <div class="pokethumb">
    </div>
    <div class="stats">
        <div class="info">
            <div class="title">Type:</div>
            <div class="category">${type}</div>
        </div>
        <div class="info">
            <div class="title">Height:</div>
            <div class="height">${height} cm</div>
        </div>
        <div class="info">
            <div class="title">Weight:</div>
            <div class="weight">${weight} kg</div>
        </div>
        <div class="info">
            <div class="title">Base Experience:</div>
            <div class="gender">${xp}</div>
        </div>
        <div class="info">
            <div class="title">Ability:</div>
            <div class="ability">${ability}</div>
        </div>
    </div>
    `;

    cardb.innerHTML= `
    <div class="contNameb">
        <div class="name">${name}</div>
        <div class="id">${index+1}</div>
    </div>
    <div class="pokethumbb">
    </div>
    <div class="stats">
        <div class="infob">
            <div class="dual" id="hp">
                <div class="title">HP:</div>
                <div class="hp">${hp}</div>
            </div>
            <div class="dual" id="speed">
                <div class="title">Speed:</div>
                <div class="speed">${speed}</div>
            </div>
        </div>
        <div class="infog">
            <div class="title">Attack:</div>
            <div class="attack">${attack}</div>
        </div>
        <div class="infog">
            <div class="title">Defense:</div>
            <div class="defense">${defense}</div>
        </div>
        <div class="infog">
            <div class="title">Special Attack:</div>
            <div class="sattack">${sattack}</div>
        </div>
        <div class="infog">
            <div class="title">Special Defense:</div>
            <div class="sdefense">${sdefense}</div>
        </div>
    </div>
    `;
    colorType(type);
    imageCreate("pokepics/"+padLeft(index+1,3)+"-"+name+".png",name);
    imageCreateb("pokepics/"+padLeft(index+1,3)+"-"+name+".png",name);
    
}

//function for the mode buttons

function openTab(evt, buttonName) {
    // Declare all variables
    var i, tabcontent, tabbutton;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.querySelectorAll(".tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tabbutton = document.querySelectorAll(".tabbutton");
    for (i = 0; i < tabbutton.length; i++) {
      tabbutton[i].className = tabbutton[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(buttonName).style.display = "flex";
    evt.currentTarget.className += " active";
  }

//   function of changing the button tabs color 

const button=document.querySelector(".buttonswrapper");
button.addEventListener("click",function (e){
    // console.log(e.target.id);

    bat=document.querySelector("#battlebutton");
    poke=document.querySelector("#pokedexbutton");
    game=document.querySelector("#gamebutton");
    inf=document.querySelector("#infobutton");

    switch (e.target.id) {
        case "battlebutton":
            bat.style.backgroundColor="rgb(218, 61, 74)";
            poke.style.backgroundColor="#313131f3";
            game.style.backgroundColor="#313131f3";
            inf.style.backgroundColor="#313131f3";
            break;
    
        case "pokedexbutton":
            bat.style.backgroundColor="#313131f3";
            poke.style.backgroundColor="var(--pokeblue)";
            game.style.backgroundColor="#313131f3";
            inf.style.backgroundColor="#313131f3";

            // function to load the cards
            break;
    
        case "gamebutton":
            bat.style.backgroundColor="#313131f3";
            poke.style.backgroundColor="#313131f3";
            game.style.backgroundColor="var(--pokeyellow)";
            inf.style.backgroundColor="#313131f3";
            break;
    
        case "infobutton":
            bat.style.backgroundColor="#313131f3";
            poke.style.backgroundColor="#313131f3";
            game.style.backgroundColor="#313131f3";
            inf.style.backgroundColor="var(--bug)";
            break;
    
        default:
            break;
    }
})

//function to change card color type

function colorType(type){

const pokebar=document.querySelector(".contName");
const pokebarb=document.querySelector(".contNameb");

    switch (type) {
        case "Grass":
            pokebar.style.backgroundColor="var(--grass)";
            pokebarb.style.backgroundColor="var(--grass)";
            break;
        case "Fire":
            pokebar.style.backgroundColor="var(--fire)";
            pokebarb.style.backgroundColor="var(--fire)";
            break;
        case "Water":
            pokebar.style.backgroundColor="var(--water)";
            pokebarb.style.backgroundColor="var(--water)";
            break;
        case "Normal":
            pokebar.style.backgroundColor="var(--normal)";
            pokebarb.style.backgroundColor="var(--normal)";
            break;
        case "Poison":
            pokebar.style.backgroundColor="var(--poison)";
            pokebarb.style.backgroundColor="var(--poison)";
            break;
        case "Bug":
            pokebar.style.backgroundColor="var(--bug)";
            pokebarb.style.backgroundColor="var(--bug)";
            break;
        case "Electric":
            pokebar.style.backgroundColor="var(--eletric)";
            pokebarb.style.backgroundColor="var(--eletric)";
            break;
        case "Ground":
            pokebar.style.backgroundColor="var(--groundb)";
            pokebar.style.background="var(--ground)";
            pokebarb.style.backgroundColor="var(--groundb)";
            pokebarb.style.background="var(--ground)";
            break;
        case "Fairy":
            pokebar.style.backgroundColor="var(--fairy)";
            pokebarb.style.backgroundColor="var(--fairy)";
            break;
        case "Fighting":
            pokebar.style.backgroundColor="var(--fighting)";
            pokebarb.style.backgroundColor="var(--fighting)";
            break;
        case "Psychic":
            pokebar.style.backgroundColor="var(--psychic)";
            pokebarb.style.backgroundColor="var(--psychic)";
            break;
        case "Rock":
            pokebar.style.backgroundColor="var(--rock)";
            pokebarb.style.backgroundColor="var(--rock)";
            break;
        case "Ghost":
            pokebar.style.backgroundColor="var(--ghost)";
            pokebarb.style.backgroundColor="var(--ghost)";
            break;
        case "Ice":
            pokebar.style.backgroundColor="var(--ice)";
            pokebarb.style.backgroundColor="var(--ice)";
            break;
        case "Dragon":
            pokebar.style.backgroundColor="var(--dragonb)";
            pokebar.style.background="var(--dragon)";
            pokebarb.style.backgroundColor="var(--dragonb)";
            pokebarb.style.background="var(--dragon)";
            break;
        case "Dark":
            pokebar.style.backgroundColor="var(--dark)";
            pokebarb.style.backgroundColor="var(--dark)";
            break;
        case "Steel":
            pokebar.style.backgroundColor="var(--steel)";
            pokebarb.style.backgroundColor="var(--steel)";
            break;
        case "Flying":
            pokebar.style.backgroundColor="var(--flyingb)";
            pokebar.style.background="var(--flying)";
            pokebarb.style.backgroundColor="var(--flyingb)";
            pokebarb.style.background="var(--flying)";
            break;
    
        default:
            break;
    }
}
//function research

async function getName(input){
    let check=0; 
    const response = await fetch(baseURL);
    const jsonData=response.json();
    jsonData.then(value =>{
        
        
    for(let j=0; j<value.results.length;j++){
        if(value.results[j].name===input){
            check=1;
            getData(j);
            return check;
            // break
            
        }else{
           
        }
    }
    })
    return console.log(check);
}


let inputField=document.querySelector("#byindex");
inputField.addEventListener("keypress",function (e){ 
    if(e.keyCode === 13){
        let input=inputField.value;
        var hasNumber= /\d/; 
        if((input != "")&&(input.trim()!="")){
            // removing all space. Regex method
            filteredInput=input.replaceAll(/\s/g,"");
            if(isNaN(filteredInput)===false){
                filteredInput=+filteredInput;
                getData(filteredInput-1);
            }else if ((isNaN(filteredInput)===true)&&(hasNumber.test(filteredInput)===true)){
                filteredInput=+filteredInput.replace(/[^0-9]/g,'');
                getData(filteredInput-1);    
            }else if((isNaN(filteredInput)===true)&&(hasNumber.test(filteredInput)===false)){
                 filteredInput=filteredInput.toLowerCase();
                 getName(filteredInput);
                
            }else{
                alert("Match not found");
            } 
        }
        else{
            alert("Please type a number or a word");
        }  
        inputField.value="";
    }
        
})
    
// function to load the cards dinamically

let cardpAll=document.body.querySelector(".allcards");

async function loadAllcards(i){
    const response = await fetch(baseURL);
    const jsonData=response.json();
    jsonData.then(value =>{
        
        return fetch(value.results[i].url);
       
    }).then (async ind =>{
        const result = await ind.json();
        const namep=firstLetter(result.name);
        const typep=firstLetter(result.types[0].type.name);
        console.log(i);
        console.log(typep,namep);

    cardpAll.innerHTML +=`
        <div class="cardp">
            <div class="contNamep">
                <div class="namep">${namep}</div>
                <div class="idp">${i+1}</div>
            </div>
            <div class="pokethumbp">
            </div>
            <div class="categoryp">${typep}</div>
        </div>
        `;

        imageCreatep("pokepics/"+padLeft(i+1,3)+"-"+namep+".png",namep);

        // colorPokedex(typep);
    });
};

//loading button function

let buttonLoader=document.querySelector(".loadbutton");
buttonLoader.addEventListener("click",function (e){
    // console.log(e.target.className);

    let counter=18;

    for(let k=0;k<counter;k++){
        loadAllcards(k);
    }

        
})
// loadAllcards(125);

//changing colors of types in Pokedex

function colorPokedex(type){
    let categoryp=document.querySelector(".categoryp");

    switch (type) {
        case "Grass":
            categoryp.style.backgroundColor="var(--grass)";
            break;
        case "Fire":
            categoryp.style.backgroundColor="var(--fire)";
        
            break;
        case "Water":
            categoryp.style.backgroundColor="var(--water)";
       
            break;
        case "Normal":
            categoryp.style.backgroundColor="var(--normal)";
          
            break;
        case "Poison":
            categoryp.style.backgroundColor="var(--poison)";
            break;
        case "Bug":
            categoryp.style.backgroundColor="var(--bug)";
       
            break;
        case "Electric":
            categoryp.style.backgroundColor="var(--eletric)";
        
            break;
        case "Ground":
            categoryp.style.backgroundColor="var(--groundb)";
            categoryp.style.background="var(--ground)";
            break;
        case "Fairy":
            categoryp.style.backgroundColor="var(--fairy)";

            break;
        case "Fighting":
            categoryp.style.backgroundColor="var(--fighting)";
   
            break;
        case "Psychic":
            categoryp.style.backgroundColor="var(--psychic)";
   
            break;
        case "Rock":
            categoryp.style.backgroundColor="var(--rock)";
       
            break;
        case "Ghost":
            categoryp.style.backgroundColor="var(--ghost)";
      
            break;
        case "Ice":
            categoryp.style.backgroundColor="var(--ice)";

            break;
        case "Dragon":
            categoryp.style.backgroundColor="var(--dragonb)";
            categoryp.style.background="var(--dragon)";

            break;
        case "Dark":
            categoryp.style.backgroundColor="var(--dark)";

            break;
        case "Steel":
            categoryp.style.backgroundColor="var(--steel)";
   
            break;
        case "Flying":
            categoryp.style.backgroundColor="var(--flyingb)";
            categoryp.style.background="var(--flying)";
            break;
    
        default:
            break;
    }
}
