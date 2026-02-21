let list = [];
let delay = 800;

/* C Code Lines */
const cCode = [
"void search(struct node *start, int key) {",
"    int position = 1;",
"    int found = 0;",
"",
"    while (start != NULL) {",
"        if (start->info == key) {",
"            printf(\"Element %d found at position %d.\");",
"            found = 1;",
"            break;",
"        }",
"        start = start->next;",
"        position++;",
"    }",
"",
"    if (!found) {",
"        printf(\"Element not found.\");",
"    }",
"}"
];

function renderCode(activeLine = -1) {
    let codeDiv = document.getElementById("code");
    codeDiv.innerHTML = "";

    cCode.forEach((line, index) => {
        let div = document.createElement("div");
        div.className = "code-line";
        if (index === activeLine) div.classList.add("highlight");
        div.innerText = line;
        codeDiv.appendChild(div);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function draw(activeIndex = -1) {
    let viz = document.getElementById("visualization");
    viz.innerHTML = "";

    list.forEach((val, index) => {
        let node = document.createElement("div");
        node.className = "node";
        if (index === activeIndex) node.classList.add("active");
        node.innerText = val;
        viz.appendChild(node);

        let arrow = document.createElement("div");
        arrow.className = "arrow";
        arrow.innerText = index === list.length - 1 ? "→ NULL" : "→";
        viz.appendChild(arrow);
    });
}

function insertNode() {
    let value = document.getElementById("value").value;
    if (!value) return;
    list.push(parseInt(value));
    draw();
}

async function searchNode() {

    let key = document.getElementById("value").value;
    if (!key) return;
    key = parseInt(key);

    document.getElementById("key").innerText = key;

    let position = 1;
    let found = 0;

    renderCode(1);
    document.getElementById("pos").innerText = position;
    await sleep(delay);

    renderCode(2);
    document.getElementById("found").innerText = found;
    await sleep(delay);

    for (let i = 0; i < list.length; i++) {

        renderCode(4);
        draw(i);
        await sleep(delay);

        renderCode(5);
        document.getElementById("current").innerText = list[i];
        await sleep(delay);

        if (list[i] === key) {

            renderCode(7);
            found = 1;
            document.getElementById("found").innerText = found;
            await sleep(delay);

            alert("Element found at position " + position);
            return;
        }

        renderCode(10);
        await sleep(delay);

        renderCode(11);
        position++;
        document.getElementById("pos").innerText = position;
        await sleep(delay);
    }

    renderCode(14);
    alert("Element not found in the list.");
}

renderCode();
draw();
