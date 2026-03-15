const TeamNaming = document.getElementById("TeamNaming");
const TeamNamingbtn = document.getElementById("TeamNamingbtn");
const validitionText = document.querySelector(".valid-naming");
const sweetPromt = document.querySelector(".sweetPromt");
const section = document.querySelector("section");

const validition = (str) => {
  if (!str.trim())
    return { status: false, massege: "Must enter one name at least" };
  const names = str.split(",");
  for (let name of names) {
    const n = name.trim();
    if (n.length < 3 || n.length > 20)
      return {
        status: false,
        massege: "Must be name less than 20 char and grater than 3",
      };
  }
  return { status: true };
};

function createUserCard(name) {
  const userCard = document.createElement("div");
  userCard.className = "Tasks-container Users";
  userCard.innerHTML = `
          <div class="header">
            <h3>👤 ${name}</h3>
            <span class="count">0</span>
          </div>
          <div class="no-tasks">
            <p>No Assigned Tasks</p>
          </div>
          <div class="tasks-user"></div>
        `;
  Drop(userCard.querySelector(".tasks-user"));
  section.appendChild(userCard);
}

TeamNamingbtn.addEventListener("click", (e) => {
  e.preventDefault();
  const result = validition(TeamNaming.value);
  if (!result.status) {
    validitionText.textContent = result.massege;
    return;
  }
  sweetPromt.classList.add("d-none");
  TeamNaming.value
    .split(",")
    .map((n) => n.trim())
    .forEach(createUserCard);
});

const taskInput = document.querySelector(".control-task input");
const taskBtn = document.querySelector(".control-task button");
const unassigned = document.querySelector(".tasks-unsigened");
const boardCount = document.querySelector(".Tasks-container .header span");
let taskId = 0;
let draggedEl = null;

taskBtn.addEventListener("click", () => {
  if (!taskInput.value.trim()) return;
  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = `task-${taskId++}`;
  task.innerHTML = `<p>${taskInput.value}</p><span class="delete">×</span>`;
  Drag(task);
  unassigned.appendChild(task);
  taskInput.value = "";
  BoardCount();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".task")?.remove();
    BoardCount();
  }
  if (e.target.classList.contains("task-delete")) {
    const userTask = e.target.closest(".user-task");
    if (userTask.classList.contains("finished")) return;
    const card = userTask.closest(".Tasks-container");
    const title = userTask.querySelector(".task-title").textContent;
    const id = userTask.id;
    const task = document.createElement("div");
    task.className = "task";
    task.draggable = true;
    task.id = id;
    task.innerHTML = `<p>${title}</p><span class="delete">×</span>`;
    Drag(task);
    unassigned.appendChild(task);
    userTask.remove();
    UserCount(card);
    BoardCount();
  }
});
function Drag(elm) {
  elm.addEventListener("dragstart", (e) => {
    if (elm.classList.contains("finished")) {
      e.preventDefault();
      return;
    }
    draggedEl = elm;
    e.dataTransfer.setData("id", elm.id);
    e.dataTransfer.setData(
      "type",
      elm.classList.contains("user-task") ? "user" : "board",
    );
  });

  elm.addEventListener("dragend", () => {
    elm.classList.remove("dragging");
    draggedEl = null;
  });
}

function Drop(area) {
  area.addEventListener("dragenter", function (e) {
    e.preventDefault();
    this.classList.add("drop-hover");
  });

  area.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  area.addEventListener("dragleave", function (e) {
    this.classList.remove("drop-hover");
  });

  area.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("drop-hover");
    const id = e.dataTransfer.getData("id");
    const type = e.dataTransfer.getData("type");
    const task = document.getElementById(id);
    if (!task) return;
    if (task.classList.contains("finished")) return;
    if (type === "board") {
      const userTask = ChangeTypeTask(task);
      this.appendChild(userTask);
      UserCount(this.closest(".Tasks-container"));
      BoardCount();
      return;
    } else if (type === "user") {
      const oldCard = task.closest(".Tasks-container");
      this.appendChild(task);
      UserCount(this.closest(".Tasks-container"));
      if (oldCard) UserCount(oldCard);
      return;
    }
  });
}

function ChangeTypeTask(task) {
  const div = document.createElement("div");
  div.className = "user-task not-started";
  div.draggable = true;
  div.id = task.id;
  div.innerHTML = `
          <div class="task-header">
            <span class="task-title">${task.querySelector("p").textContent}</span>
            <button class="task-delete">✕</button>
          </div>
          <select class="task-status">
            <option>Not Started</option>
            <option>Ongoing</option>
            <option>Finished</option>
          </select>
        `;
  Drag(div);
  TaskStatus(div);
  task.remove();
  return div;
}

function TaskStatus(task) {
  task.querySelector(".task-status").addEventListener("change", (e) => {
    task.classList.remove("not-started", "ongoing", "finished");
    if (e.target.value === "Not Started") task.classList.add("not-started");
    if (e.target.value === "Ongoing") task.classList.add("ongoing");
    if (e.target.value === "Finished") task.classList.add("finished");
  });
}

function UserCount(card) {
  const count = card.querySelectorAll(".user-task").length;
  card.querySelector(".count").textContent = count;
  card.querySelector(".no-tasks").classList.toggle("d-none", count > 0);
}

function BoardCount() {
  boardCount.textContent = unassigned.children.length;
}

document.querySelectorAll(".task").forEach((task) => Drag(task));
document.querySelectorAll(".tasks-user").forEach((area) => Drop(area));
BoardCount();

// const TeamNaming = document.getElementById("TeamNaming");
// const TeamNamingbtn = document.getElementById("TeamNamingbtn");
// const validitionText = document.querySelector(".valid-naming");
// const sweetPromt = document.querySelector(".sweetPromt");
// const section = document.querySelector("section");

// const validition = (str) => {
//   if (!str.trim())
//     return { status: false, massege: "Must enter one name at least" };
//   const names = str.split(",");
//   for (let name of names) {
//     const n = name.trim();
//     if (n.length < 3 || n.length > 20)
//       return {
//         status: false,
//         massege: "Must be name less than 20 char and grater than 3",
//       };
//   }
//   return { status: true };
// };

// function createUserCard(name) {
//   const userCard = document.createElement("div");
//   userCard.className = "Tasks-container Users";
//   userCard.innerHTML = `
//           <div class="header">
//             <h3>👤 ${name}</h3>
//             <span class="count">0</span>
//           </div>
//           <div class="no-tasks">
//             <p>No Assigned Tasks</p>
//           </div>
//           <div class="tasks-user"></div>
//         `;
//   enableDrop(userCard.querySelector(".tasks-user"));
//   section.appendChild(userCard);
// }

// TeamNamingbtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   const result = validition(TeamNaming.value);
//   if (!result.status) {
//     validitionText.textContent = result.massege;
//     return;
//   }
//   sweetPromt.classList.add("d-none");
//   TeamNaming.value
//     .split(",")
//     .map((n) => n.trim())
//     .forEach(createUserCard);
// });

// const taskInput = document.querySelector(".control-task input");
// const taskBtn = document.querySelector(".control-task button");
// const unassigned = document.querySelector(".tasks-unsigened");
// const boardCount = document.querySelector(".Tasks-container .header span");
// let taskId = 0;
// let draggedEl = null;

// taskBtn.addEventListener("click", () => {
//   if (!taskInput.value.trim()) return;
//   const task = document.createElement("div");
//   task.className = "task";
//   task.draggable = true;
//   task.id = `task-${taskId++}`;
//   task.innerHTML = `<p>${taskInput.value}</p><span class="delete">×</span>`;
//   enableDrag(task);
//   unassigned.appendChild(task);
//   taskInput.value = "";
//   updateBoardCount();
// });

// document.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     e.target.closest(".task")?.remove();
//     updateBoardCount();
//   }
//   if (e.target.classList.contains("task-delete")) {
//     const userTask = e.target.closest(".user-task");

//     // لو Finished ممنوع تحذفه
//     if (userTask.classList.contains("finished")) return;

//     const card = userTask.closest(".Tasks-container");
//     const title = userTask.querySelector(".task-title").textContent;
//     const id = userTask.id;

//     // ارجع تاسك للبورد
//     const task = document.createElement("div");
//     task.className = "task";
//     task.draggable = true;
//     task.id = id;
//     task.innerHTML = `<p>${title}</p><span class="delete">×</span>`;
//     enableDrag(task);
//     unassigned.appendChild(task);

//     userTask.remove();
//     updateUserCount(card);
//     updateBoardCount();
//   }
// });

// function enableDrag(elm) {
//   elm.addEventListener("dragstart", (e) => {
//     if (elm.classList.contains("finished")) {
//       e.preventDefault();
//       return;
//     }
//     draggedEl = elm;
//     e.dataTransfer.setData("id", elm.id);
//     e.dataTransfer.setData(
//       "type",
//       elm.classList.contains("user-task") ? "user" : "board",
//     );
//     setTimeout(() => elm.classList.add("dragging"), 0);
//   });
//   elm.addEventListener("dragend", () => {
//     elm.classList.remove("dragging");
//     draggedEl = null;
//   });
// }

// function enableDrop(area) {
//   area.addEventListener("dragover", (e) => {
//     e.preventDefault();
//     e.dataTransfer.dropEffect = "move";
//   });

//   area.addEventListener("dragenter", function (e) {
//     e.preventDefault();
//     this.classList.add("drop-hover");
//   });

//   area.addEventListener("dragleave", function (e) {
//     // تأكد إن الماوس فعلاً خرج من الـ area مش دخل child
//     if (!this.contains(e.relatedTarget)) {
//       this.classList.remove("drop-hover");
//     }
//   });

//   area.addEventListener("drop", function (e) {
//     e.preventDefault();
//     this.classList.remove("drop-hover");

//     const id = e.dataTransfer.getData("id");
//     const type = e.dataTransfer.getData("type");
//     const task = document.getElementById(id);

//     if (!task) return;
//     if (task.classList.contains("finished")) return;

//     if (type === "board") {
//       const userTask = convertToUserTask(task);
//       this.appendChild(userTask);
//       updateUserCount(this.closest(".Tasks-container"));
//       updateBoardCount();
//       return;
//     }

//     if (type === "user") {
//       const oldCard = task.closest(".Tasks-container");
//       this.appendChild(task);
//       updateUserCount(this.closest(".Tasks-container"));
//       if (oldCard) updateUserCount(oldCard);
//       return;
//     }
//   });
// }

// function convertToUserTask(task) {
//   const div = document.createElement("div");
//   div.className = "user-task not-started";
//   div.draggable = true;
//   div.id = task.id;
//   div.innerHTML = `
//           <div class="task-header">
//             <span class="task-title">${task.querySelector("p").textContent}</span>
//             <button class="task-delete">✕</button>
//           </div>
//           <select class="task-status">
//             <option>Not Started</option>
//             <option>Ongoing</option>
//             <option>Finished</option>
//           </select>
//         `;
//   enableDrag(div);
//   enableUserTask(div);
//   task.remove();
//   return div;
// }

// function enableUserTask(task) {
//   task.querySelector(".task-status").addEventListener("change", (e) => {
//     task.classList.remove("not-started", "ongoing", "finished");
//     const deleteBtn = task.querySelector(".task-delete");
//     if (e.target.value === "Not Started") {
//       task.classList.add("not-started");
//       deleteBtn.style.display = "flex";
//     }
//     if (e.target.value === "Ongoing") {
//       task.classList.add("ongoing");
//       deleteBtn.style.display = "flex";
//     }
//     if (e.target.value === "Finished") {
//       task.classList.add("finished");
//       deleteBtn.style.display = "none";
//     }
//   });
// }

// function updateUserCount(card) {
//   const count = card.querySelectorAll(".user-task").length;
//   card.querySelector(".count").textContent = count;
//   card.querySelector(".no-tasks").classList.toggle("d-none", count > 0);
// }

// function updateBoardCount() {
//   boardCount.textContent = unassigned.children.length;
// }

// document.querySelectorAll(".task").forEach((task) => enableDrag(task));
// document.querySelectorAll(".tasks-user").forEach((area) => enableDrop(area));
// updateBoardCount();
