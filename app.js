const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height); //배경색을 white 로 지정 안 해주면 기본 바탕색이 투명으로 나옴
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath(); //path를 생성하고
        ctx.moveTo(x, y); //시작점 지정
    } else {
        ctx.lineTo(x, y); //끝점, path가 계속 연장되는 거임, 여기까지는 계속 마우스가 움직이기만 함
        ctx.stroke(); //그걸 선으로 채워준 것
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color; //새로운 함수 만들 필요 x
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if (filling === true) { //처음에 filling 값을 false 로 줬으니까 여기서 === true 가 의미하는 건 filling이 false라면임
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM() {
    event.preventDefault(); //우클릭 방지
}

function handleSaveClick() {
    const image = canvas.toDataURL(); //이미지를 dataURL로 만들고
    const link = document.createElement("a");
    link.href = image; //a 태그에 url을 박아줌
    link.download = "PaintJs"; //다운로드 시 저장될 이름
    link.click(); //가상의 클릭버튼을 만들어주면 내가 다운로드 링크 누르지 않아도 자동으로 클릭해줘서 다운로드 됨
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

Array.from(colors).forEach (color =>
    color.addEventListener("click", handleColorClick)
); //Array.from(object) 하면 object로 배열을 만들 수 있음. 그리고 foreach로 각각 div 클릭 시 함수 가동

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}