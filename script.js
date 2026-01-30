let notes = JSON.parse(localStorage.getItem("notes")) || [];

const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const notesDiv = document.getElementById("notes");
const addBtn = document.getElementById("addBtn");

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
  notesDiv.innerHTML = "";

  notes.forEach((note, index) => {
    notesDiv.innerHTML += `
      <div class="note">
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <small>${note.date}</small>
        <div class="actions">
          <button onclick="editNote(${index})">Edit</button>
          <button onclick="deleteNote(${index})">Delete</button>
        </div>
      </div>
    `;
  });
}

function addNote() {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  notes.push({
    title,
    content,
    date: new Date().toLocaleString()
  });

  saveNotes();
  renderNotes();

  titleInput.value = "";
  contentInput.value = "";
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

function editNote(index) {
  const note = notes[index];
  titleInput.value = note.title;
  contentInput.value = note.content;
  deleteNote(index);
}

addBtn.addEventListener("click", addNote);

renderNotes();
