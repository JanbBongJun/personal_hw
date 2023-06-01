const ball = document.createElement('div');
ball.appendChild(document.createTextNode('Go Home!'));
ball.classList.add('ball');
document.body.appendChild(ball);

let pressed = false;

function stateChanger(width, height, backgroundColor) {
  ball.style.backgroundColor = backgroundColor;
  ball.style.width = `${width}px`;
  ball.style.height = `${height}px`;
}

function animationManage() {
  const addOne = pressed ? 'animation-move' : 'animation-end';
  const removeOne = pressed ? 'animation-end' : 'animation-move';
  const cursorStyle = pressed ? 'grab' : 'pointer';
  const innerHTML = pressed ? 'Go Home' : 'Grab Me!!';

  ball.classList.add(addOne);
  ball.classList.remove(removeOne);
  ball.style.cursor = cursorStyle;
  ball.innerHTML = innerHTML;
}
function onMouseMove() {
  if (pressed) {
    ball.style.top = window.event.pageY - 50 + 'px';
    ball.style.left = window.event.pageX - 50 + 'px';
  }
}
function onMouseUp() {
  pressed = false;
  animationManage();
  stateChanger(200, 200, 'black');
}
function onMouseDown() {
  pressed = true;
  animationManage();
  stateChanger(150, 150, 'coral');
  onMouseMove();
}
ball.addEventListener('mousedown', onMouseDown);
ball.addEventListener('mouseup', onMouseUp);
ball.addEventListener('mousemove', onMouseMove);


function getBall(){
    return ball
}

ball.onclick=function () {
     movieTrend.return_tmdb_data(movie_make);
 }