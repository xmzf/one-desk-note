export function initEditor() {
  const toolbar = document.getElementById('toolbar');
  const imageBtn = document.getElementById('btn-insert-image');
  const imageInput = document.getElementById('image-input');
  const editorContent = document.getElementById('editor-content');

  // 处理基本文本格式化命令 (加粗、斜体等)
  toolbar.addEventListener('click', (e) => {
    // 寻找被点击的带有 data-command 属性的按钮
    const btn = e.target.closest('.tool-btn');
    if (!btn) return;
    
    const command = btn.getAttribute('data-command');
    if (command) {
      // 执行原生的富文本命令
      document.execCommand(command, false, null);
      // 让编辑区重新获得焦点
      editorContent.focus();
    }
  });

  // 处理图片插入按钮点击
  imageBtn.addEventListener('click', () => {
    imageInput.click();
  });

  // 处理图片文件选择与 Base64 转换
  imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 使用 FileReader 将图片转为 Base64 字符串
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64String = event.target.result;
      
      // 恢复焦点并插入图片
      editorContent.focus();
      document.execCommand('insertImage', false, base64String);
    };
    reader.readAsDataURL(file);
    
    // 清空 input 值，允许重复选择同一张图片
    e.target.value = '';
  });
}