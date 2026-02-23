import { getAllNotes, createNote, updateNote, deleteNote, importNote } from './noteManager.js';
import { initEditor } from './editor.js';

// DOM 元素引用
const noteListEl = document.getElementById('note-list');
const btnNewNote = document.getElementById('btn-new-note');
const btnDeleteNote = document.getElementById('btn-delete-note');
const btnExportNote = document.getElementById('btn-export-note');
const btnImportNote = document.getElementById('btn-import-note');
const importInput = document.getElementById('import-input');

const editorWrapper = document.getElementById('editor-wrapper');
const emptyState = document.getElementById('empty-state');
const titleInput = document.getElementById('note-title');
const editorContent = document.getElementById('editor-content');

// 当前选中的笔记 ID
let currentNoteId = null;
// 防抖定时器
let saveTimeout = null;

// 初始化系统
function init() {
  initEditor();
  renderNoteList();
  bindEvents();
}

// 渲染左侧笔记列表
function renderNoteList() {
  const notes = getAllNotes();
  noteListEl.innerHTML = '';

  // 按更新时间降序排列
  notes.sort((a, b) => b.updatedAt - a.updatedAt);

  notes.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-item ${note.id === currentNoteId ? 'active' : ''}`;
    
    // 格式化时间
    const date = new Date(note.updatedAt);
    const timeStr = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

    li.innerHTML = `
      <div class="note-item-title">${note.title || '无标题笔记'}</div>
      <div class="note-item-time">${timeStr}</div>
    `;
    
    // 点击切换笔记
    li.addEventListener('click', () => selectNote(note));
    noteListEl.appendChild(li);
  });
}

// 选中某个笔记
function selectNote(note) {
  currentNoteId = note.id;
  
  // 切换 UI 状态
  emptyState.classList.add('hidden');
  editorWrapper.classList.remove('hidden');
  
  // 填充内容
  titleInput.value = note.title;
  editorContent.innerHTML = note.content;
  
  // 重新渲染列表以更新选中高亮状态
  renderNoteList();
}

// 自动保存功能 (防抖)
function triggerAutoSave() {
  if (!currentNoteId) return;
  
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    const title = titleInput.value;
    const content = editorContent.innerHTML;
    updateNote(currentNoteId, title, content);
    renderNoteList(); // 保存后更新左侧列表的时间和标题
  }, 500); // 停止输入 500ms 后保存
}

// 绑定全局事件
function bindEvents() {
  // 新建笔记
  btnNewNote.addEventListener('click', () => {
    const newNote = createNote();
    selectNote(newNote);
  });

  // 删除笔记
  btnDeleteNote.addEventListener('click', () => {
    if (!currentNoteId) return;
    if (confirm('确定要删除这条笔记吗？此操作不可恢复。')) {
      deleteNote(currentNoteId);
      currentNoteId = null;
      editorWrapper.classList.add('hidden');
      emptyState.classList.remove('hidden');
      renderNoteList();
    }
  });

  // 监听输入自动保存
  titleInput.addEventListener('input', triggerAutoSave);
  editorContent.addEventListener('input', triggerAutoSave);

  // 导出 JSON
  btnExportNote.addEventListener('click', () => {
    if (!currentNoteId) return;
    const note = getAllNotes().find(n => n.id === currentNoteId);
    if (!note) return;

    // 将笔记对象转换为 JSON 字符串并创建 Blob
    const dataStr = JSON.stringify(note, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // 创建虚拟 a 标签触发下载
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || '导出笔记'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 触发导入文件选择
  btnImportNote.addEventListener('click', () => {
    importInput.click();
  });

  // 处理导入 JSON 文件
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsedNote = JSON.parse(event.target.result);
        const newNote = importNote(parsedNote);
        selectNote(newNote);
        e.target.value = ''; // 重置 input
      } catch (err) {
        alert('导入失败：文件格式不正确或不是有效的 JSON 文件');
      }
    };
    reader.readAsText(file);
  });
}

// 启动应用
init();