// min 이상 max 이하의 숫자들이 순서대로 들어있는 array를 만든다.
function range(min, max) {
  var result = [];

  for (var i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
}

// array에서 n개의 임의의 원소를 남긴다.
function pick(array, n) {
  var delCount = array.length - n;

  for (var i = 0; i < delCount; i++) {
    var idx = Math.round(Math.random() * (array.length - 1));
    array.splice(idx, 1);
  }
}

// 게임 상태
var $$dog = document.getElementsByClassName('dog');
var count = 0;
var indices = [];
var failcount = 0;
var time = 0;
var tiktok = null;
// 게임을 시작한다.
function startGame() {
  var startmusic = new Audio();
  startmusic.src = '강아지media/tada.mp3';
  startmusic.play();
  count = parseInt(prompt("숨은 달걀 몇개로 할까요?:"));
  if (count >= 8) {
    alert('8미만 숫자만 가능해요');
    return;
  }
  time = parseInt(prompt("몇 초만에 하실래요?"));
  if (time >= 30) {
    alert('30초 넘으면 안돼요');
    return;
  }  //개수랑 시간 정하기
  //var gamestart = document.getElementById('gamestart');
  //gamestart.style.visibility = "hidden";
  $('#gamestart').css('visibility', 'hidden'); //jQuery 사용하기
  var timer = document.getElementById('timer');
  timer.innerHTML = "남은 시간: " + time;

  var $count = document.getElementById('count');
  $count.innerHTML = count;
  //정한 값으로 메뉴 내용을 업데이트 해준다.
  indices = range(0, $$dog.length - 1) //배열에 24 크기설정(td개수)
  pick(indices, count); //랜덤으로 강아지그림을 pick해준다

  for (var i = 0; i < $$dog.length; i++) {
    var $dog = $$dog[i]; //td태그들에게 배열인덱스 할당해주기

    $dog.game = {index: i}; //프로퍼티 만들어준다
    $dog.addEventListener('click', handleDogClick); //click이벤트로 강아지찾는 함수실행
  }
  for (var i = 0; i < $$dog.length; i++) {
    var $dog = $$dog[i];
    var $img = $dog.firstChild;

    $img.src = '강아지media/img1.gif';
  } //다시시작할떄 리셋 해주기 위함


  showDogs();
  setTimeout(hideDogs, 10 * 1000); //10초 지나면 강아지 다시 숨겨주기
  setTimeout(clockStrat, 5*1000); // 5초지나면 시계소리 시작
}


var timecount = setInterval(timeCount(), 1000);

function timeCount() { //남은시간 계산해주는 함수
  time -- ;
  var timer = document.getElementById('timer');
  timer.innerHTML = "남은 시간: " + time;
    if (time <= 0) {
      time = 0;
      clearInterval(timecount);
      alert("Game Over!");
      //gamestart.style.visibility = "visible";
      $('#gamestart').css('visibility', 'visible'); //jQuery사용하기2
      announce.innerHTML = "실패"; //시간이 0이돼도 실패
      var audio3 = new Audio();
      audio3.src = '강아지media/bi.mp3';
      audio3.play(); //시간초과시 삐 소리-
    }
}

function clockAudio() { //짹깍짹깍 소리
  var clock = new Audio();
  clock.src = '강아지media/clock.mp3';
  clock.play();
}
function clockStrat() {
  tiktok = setInterval(clockAudio, 1000);
}


//숨어있는 강아지그림 보여주는 함수
function showDogs() {
  for (var i = 0; i < indices.length; i++) {
    var $dog = $$dog[indices[i]];
    var $img = $dog.firstChild;

    $img.src = '강아지media/img2.gif';
  }
  var announce = document.getElementById('announce');
  announce.innerHTML = "숨은 그림을 보세요";
}

function hideDogs() {
  for (var i = 0; i < $$dog.length; i++) {
    var $dog = $$dog[i];
    var $img = $dog.firstChild;

    $img.src = '강아지media/img1.gif';
  }
  clearInterval(tiktok);
}

function handleDogClick() {  //숨은 강아지 찾는 함수
  var fail = document.getElementById('fail');
  var $count = document.getElementById('count');
  var gamestart = document.getElementById('gamestart');
  var announce = document.getElementById('announce');
  announce.innerHTML = "정답을 찾으세요";
  var isCorrect = indices.indexOf(this.game.index) >= 0;

  if (isCorrect) { //숨은그림찾기 함수
    this.firstChild.src = '강아지media/img2.gif';
    count--;
    $count.innerHTML = count;
    var audio2 = new Audio();
    audio2.src = '강아지media/chimes.mp3';
    audio2.play(); //정답소리
    if (count <= 0) {
      count = 0;
      alert("Success");
      var clap = new Audio();
      clap.src = '강아지media/ending.mp3';
      clap.play(); //빵빠레
      gamestart.style.visibility = "visible";
    }
   } else {
    this.firstChild.src = '강아지media/img1.gif';
    failcount++;
    fail.innerHTML = failcount;
    var audio1 = new Audio();
    audio1.src = '강아지media/bad.mp3';
    audio1.play(); //오류소리 삐-
    if (failcount > 5) {
      alert("Game Over!");
      gamestart.style.visibility = "visible";
      announce.innerHTML = "실패";
      failcount = 0;
      fail.innerHTML = 0; //초기화 시켜주기
    }
   }
 }

 function backgroundMusic() { //배경음악...시험기간엔 술이 땡기는거 같습니다...;;
   var backMusic = new Audio();
   backMusic.src = '강아지media/지아-01-술 한잔 해요-술 한잔 해요-128.mp3';
   backMusic.play();
 }

 //한 학기 동안 많이 배웠습니다, 감사합니다 교수님.
