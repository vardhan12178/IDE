require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@0.31.1/min/vs' } });

require(['vs/editor/editor.main'], function() {
    const htmlEditor = monaco.editor.create(document.getElementById('htmlEditor'), {
        value: '<!-- Type your HTML here -->',
        language: 'html',
        automaticLayout: true,
        theme: 'vs-dark'
    });
    const cssEditor = monaco.editor.create(document.getElementById('cssEditor'), {
        value: '/* Type your CSS here */',
        language: 'css',
        automaticLayout: true,
        theme: 'vs-dark'
    });

 
    const jsEditor = monaco.editor.create(document.getElementById('jsEditor'), {
        value: '// Type your JavaScript here\nconsole.log("Hello from JavaScript!");',
        language: 'javascript',
        automaticLayout: true,
        theme: 'vs-dark'
    });


    const outputFrame = document.getElementById('outputFrame');
   

    function updateOutput() {
        const html = htmlEditor.getValue();
        const css = `<style>${cssEditor.getValue()}</style>`;
        const js = `<script>${jsEditor.getValue()}<\/script>`;
        
        const output = `${html}${css}${js}`;
        const iframeDoc = outputFrame.contentDocument || outputFrame.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(output);
        iframeDoc.close();
    }

    htmlEditor.onDidChangeModelContent(() => { updateOutput(); });
    cssEditor.onDidChangeModelContent(() => { updateOutput(); });
    jsEditor.onDidChangeModelContent(() => { updateOutput(); });

    updateOutput();
});
