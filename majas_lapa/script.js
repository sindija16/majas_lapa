const mansZimejums = document.getElementById("mansZimejums"); 
const ctx = mansZimejums.getContext("2d"); 

let painting_x = 0;
let painting_y = 0;
const paintingWidth = 70;
const paintingHeight = 70;

let brush_x = 0;
let brush_y = 0;
const brushWidth = 50;
const brushHeight = 50;

let punktuSkaits = 0;
// izveido mainīgo, laika skaitīšanai
let taimeris = 30;
let apturSpeli;

const paintingAtt = new Image();
paintingAtt.src = "https://cdn.pixabay.com/photo/2016/12/17/18/47/painting-1914108_1280.png";

const brushAtt = new Image();
brushAtt.src = "https://cdn.pixabay.com/photo/2016/03/31/22/34/brush-1297095_1280.png";

// izveido funkciju divu zīmējumu saskarei, divi attēlu mainīgie ar x un y
function atteluSaskare(x1, y1, paintingWidth, paintingHeight, x2, y2, brushWidth, brushHeight) {
// pārāk tālu uz sāniem viens objekts no otra
if (x1 >= x2 + brushWidth || x1 + paintingWidth <= x2) return false;
// pārāk zemu vai augstu viens objekts no otra, nesaskaras 
if (y1 >= y2 + brushHeight || y1 + paintingHeight <= y2) return false;
//   ja neizpildās iepriekšminētie nosacījumi nav patiesi,tad
return true;
}

function MyKeyDownHandler(MyEvent) {
if (MyEvent.keyCode == 37 && painting_x > 0) {
painting_x = painting_x - 10;
}
if (MyEvent.keyCode == 39 && painting_x + paintingWidth < mansZimejums.width) {
painting_x = painting_x + 10;
}
}

addEventListener("keydown", MyKeyDownHandler);

function Laukums() {
// notīra zīmēšanas laukumu
ctx.clearRect(0, 0, mansZimejums.width, mansZimejums.height);
// tūlīt pēc canvas notīrīšanas ievieto score uzrakstu ar stilu
ctx.fillStyle = "black";
ctx.font = "15px Arial";
ctx.fillText("Punktu skaits: " + punktuSkaits, 0, 20);
// ievieto taimera uzrakstu ar tādu pašu stilu kā punktu skaita uzrakstu tikai citām y koordinātām, izmantojot metodi, kas palīdzēs mainīt laiku.

ctx.fillText("Laiks: " + Math.round(taimeris), 0, 45);
// uzraksts, kas parādīsies, kad laiks būs beidzies
if (taimeris <= 0) {
ctx.fillStyle = "black";
ctx.font = "bold 40px Arial";
ctx.textAlign = "center";
ctx.fillText("Spēles beigas", mansZimejums.width / 2, mansZimejums.height / 2);
ctx.textAlign = "left";
// aptur spēli
clearInterval(apturSpeli);
return;
}

taimeris -= 1 / 40;

painting_y = mansZimejums.height - paintingHeight;

ctx.drawImage(paintingAtt, painting_x, painting_y, paintingWidth, paintingHeight);

brush_y = brush_y + 3;
if (brush_y > mansZimejums.height) {
brush_y = 0;

brush_x = Math.random() * (mansZimejums.width - brushWidth);
}
ctx.drawImage(brushAtt, brush_x, brush_y, brushWidth, brushHeight);

// attēlu sadursmes pārbaude
if (atteluSaskare(painting_x, painting_y, paintingWidth, paintingHeight, brush_x, brush_y, brushWidth, brushHeight)) {
punktuSkaits++;
brush_x = -brushWidth;
brush_y = 0;
}
}
apturSpeli = setInterval(Laukums, 25);
