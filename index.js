const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CELL_HEIGHT = 120;
const CELL_WIDTH = 120;
const SCROLL_SENSITIVITY = 0.0005;
let MAX_ZOOM = 5;
let MIN_ZOOM = 0.1;
let cameraZoom = 1;
let translationX = 250;
let translationY = 150;
let coordinates = [];

for (let x = 0; x <= 10; x++) {
  for (let y = 0; y <= 10; y++) {
    coordinates.push({
      x: x,
      y: y,
      // color: "#EF6C00CC",
    });
  }
}

console.log("coordinates ->", coordinates);

let currentCoordiante = {
  x: null,
  y: null,
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(translationX, translationY);
  ctx.scale(cameraZoom, cameraZoom);
  for (i = 0; i <= coordinates.length - 1; i++) {
    const coordinate = coordinates[i];
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 2;
    ctx.strokeRect(
      coordinate.x * CELL_WIDTH,
      coordinate.y * CELL_HEIGHT,
      CELL_WIDTH,
      CELL_HEIGHT
    );
    ctx.fillStyle = coordinate.color;
    ctx.fillRect(
      coordinate.x * CELL_WIDTH,
      coordinate.y * CELL_HEIGHT,
      CELL_WIDTH - 1,
      CELL_HEIGHT - 1
    );
    // ctx.font = "12px Arial";
    // ctx.fillText(
    //   `(${coordinate.x},${coordinate.y})`,
    //   coordinate.x * CELL_WIDTH,
    //   coordinate.y * CELL_HEIGHT + 10
    // );
  }
  ctx.restore();
}

draw();

let startX = 0;
let startY = 0;
let dragged = false;
let clicked = false;

canvas.addEventListener("mousedown", function (event) {
  startX = parseInt(event.clientX);
  startY = parseInt(event.clientY);
  dragged = true;
  clicked = true;
});

canvas.addEventListener("mousemove", function (event) {
  clicked = false;
  currentCoordiante = {
    x: Math.floor((event.x - translationX) / (CELL_WIDTH * cameraZoom)),
    y: Math.floor((event.y - translationY) / (CELL_HEIGHT * cameraZoom)),
  };

  if (dragged) {
    let mouseX = parseInt(event.clientX);
    let mouseY = parseInt(event.clientY);
    let dx = mouseX - startX;
    let dy = mouseY - startY;
    translationX += dx;
    translationY += dy;
    draw();
    startX = mouseX;
    startY = mouseY;
  }
});

canvas.addEventListener("mouseup", function () {
  if (clicked) {
    cellClickAnim(
      CELL_HEIGHT * cameraZoom,
      CELL_WIDTH * cameraZoom,
      currentCoordiante.x * CELL_WIDTH * cameraZoom + translationX,
      currentCoordiante.y * CELL_HEIGHT * cameraZoom + translationY
    );

    console.log(currentCoordiante.x, currentCoordiante.y);
    clicked = false;
  }
  dragged = false;
});

function adjustZoom(zoomAmount, zoomFactor) {
  if (!dragged) {
    if (zoomAmount) {
      cameraZoom += zoomAmount;
    } else if (zoomFactor) {
      cameraZoom = zoomFactor * lastZoom;
    }

    cameraZoom = Math.min(cameraZoom, MAX_ZOOM);
    cameraZoom = Math.max(cameraZoom, MIN_ZOOM);
  }
}

canvas.addEventListener("wheel", (e) => {
  adjustZoom(e.deltaY * SCROLL_SENSITIVITY);
  draw();
});

const writeAreaVisibility = (left, top) => {
  const writeAreaEle = document.getElementById("id_write_area");
  return {
    show: () => {
      const subheadingEle = document.getElementById("id_write_text_subheading");
      const textAreaEle = document.getElementById("id_write_text_area");

      textAreaEle.value = "..."

      subheadingEle.innerText = `Relax and write on (${currentCoordiante.x}, ${currentCoordiante.y})`

      writeAreaEle.style.left = left + "px";
      writeAreaEle.style.top = top + "px";

      writeAreaEle.classList.remove("write_area_fade_out");
      writeAreaEle.classList.add("write_area_fade_in");
    },
    hide: () => {
      const wrtieAreaElement =
        document.getElementsByClassName("write_area_fade_in");
      if (Array.from(wrtieAreaElement).length > 0) {
        Array.from(wrtieAreaElement).map((ele) => {
          ele.classList.remove("write_area_fade_in");
          ele.classList.add("write_area_fade_out");
          setTimeout(() => {
            ele.classList.remove("write_area_fade_out");
          }, 300);
        });
      }
    },
  };
};


const readAreaVisibility = (left, top) => {
  const readAreaEle = document.getElementById("id_read_area");
  return {
    show: () => {
      readAreaEle.style.left = left + "px";
      readAreaEle.style.top = top + "px";
      readAreaEle.classList.remove("write_area_fade_out");
      readAreaEle.classList.add("write_area_fade_in");
    },
    hide: () => {
      const readAreaElement =
        document.getElementsByClassName("write_area_fade_in");
      if (Array.from(readAreaElement).length > 0) {
        Array.from(readAreaElement).map((ele) => {
          ele.classList.remove("write_area_fade_in");
          ele.classList.add("write_area_fade_out");
          setTimeout(() => {
            ele.classList.remove("write_area_fade_out");
          }, 300);
        });
      }
    },
  };
};

let ___canClickOnCell___ = true;
const cellClickAnim = (height, width, left, top) => {
  if (!___canClickOnCell___) return;
  ___canClickOnCell___ = false;
  const pressEle = document.getElementById("id_press_cell_ele");
  const pressEleAll = document.getElementsByClassName("press_cell");
  // const writeAreaEle = writeAreaVisibility(left, top);
  const writeAreaEle = readAreaVisibility(left, top);


  const growCell = () => {
    pressEle.style.height = height + "px";
    pressEle.style.width = width + "px";
    pressEle.style.left = left + "px";
    pressEle.style.top = top + "px";
    pressEle.classList.add("press_cell");
    setTimeout(() => {
      writeAreaEle.show();
    }, 1000);
  };

  if (Array.from(pressEleAll).length > 0) {
    Array.from(pressEleAll).map((ele) => {
      ele.classList.remove("press_cell");
      ele.classList.add("close_cell");
      writeAreaEle.hide();
      setTimeout(() => {
        ___canClickOnCell___ = true;
        ele.classList.remove("close_cell");
      }, 800);
    });
  } else {
    growCell();
    setTimeout(() => {
      ___canClickOnCell___ = true;
    }, 1000);
    return;
  }
};
