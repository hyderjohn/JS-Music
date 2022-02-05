const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('.play-btn');
const prevBtn = document.querySelector('#Prev');
const nextBtn = document.querySelector('#Next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');
const searchBar = document.querySelector('.input-group');
const songsFile = document.querySelector('#get-songs');
const SearchBtn = searchBar.querySelector('#button-addon2');


let songsList = []; // array of song list
let currentIndex = 0;
//update song details
function loadSong() {
    let files = songsList[0];
    title.innerText = files[currentIndex].name;
    audio.src = files[currentIndex].webkitRelativePath;
    setSongDuration();
}

function setSongDuration() {
    let songDuration = formatTime(audio.duration);
    const songDurationElem = document.getElementById('end-time');
    songDurationElem.innerHTML = `${songDuration[0]}.${songDuration[1]}`;
}

function setSongs() {
    let songs = document.getElementById('songs');
    songsList.push(songs.files);
    loadSong();
    let songNamesHtml = '';
    for (let i = 0; i < songs.files.length; i++) {
        songNamesHtml += `<li class="list-group-item text-capitalize bg-light" id="song-id-${i}"
        ><a href="#" onclick="playSong(${i})" class="btn song-links" id="link-id-${i}">${songs.files[i].name}</a></li>`;

    }
    document.getElementById('songs_list').innerHTML = songNamesHtml;
}
//<a href='#' onclick='playsong()'> </a>

// var element = document.getElementById("songs_list");
// element.onclick = function() {
//     playSong()
// }

playBtn.addEventListener('click', () => {
    //alert('s');
    const isPlaying = musicContainer.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }

})

function playSong(songIndex = null) {
    let liElems = document.getElementsByClassName('list-group-item');
    let songLinks = document.getElementsByClassName('song-links');
    for (let i = 0; i < liElems.length; i++) {
        liElems[i].classList.remove('bg-success');
        liElems[i].classList.add('bg-light');
        songLinks[i].classList.remove('text-white');
    }
    if (songIndex === null) {
        audio.play();
        let selectedSong = document.getElementById(`song-id-${currentIndex}`);
        let selectedLink = document.getElementById(`link-id-${currentIndex}`);
        selectedSong.classList.remove('bg-light');
        selectedSong.classList.add('bg-success');
        selectedLink.classList.add('text-white');
    } else {
        let files = songsList[0];
        title.innerText = files[songIndex].name;
        audio.src = files[songIndex].webkitRelativePath;
        setSongDuration();
        let selectedSong = document.getElementById(`song-id-${songIndex}`);
        let selectedLink = document.getElementById(`link-id-${songIndex}`);
        selectedSong.classList.remove('bg-light');
        selectedSong.classList.add('bg-success');
        selectedLink.classList.add('text-white');
        audio.play();
    }
    musicContainer.classList.add('play')
    playBtn.querySelector('i.bi').classList.remove('bi-play-circle')
    playBtn.querySelector('i.bi').classList.add('bi-pause-circle')
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.bi').classList.add('bi-play-circle')
    playBtn.querySelector('i.bi').classList.remove('bi-pause-circle')

    audio.pause()
}

function prevSong() {
    //alert('hello')
    currentIndex--
    if (currentIndex < 0) {
        currentIndex = songsList[0].length - 1
    }
    loadSong()
    playSong()
}

function nextSong() {
    currentIndex++
    if (currentIndex > songsList[0].length - 1) {
        currentIndex = 0
    }
    loadSong()
    playSong()
}

function updateProgress(e) {
    let percentage = (audio.currentTime * 100) / audio.duration;
    seek(percentage);
    const currentTimeElem = document.getElementById('current-time');
    let currentTime = formatTime(audio.currentTime);
    currentTimeElem.innerHTML = `${currentTime[0]}.${currentTime[1]}`;
    setSongDuration();
}

function setProgress(e) {
    let currentElem = document.getElementsByClassName('progress')[0]
    let selectedWidth = (e.offsetX / currentElem.scrollWidth) * 100;
    seek(selectedWidth);
    const duration = audio.duration;
    audio.currentTime = (selectedWidth / 100) * duration;


}

function setSearch() {
    alert('hello')
    let value = e.target.value

    if (value && value.trim().length > 0) {
        value = value.trim().toLowerCase()


        setList(songs.filter(person => {
            return songs.name.includes(value)
        }))
    }
}

function seek(value) {
    value = Math.round(value * 100) / 100;
    const progressBar = document.getElementsByClassName('progress-bar')[0];
    progressBar.setAttribute('style', `width:${value}%;transition-timing-function: ease-in; !important`)
}


function formatTime(audio_duration) {
    sec = Math.floor(audio_duration);
    min = Math.floor(sec / 60);
    min = isNaN(min) ? '0' : min;
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor(sec % 60);
    sec = isNaN(sec) ? '0' : sec;
    sec = sec >= 10 ? sec : '0' + sec;
    return [min, sec];
}

function searchSong() {
    //alert('hello')

}

function allSongs() {


}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
audio.addEventListener('timeupdate', updateProgress)
progress.addEventListener('click', setProgress)
searchBar.addEventListener('search', setSearch)
SearchBtn.addEventListener('click', searchSong)
audio.addEventListener('ended', nextSong)
//songs.addEventListener('songs', allSongs)