const getRandomNumber = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
}

const getRandomRGB = () => {
    const R = getRandomNumber(0, 255);
    const G = getRandomNumber(0, 255);
    const B = getRandomNumber(0, 255);

    return `${R}, ${G}, ${B}`;
}

const convertRGBtoHEX = (RGB) => {
    const HEX = RGB.split(',').map((color) => {
        const temp_color = parseInt(color.trim()).toString(16);
        return temp_color.length == 1 ? "0" + temp_color : temp_color;
    });

    return `#${HEX.join('')}`;
}

const getRandomHEX = () => {
    return "#" + getRandomNumber(0, 0xFFFFFF).toString(16);
}

const createNotification = (backgroundColor) => {
    const notification = document.createElement('div');
    const text = document.createElement('p');

    notification.classList.add("notification");
    text.classList.add("notification__text");

    text.textContent = "Copied to clipboard"

    notification.style.backgroundColor = backgroundColor;

    notification.appendChild(text);
    document.getElementById('notifications').appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const copy = (value) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(value);
        createNotification(value);
    }
}

const createBlock = () => {
    const div = document.createElement("div");
    div.classList.add('block');

    const RGB = getRandomRGB();
    const HEX = convertRGBtoHEX(RGB);

    div.setAttribute("data-rgb", RGB);
    div.setAttribute("data-hex", HEX);

    div.style.backgroundColor = `rgb(${RGB})`;

    const copyButtonRGB = document.createElement("button");
    copyButtonRGB.classList.add('button', 'block__button');
    copyButtonRGB.textContent = `rgb(${RGB})`;

    const copyButtonHEX = document.createElement("button");
    copyButtonHEX.classList.add('button', 'block__button');
    copyButtonHEX.textContent = HEX;

    div.appendChild(copyButtonHEX);
    div.appendChild(copyButtonRGB);

    copyButtonRGB.addEventListener("click", (e) => {
        copy(`rgb(${e.target.parentElement.dataset.rgb})`)
    })

    copyButtonHEX.addEventListener("click", (e) => {
        copy(e.target.parentElement.dataset.hex);
    })

    return div;
}

const displayBlocks = (limit) => {
    GRID.insertAdjacentElement('beforeend', createBlock());

    const blocks = GRID.querySelectorAll('.block');
    const length = blocks.length;

    if (limit < length) {
        for (let i = limit; i < length; i++) {
            blocks[i].remove();
        }

        return;
    }
};

const GRID = document.querySelector(".grid");

const range = document.querySelector(".range");
const input = range.querySelector(".range__control");
const counter = range.querySelector("#currentCount");

input.addEventListener("input", (e) => {
    const self = e.target;
    const value = self.value;

    counter.textContent = value;
    displayBlocks(Number(value));
});

GRID.insertAdjacentElement("beforeend", createBlock());