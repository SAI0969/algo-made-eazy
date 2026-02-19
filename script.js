let list = [];
let delay = 800;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(activeIndex = -1) {
    let viz = document.getElementById("visualization");
    viz.innerHTML = "";
    let type = document.getElementById("listType").value;

    list.forEach((val, index) => {

        let node = document.createElement("div");
        node.className = "node";
        if (index === activeIndex) node.classList.add("active");
        node.innerText = val;
        viz.appendChild(node);

        let arrow = document.createElement("div");
        arrow.className = "arrow";

        if (type === "singly") {
            arrow.innerText = index === list.length - 1 ? "→ NULL" : "→";
        }

        if (type === "doubly") {
            arrow.innerText = index === list.length - 1 ? "→ NULL" : "⇄";
        }

        if (type === "circular") {
            arrow.innerText = index === list.length - 1 ? "↺" : "→";
        }

        viz.appendChild(arrow);
    });
}

function showAlgorithm(steps, activeStep) {
    let algoBox = document.getElementById("algorithm");
    algoBox.innerHTML = "";

    steps.forEach((step, index) => {
        let div = document.createElement("div");
        div.className = "step";
        if (index === activeStep) div.classList.add("active-step");
        div.innerText = step;
        algoBox.appendChild(div);
    });
}

async function insertNode() {
    let value = document.getElementById("value").value;
    if (!value) return;

    let steps = [
        "1. Create new node",
        "2. If list empty, make it head",
        "3. Else traverse to last node",
        "4. Link last node to new node"
    ];

    for (let i = 0; i < steps.length; i++) {
        showAlgorithm(steps, i);
        await sleep(delay);
    }

    list.push(value);
    draw();
}

async function searchNode() {
    let value = document.getElementById("value").value;
    if (!value) return;

    let steps = [
        "1. Start from head",
        "2. Compare node value",
        "3. If match found → Stop",
        "4. Else move to next node"
    ];

    for (let i = 0; i < list.length; i++) {

        showAlgorithm(steps, 1);
        draw(i);
        await sleep(delay);

        if (list[i] == value) {
            alert("Value Found at position " + i);
            return;
        }
    }

    alert("Value Not Found");
}

async function deleteNode() {
    let value = document.getElementById("value").value;
    if (!value) return;

    let steps = [
        "1. Traverse to find node",
        "2. Update links",
        "3. Remove node"
    ];

    for (let i = 0; i < list.length; i++) {

        draw(i);
        await sleep(delay);

        if (list[i] == value) {
            list.splice(i, 1);
            showAlgorithm(steps, 2);
            draw();
            return;
        }
    }

    alert("Value Not Found");
}
