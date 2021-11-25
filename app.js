const canvas = document.getElementById("jsCanvas");
//canvas는 2개의 사이즈가 필요하다 하나는 css 나머지는 pixel modifier 사이즈
const ctx = canvas.getContext("2d");
//https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial/Basic_usage
//캔버스는 html의 한요소로 다른점은 context를 갖는다.
//context라는건 한 요소안에서 우리가 픽셀에 접근할 수 있는 방법이다.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//캔버스 화면 기본적으로 하얀색으로 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
//하얀색 설정 끝
ctx.strokeStyle = INITIAL_COLOR;
//strokeStyle 색상이나 스타일을 라인에 사용할 수 있다.
ctx.lineWidth = 2.5;
//붓의크기 default
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;
//let filling = false; 설정한 이유 fill버튼을 클릭하면 붓 색상이 아닌 canvas 배경색을 바꿔야 하기에

function stopPainting() {
    painting = false;//캔버스 벗어나면 false
}

// function startPainting() {
//     painting = true;
// }
const startPainting = (event) => {
    if (filling === false) {
        painting = true;
        console.log(painting);
    }
};
//filling mode에서 클릭하고 드래그하면 잠시 동안 paint(stroke)되고, 마우스를 떼었을 때야 비로소 fill이 되는 현상 해결방법: filling === false일 때만 painting이 true가 되도록 startPainting 콜백함수 변경.
//https://nomadcoders.co/javascript-for-beginners-2/lectures/1493

//선 만들기
function onMouseMove(event) {
    //onMouseMove에서 모든 움직임을 감지하고 라인을 만든다.
    const x = event.offsetX;
    //여기서 offset은 캔버스내의 좌표이다.
    //반대로 client는 전체스크린내의 좌표
    const y = event.offsetY;
    if (painting === false) {
        ctx.beginPath();
        //Path은 기본적인 선
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        //lineTo 마지막 점을 특정 좌표와 직선으로 연결한다.
        ctx.stroke();
        //stroke 획을 긋는다.
    }
}
//선 만들기 끝

//붓 색상변경
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    //event.target.style.backgroundColor 로 선택한 곳의 배경색을 가져온다 우리가 array로 만든 color에서
    //무엇을 가져올지 확인할 필요가 있으면 console.log(event.target.style)을 해보면 된다.
    ctx.strokeStyle = color;//색상변경
    // canvas.style.backgroundColor = color; 배경색 변경
    ctx.fillStyle = color;
}
//붓 색상변경 끝

//붓 크기변경
function handleRangeChange(event) {
    // console.log(event);
    const size = event.target.value;
    ctx.lineWidth = size;
}
//붓 크기변경 끝

//캔버스 배경색 변경

function handelModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }

}

function handelCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
//캔버스 배경색 변경 끝


//
function handleCM(event) {
    event.preventDefault();
} //contextmenu은 마우스 우클릭 방지
//

//저장버튼
function handleSaveClick() {
    const image = canvas.toDataURL("");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";//저장될 파일의 이름
    link.click();
}
//저장버튼 끝

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handelCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick))
//Array.from 메소드는 object로부터 array를 만든다.

//붓크기
if (range) {
    range.addEventListener("input", handleRangeChange);
}

//fill버튼
if (mode) {
    mode.addEventListener("click", handelModeClick)
}

//save버튼
if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}

//'event' only comes when we use a function from 'addEventListener'
//path는 마우스를 움직이는 동안 좌표를 만들고 있다. 다만 클릭 전까지 painting은 false이므로 보여지지 않는다.
//우리가 선을 그릴 땐 한 좌표에서 마우스를 멈추고 클릭하여 다른 좌표로 이어나간다. 이때 시작 점을 moveTo(x, y)로 둔다.
//painting의 기본 값은 false이지만 마우스가 클릭되면 startPainting을 통해 true값이 된다. 때문에 !painting은 false이고 else 안의 lineTo()와 stroke()를 통해 선이 그려지게 된다.

