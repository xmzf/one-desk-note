// localStorage 数据键名
const STORAGE_KEY = 'TECH_NOTE_SYSTEM_DATA';

// 获取所有笔记
export function getAllNotes() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// 保存所有笔记到 localStorage
function saveAllNotes(notes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// 创建新笔记
export function createNote() {
  const notes = getAllNotes();
  const newNote = {
    id: Date.now().toString(), // 使用时间戳作为唯一ID
    title: '',
    content: '',
    updatedAt: new Date().getTime()
  };
  notes.unshift(newNote); // 添加到数组开头
  saveAllNotes(notes);
  return newNote;
}

// 更新笔记
export function updateNote(id, title, content) {
  const notes = getAllNotes();
  const noteIndex = notes.findIndex(n => n.id === id);
  if (noteIndex > -1) {
    notes[noteIndex].title = title;
    notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().getTime();
    saveAllNotes(notes);
  }
}

// 删除笔记
export function deleteNote(id) {
  let notes = getAllNotes();
  notes = notes.filter(n => n.id !== id);
  saveAllNotes(notes);
}

// 导入单个笔记
export function importNote(noteObj) {
  const notes = getAllNotes();
  // 生成新的 ID 防止冲突，但保留内容
  const newNote = {
    id: Date.now().toString(),
    title: noteObj.title || '未命名导入笔记',
    content: noteObj.content || '',
    updatedAt: new Date().getTime()
  };
  notes.unshift(newNote);
  saveAllNotes(notes);
  return newNote;
}