/********** ELEMENTS **********/
const elements = {
  body: document.querySelector("body"),
  navbar: document.querySelector(".navbar"),
  open_spotlight: document.querySelector(".open_Search"),
  spotlight_search: document.querySelector(".spotlight_serach"),
  brightness_range: document.getElementById("brightness"),
  sound_range: document.getElementById("sound"),
  clockElement: document.getElementById("clock"),
  clockWrapper: document.querySelector(".clock"),
  widgetsPanel: document.querySelector(".widgets-panel"),
  batteryButton: document.querySelector(".battery"),
  batteryText: document.querySelector(".battery__text"),
  batteryPopup: document.querySelector(".battery__popup"),
  batteryPopupText: document.querySelector(".battery__popup header span"),
  batteryProgress: document.querySelector(".battery__progress"),
  batteryIsChargingLogo: document.querySelector(".is-charging"),
  powerSource: document.querySelector(".power-source"),
};

// Notes App
const notesApp = {
  app_name: document.querySelector("#Notes"),
  window: document.querySelector(".note"),
  full: document.querySelector(".full-note"),
  close: document.querySelector(".close-note"),
  backfull: document.querySelector(".backfull-note"),
  point: document.querySelector("#point-note"),
  adding: document.querySelector(".adding"),
  deleting: document.querySelector(".deleting"),
  content_typing: document.querySelector(".content__typing"),
  opening: document.querySelector(".open-note"),
};

// Terminal App
const terminalApp = {
  app_name: document.querySelector("#Terminal"),
  window: document.querySelector(".terminal"),
  full: document.querySelector(".full"),
  close: document.querySelector(".close"),
  backfull: document.querySelector(".backfull"),
  point: document.querySelector("#point-terminal"),
  content: document.querySelector(".terminal .terminal_content"),
  taskbar: document.querySelector(".terminal .window__taskbar"),
  opening: document.querySelector(".open-terminal"),
};

// Maps App
const mapsApp = {
  app_name: document.querySelector("#map"),
  window: document.querySelector(".maps"),
  full: document.querySelector(".full-map"),
  close: document.querySelector(".close-map"),
  backfull: document.querySelector(".backfull-map"),
  point: document.querySelector("#point-maps"),
  opening: document.querySelector(".open-map"),
};

// Launchpad
const launchpad = {
  container: document.querySelector(".container__Window"),
  window: document.querySelector(".launchpad"),
  searchbox: document.querySelector(".launchpad .searchbox"),
  app_container: document.querySelector(".Apps-container"),
  point: document.querySelector("#point-launchpad"),
  opening: document.querySelector(".open-lunchpad"),
};

function handleMinimize(Minimize) {
  Minimize.style.maxWidth = "80%";
  Minimize.style.minWidth = "70%";
  Minimize.style.height = "430px";
}

function handleFullScreen(maximize) {
  maximize.style.maxWidth = "95%";
  maximize.style.minWidth = "95%";
  maximize.style.height = "90%";
}

function close_window(close, point, appName) {
  close.style.display = "none";
  point.style.display = "none";
  appName.style.display = "none";
}

function open_window(open, point, appName) {
  elements.navbar.style.display = "flex";
  open.style.display = "block";
  launchpad.container.style.display = "flex";
  launchpad.window.style.display = "none";
  launchpad.point.style.display = "none";
  appName.style.display = "block";
  point.style.display = "block";
}

// Launchpad function start
launchpad.opening.addEventListener("click", handleOpenLaunching);

function handleOpenLaunching() {
  if (launchpad.window.style.display === "none") {
    launchpad.window.style.display = "block";
    elements.navbar.style.display = "none";
    launchpad.point.style.display = "block";
  } else {
    launchpad.window.style.display = "none";
    elements.navbar.style.display = "flex";
    launchpad.point.style.display = "none";
  }
  launchpad.container.style.display = "none";
}

function handleLaunchpadSearch(e) {
  for (let app of launchpad.app_container.children) {
    if (e.target.value) {
      app.style.display = "none";
      if (app.dataset.keywords.includes(e.target.value)) {
        app.style.display = "flex";
      }
    } else app.style.display = "flex";
  }
}
// Launchpad function end

handleOpenLaunching();

terminalApp.close.addEventListener("click", () =>
  close_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);

terminalApp.full.addEventListener("click", () =>
  handleFullScreen(terminalApp.window)
);

terminalApp.opening.addEventListener("click", () =>
  open_window(terminalApp.window, terminalApp.point, terminalApp.app_name)
);

// App draggable
$(function () {
  $(".terminal").draggable();
  $(".note").draggable();
  $(".calculator").draggable();
  $(".Vscode").draggable();
  $(".spotlight_serach").draggable();
  $(".maps").draggable();
});

// Initialize terminal line HTML template
let terminalLineHTML = $(".terminal_line").html();
let path = "~"; // Current directory path
let dirs = ["Desktop", "Downloads", "Music", "Documents"]; // Initial directories

// Initialize the terminal input line
function initTerminalLine() {
  $(".cursor").keydown(handleCommand);
}

// Handle command input when the Enter key is pressed
function handleCommand(e) {
  if (e.keyCode !== 13) return; // Only act on Enter key
  e.preventDefault();

  let command = $(this).text().trim(); // Get and trim the command
  if (!command) return; // If empty, do nothing

  let commandOutput = executeCommand(command); // Execute the command

  updateTerminal(command, commandOutput); // Update terminal with command and output
  initTerminalLine(); // Re-initialize for next input
}

// Execute the command entered by the user
function executeCommand(command) {
  if (command.startsWith("cd ")) {
    return changeDirectory(command.substring(3));
  } else if (command === "ls") {
    return listDirectories();
  } else if (command === "pwd") {
    return showPath();
  } else if (command.startsWith("mkdir ")) {
    return createDirectory(command.substring(6));
  } else if (command === "rmdir") {
    return removeDirectory();
  } else if (command === "ps -aux") {
    return showSystemStats();
  } else if (command.startsWith("cat ")) {
    return displayFileContent();
  } else if (command.startsWith("du -hs ")) {
    return showDiskUsage();
  } else {
    return `zsh: command not found: ${command}<br>`;
  }
}

// Change directory
function changeDirectory(newPath) {
  if (newPath) {
    path = newPath;
    return "";
  }
  return "Invalid directory name";
}

// List directories
function listDirectories() {
  return dirs.join("\t");
}

// Show the current path
function showPath() {
  return `${path}/`;
}

// Create a new directory
function createDirectory(dirName) {
  if (dirName && !dirs.includes(dirName)) {
    dirs.push(dirName);
    return "";
  }
  return "Directory already exists or invalid name";
}

// Remove the last directory (for simplicity)
function removeDirectory() {
  if (dirs.length > 0) {
    dirs.pop();
    return "";
  }
  return "No directories to remove";
}

// Display system stats (mock)
function showSystemStats() {
  return "CPU = 56%  MEMORY = 25%  DISK = 34%";
}

// Display file content (mock)
function displayFileContent() {
  return "Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>Fugiat nihil totam expedita sint necessitatibus quos ducimus.";
}

// Show disk usage (mock)
function showDiskUsage() {
  return Math.floor(Math.random() * 100) + "GB";
}

// Update the terminal with the new command and output
function updateTerminal(command, commandOutput) {
  $(".cursor").removeAttr("contenteditable").removeClass("cursor");
  terminalApp.content
    .append(commandOutput)
    .append(terminalLineHTML.replace("~", path));
  placeCaretAtEnd(document.querySelector(".cursor"));
}

// Place the caret at the end of the input line
function placeCaretAtEnd(el) {
  el.focus();
  let range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// Initialize the first terminal line
initTerminalLine();

// Ensure the caret is placed correctly when clicking on the terminal content
terminalApp.content.addEventListener("click", () => {
  placeCaretAtEnd(document.querySelector(".cursor"));
});

// Notes app function start
function handleAdding() {
  const create_input = document.createElement("input");
  create_input.placeholder = "Writing name";
  notesApp.adding.append(create_input);
}

function handleDeleting() {
  const inputChild = document.querySelector(".content__sidebar--notes input");
  inputChild.remove();
  notesApp.content_typing.style.display = "none";
}

function handleNotes() {
  notesApp.content_typing.style.display = "block";
}

// Notes app function end

notesApp.adding.addEventListener("click", handleAdding);
notesApp.backfull.addEventListener("click", () =>
  handleMinimize(notesApp.window)
);

notesApp.close.addEventListener("click", () =>
  close_window(notesApp.window, notesApp.point, notesApp.app_name)
);

notesApp.deleting.addEventListener("click", handleDeleting);

notesApp.full.addEventListener("click", () =>
  handleFullScreen(notesApp.window)
);
notesApp.window.addEventListener("click", handleNotes);
notesApp.opening.addEventListener("click", () =>
  open_window(notesApp.window, notesApp.point, notesApp.app_name)
);
