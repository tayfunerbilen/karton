let textarea = document.getElementById('textarea');
let lineNumbersBtn = document.getElementById('line-numbers-btn');
let preview = document.getElementById('preview');
let setColorBtn = document.getElementById('set-color-btn');
let themeSwitchBtn = document.getElementById('theme-switch-btn');
let modeSwitchBtn = document.getElementById('mode-switch-btn');
let fontSwitchBtn = document.getElementById('font-switch-btn');
let fontSizeSwitchBtn = document.getElementById('font-size-switch-btn');
let loader = document.querySelector('.loading');
let openFileBtn = document.getElementById('open-file-btn');
let logo = document.querySelector('.karton-logo');
let watermark = true;
// let title = document.getElementById('title');

let editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: 'javascript'
});

let lineNumbers = true;

editor.setOption('theme', 'base16-dark');
editor.setOption('lineNumbers', lineNumbers);

// satır numarasını gizleyip/gösterir
lineNumbersBtn.addEventListener('click', (e) => {
    lineNumbers = !lineNumbers;
    e.target.classList.toggle('active'); // sonradan eklendi
    editor.setOption('lineNumbers', lineNumbers);
});

// arkplan rengini ayarlar
setColorBtn.addEventListener('input', (e) => {
    preview.style.backgroundColor = e.target.value;
});

// temayı ayarlar
themeSwitchBtn.addEventListener('change', (e) => {
    let themeCSS = document.getElementById('theme-css');
    themeCSS.parentNode.removeChild(themeCSS);
    let link = document.createElement('link');
    link.setAttribute('href', 'codemirror/theme/' + e.target.value + '.css');
    link.setAttribute('id', 'theme-css');
    link.setAttribute('rel', 'stylesheet');
    document.querySelector('head').appendChild(link);
    editor.setOption('theme', e.target.value);
});

modeSwitchBtn.addEventListener('change', (e) => {
    editor.setOption('mode', e.target.value);
});

// font ayarlar
fontSwitchBtn.addEventListener('change', (e) => {
    document.querySelector('.CodeMirror').style.fontFamily = e.target.value;
});

// font boyutunu ayarlar
fontSizeSwitchBtn.addEventListener('change', (e) => {
    [...document.querySelectorAll('.CodeMirror *')].forEach((el, key) => {
        el.style.fontSize = e.target.value;
    }); // sonradan eklendi
});

const exportImage = (size) => {
    preview.style.transform = 'scale(' + size + ')';
    loader.style.display = 'flex';
    if (watermark)
        logo.style.display = 'flex';
    window.scrollTo(0, 0); // sonradan eklendi
    html2canvas(preview).then(canvas => {
        loader.style.display = '';
        if (watermark)
            logo.style.display = '';
        preview.style.transform = 'scale(1)';
        let a = document.createElement('a');
        a.setAttribute('download', 'karton.png');
        a.setAttribute('href', canvas.toDataURL('image/png'));
        a.click();
    });
}

openFileBtn.addEventListener('click', async () => {
    [fileHandle] = await window.showOpenFilePicker();
    let file = await fileHandle.getFile();
    let content = await file.text();
    editor.getDoc().setValue(content);
});

// document.getElementById('set-title').addEventListener('keyup', (e) => {
//     title.innerText = e.target.value;
// });
