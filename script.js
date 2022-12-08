console.log("welcome to spotify");

//initialixe variables
let songIndex =0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs= [
    {songName: "Song1", filePath: "song/1.mp3", coverPath: "cover/1.jpg"},
    {songName: "Song2", filePath: "song/2.mp3", coverPath: "cover/2.jpg"},
    {songName: "Song3", filePath: "song/3.mp3", coverPath: "cover/3.jpg"},
    {songName: "Song4", filePath: "song/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "Song5", filePath: "song/5.mp3", coverPath: "cover/5.jpg"},
    {songName: "Song6", filePath: "song/6.mp3", coverPath: "cover/6.jpg"},
    {songName: "Song7", filePath: "song/7.mp3", coverPath: "cover/7.jpg"},
]

//handle pasue/play
songItems.forEach((element,i)=>{
element.getElementsByTagName("img")[0].src = songs[1].coverPath;
element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime <=0){
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity=1;
  }else{
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity=0;
  }
});


//listen to events
audioElement.addEventListener('timeupdate', ()=>{
  //update seekbar
 progress = parseInt((audioElement.currentTime/audioElement.duration) *100);
 myProgressBar.value= progress;

});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= myProgressBar.value * audioElement.duration/100;
});

const makeAllPlays =()=>{
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  })
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
  console.log(e);
  makeAllPlays();
  songIndex = parseInt(e.target.id);
  e.target.classList.remove('fa-play-circle');
  e.target.classList.add('fa-pause-circle');
  audioElement.src = `song/${songIndex+1}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.currentTime =0;
  audioElement.play();
  gif.style.opacity=1;
  masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
if(songIndex>=6){
  songIndex= 0;
}else{
  songIndex +=1;
}
audioElement.src = `song/${songIndex+1}.mp3`;
masterSongName.innerText=songs[songIndex].songName;

audioElement.currentTime =0;
audioElement.play();
gif.style.opacity=1;
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex <=0){
    songIndex=6;
  }else{
    songIndex -=1;
  }
  audioElement.src = `song/${songIndex+1}.mp3`;
  masterSongName.innerText=songs[songIndex].songName;
  audioElement.currentTime =0;
  audioElement.play();
  gif.style.opacity=1;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  
  })