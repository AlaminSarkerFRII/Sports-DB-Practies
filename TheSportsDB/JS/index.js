
const allPlayers = () =>{

    document.getElementById('players-container').innerHTML = " ";
    document.getElementById('spinner').style.display="block";
    //search & get player with name
    const searchValue = document.getElementById('input-field').value; 
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        if(data.player ==null){
            document.getElementById('spinner').style.display="block";
        }
        else{
            showAllPlayers(data.player);
            document.getElementById('spinner').style.display="none";
        }
    });
}

const showAllPlayers = (players) => {
    // console.log(players.player)
    for(const player of players){
        const playersContainer = document.getElementById("players-container");
        const div = document.createElement("div");
        div.innerHTML = `  <div class="card border p-5">
        <div class="img w-75">
            <img class="w-75" src="${player.strThumb}" alt="" sizes="" srcset="">
        </div>
        <h2> Name : ${player.strPlayer} </h2>
        <h5>Country Name : ${player.strNationality}</h5>
        <p>Team : ${player.strTeam}</p>
        <div class="all-button">
            <button class="btn-danger">Delete</button>
            <button onClick="details('${player.idPlayer}')" class="btn-primary">Details</button>
        </div>
       </div>
       `;

       playersContainer.appendChild(div);
    //    console.log(player);
    }
}

//right side single players details

const details = (id) =>{
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => setDetails(data.players[0]));
}

//show single details

const setDetails = (info) => {
    // console.log(info.strGender)
    if(info.strGender =="Male"){
        document.getElementById('male').style.display = "block";
        document.getElementById('female').style.display = "none";
    } else{

        document.getElementById('female').style.display = "block";
        document.getElementById('male').style.display = "none";
    }

    document.getElementById('details-players').innerHTML = `<div class="card border p-5">
    <div class="img ">
        <img class="w-75" src="${info.strThumb}" alt="" sizes="" srcset="">
    </div>
   <div class="text-primary"> <h2> Name : ${info.strPlayer} </h2>
   <h5>Country Name : ${info.strNationality}</h5>
   <p>Team : ${info.strTeam}</p>
   <p> Date Of Birth : ${info.dateBorn}</p>
   <p>Weight : ${info.strWeight} kg </p>
   </div>
   </div>
   `;
}

