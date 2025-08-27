// Code Editor System - editor.js
// This file handles the code editor functionality
// It works together with tab.js for tab management

class CodeEditor {
    constructor() {
        this.tabManager = null; // Will be set when tab manager is available
    }

    // Set tab manager reference
    setTabManager(tabManager) {
        this.tabManager = tabManager;
        tabManager.setEditorInstance(this);
    }

    // Language detection
    detectLanguage(code) {
        if (/^\s*<\?php/i.test(code) || /\$[a-zA-Z_][a-zA-Z0-9_]*/.test(code)) return 'php';
        if (/^\s*import\s+\w+|def\s+\w+|print\(/.test(code)) return 'python';
        if (/^\s*public\s+class|System\.out\.println/.test(code)) return 'java';
        if (/^\s*function\s+\w+|console\.log|let\s+|const\s+|var\s+/.test(code)) return 'javascript';
        return 'javascript';
    }

    // Get file extension
    getFileExtension(lang) {
        const extensions = {
            'javascript': 'js',
            'python': 'py',
            'java': 'java',
            'php': 'php'
        };
        return extensions[lang] || 'txt';
    }

    // Save current editor content to tab data
    saveCurrentContent() {
        if (!this.tabManager) return;
        
        const currentEditor = this.tabManager.getActiveEditor();
        const textarea = document.querySelector('.msn-code-editor');
        const langSelector = document.querySelector('.msn-lang-selector');
        
        if (currentEditor && textarea) {
            this.tabManager.updateEditor(currentEditor.id, {
                content: textarea.value,
                language: langSelector ? langSelector.value : currentEditor.language
            });
        }
    }

    // Render the editor for the active tab
    renderEditor() {
        const area = document.getElementById('editor-area');
        if (!area || !this.tabManager) return;
        
        area.innerHTML = '';
        
        const editor = this.tabManager.getActiveEditor();
        if (!editor || editor.minimized) {
            area.innerHTML = '<div style="padding:40px; text-align:center; color:#3a6ea5; font-style:italic;">Select a tab to start coding or create a new one</div>';
            return;
        }

        // Create MSN-style chat header
        const headerDiv = document.createElement('div');
        headerDiv.className = 'msn-chat-header';
        
        const fileInfo = document.createElement('span');
        fileInfo.textContent = `Code Editor - ${editor.name}`;
        
        const langLabel = document.createElement('span');
        langLabel.textContent = ' | Language: ';
        langLabel.style = 'font-weight:normal; font-size:0.9em;';

        const langSelector = document.createElement('select');
        langSelector.className = 'msn-lang-selector';
        langSelector.style = 'font-family:inherit; font-size:0.9em; color:#3a6ea5; background:#f7fbff; border:1px solid #b3d1f7; border-radius:3px; padding:2px 6px;';
        langSelector.innerHTML = `
            <option value="auto">Auto Detect</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
        `;
        langSelector.value = editor.language || 'auto';

        headerDiv.appendChild(fileInfo);
        headerDiv.appendChild(langLabel);
        headerDiv.appendChild(langSelector);

        // Use existing MSN code editor class
        const codeEditor = document.createElement('textarea');
        codeEditor.className = 'msn-code-editor';
        codeEditor.placeholder = `Enter your ${editor.language === 'auto' ? '' : editor.language + ' '}code here...`;
        codeEditor.value = editor.content || '';
        codeEditor.spellcheck = false;

        // MSN-style button container (chat footer)
        const btnDiv = document.createElement('div');
        btnDiv.className = 'msn-chat-footer';

        // Create MSN-style buttons
        const runBtn = document.createElement('button');
        runBtn.className = 'msn-send-btn';
        runBtn.textContent = 'Run Code';
        runBtn.title = 'Run code (Ctrl+Enter)';

        const saveBtn = document.createElement('button');
        saveBtn.className = 'msn-send-btn';
        saveBtn.textContent = 'Save File';
        saveBtn.title = 'Save file (Ctrl+S)';

        const clearBtn = document.createElement('button');
        clearBtn.className = 'msn-send-btn';
        clearBtn.textContent = 'Clear';
        clearBtn.title = 'Clear code';

        const formatBtn = document.createElement('button');
        formatBtn.className = 'msn-send-btn';
        formatBtn.textContent = 'Format';
        formatBtn.title = 'Format code';

        btnDiv.appendChild(runBtn);
        btnDiv.appendChild(saveBtn);
        btnDiv.appendChild(clearBtn);
        btnDiv.appendChild(formatBtn);

        // Output area with MSN styling
        const outputDiv = document.createElement('div');
        outputDiv.className = 'msn-output';
        outputDiv.style = `
            margin-top: 16px; 
            background: #f7fbff;
            padding: 12px; 
            min-height: 60px; 
            font-family: 'Consolas', 'Courier New', monospace; 
            font-size: 0.9em; 
            color: #003366;
            border: 1px solid #b3d1f7; 
            border-radius: 6px; 
            white-space: pre-wrap; 
            overflow-y: auto; 
            max-height: 150px;
        `;
        outputDiv.textContent = 'Output will appear here...';

        // Assemble editor
        area.appendChild(headerDiv);
        area.appendChild(codeEditor);
        area.appendChild(btnDiv);
        area.appendChild(outputDiv);

        // Event listeners
        codeEditor.oninput = () => {
            this.saveCurrentContent();
        };

        langSelector.onchange = () => {
            this.saveCurrentContent();
            const lang = langSelector.value;
            codeEditor.placeholder = `Enter your ${lang === 'auto' ? '' : lang + ' '}code here...`;
        };

        // Button functionality
        this.setupButtonHandlers(runBtn, saveBtn, clearBtn, formatBtn, codeEditor, outputDiv, langSelector);

        // Keyboard shortcuts
        this.setupKeyboardShortcuts(codeEditor, runBtn, saveBtn);

        // Auto-focus
        setTimeout(() => codeEditor.focus(), 100);
    }

    // Setup button event handlers
    setupButtonHandlers(runBtn, saveBtn, clearBtn, formatBtn, codeEditor, outputDiv, langSelector) {
        // Run button
        runBtn.onclick = async () => {
            const code = codeEditor.value.trim();
            if (!code) {
                outputDiv.textContent = 'Please enter some code first.';
                outputDiv.style.color = '#cc6600';
                return;
            }

            let lang = langSelector.value;
            if (lang === 'auto') {
                lang = this.detectLanguage(code);
            }

            outputDiv.textContent = 'Running code...';
            outputDiv.style.color = '#3a6ea5';

            if (lang === 'javascript') {
                this.executeJavaScript(code, outputDiv);
            } else {
                await this.executeCode(code, lang, outputDiv);
            }
        };

        // Save button
        saveBtn.onclick = () => {
            const code = codeEditor.value.trim();
            if (!code) {
                outputDiv.textContent = 'No code to save.';
                outputDiv.style.color = '#cc6600';
                return;
            }

            const editor = this.tabManager.getActiveEditor();
            let lang = langSelector.value;
            if (lang === 'auto') {
                lang = this.detectLanguage(code);
            }

            const ext = this.getFileExtension(lang);
            const filename = editor.name.replace(/[^\w\s.-]/g, '') || 'untitled';

            const blob = new Blob([code], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `${filename}.${ext}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            setTimeout(() => URL.revokeObjectURL(a.href), 100);
            outputDiv.textContent = `File saved as ${filename}.${ext}`;
            outputDiv.style.color = '#006600';
        };

        // Clear button
        clearBtn.onclick = () => {
            if (confirm('Are you sure you want to clear all code in this tab?')) {
                codeEditor.value = '';
                this.saveCurrentContent();
                outputDiv.textContent = 'Output will appear here...';
                outputDiv.style.color = '#003366';
                codeEditor.focus();
            }
        };

        // Format button
        formatBtn.onclick = () => {
            const code = codeEditor.value;
            let lang = langSelector.value;
            if (lang === 'auto') {
                lang = this.detectLanguage(code);
            }

            if (lang === 'javascript') {
                try {
                    const formatted = this.formatJavaScript(code);
                    codeEditor.value = formatted;
                    this.saveCurrentContent();
                    outputDiv.textContent = 'Code formatted successfully!';
                    outputDiv.style.color = '#006600';
                } catch (err) {
                    outputDiv.textContent = `Could not format code: ${err.message}`;
                    outputDiv.style.color = '#cc0000';
                }
            } else {
                outputDiv.textContent = `Formatting for ${lang} is not supported yet.`;
                outputDiv.style.color = '#3a6ea5';
            }
        };
    }

    // Execute code based on language
    async executeCode(code, lang, outputDiv) {
        if (lang === 'javascript') {
            this.executeJavaScript(code, outputDiv);
        } else if (lang === 'python' || lang === 'php' || lang === 'java') {
            await this.executeServerSideCode(code, lang, outputDiv);
        } else {
            outputDiv.textContent = `Language ${lang} is not supported yet.`;
            outputDiv.style.color = '#cc6600';
        }
    }

    // Execute server-side code (Python, PHP, Java)
    async executeServerSideCode(code, lang, outputDiv) {
        try {
            outputDiv.textContent = `Executing ${lang} code on server...`;
            outputDiv.style.color = '#3a6ea5';

            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: code,
                    language: lang
                })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            const result = await response.json();

            if (result.error) {
                outputDiv.textContent = `Error: ${result.error}`;
                outputDiv.style.color = '#cc0000';
            } else {
                let output = '';
                if (result.stdout) {
                    output += result.stdout;
                }
                if (result.stderr) {
                    output += (output ? '\n' : '') + 'STDERR: ' + result.stderr;
                }
                if (result.return_value !== undefined && result.return_value !== null) {
                    output += (output ? '\n' : '') + `Return value: ${result.return_value}`;
                }

                outputDiv.textContent = output || `${lang} code executed successfully (no output).`;
                outputDiv.style.color = result.stderr ? '#cc6600' : '#003366';
            }

        } catch (error) {
            outputDiv.textContent = `Failed to execute ${lang} code: ${error.message}\n\nMake sure the backend server is running on port 3001.`;
            outputDiv.style.color = '#cc0000';
        }
    }

    // Execute JavaScript code in browser
    executeJavaScript(code, outputDiv) {
        let consoleOutput = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;

        // Capture console output
        console.log = (...args) => {
            const output = args.map(arg => 
                typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
            ).join(' ');
            consoleOutput.push(`>> ${output}`);
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            consoleOutput.push(`ERROR: ${args.map(String).join(' ')}`);
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            consoleOutput.push(`WARNING: ${args.map(String).join(' ')}`);
            originalWarn.apply(console, args);
        };

        try {
            const result = eval(code);
            let output = '';
            
            if (consoleOutput.length) {
                output = consoleOutput.join('\n');
            }
            
            if (typeof result !== 'undefined' && result !== null) {
                const resultStr = typeof result === 'object' ? 
                    JSON.stringify(result, null, 2) : String(result);
                output += (output ? '\n' : '') + `Result: ${resultStr}`;
            }
            
            outputDiv.textContent = output || 'Code executed successfully (no output).';
            outputDiv.style.color = '#003366';
                
        } catch (err) {
            outputDiv.textContent = `Error: ${err.message}`;
            outputDiv.style.color = '#cc0000';
        }

        // Restore console
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
    }

    // Basic JavaScript formatting
    formatJavaScript(code) {
        return code
            .replace(/;(\s*)/g, ';\n')
            .replace(/{(\s*)/g, ' {\n    ')
            .replace(/}(\s*)/g, '\n}\n')
            .replace(/,(\s*)/g, ', ')
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts(codeEditor, runBtn, saveBtn) {
        codeEditor.addEventListener('keydown', (e) => {
            // Ctrl+Enter to run
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runBtn.click();
            }
            // Ctrl+S to save
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                saveBtn.click();
            }
            // Tab for indentation
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = codeEditor.selectionStart;
                const end = codeEditor.selectionEnd;
                codeEditor.value = codeEditor.value.substring(0, start) + '    ' + codeEditor.value.substring(end);
                codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
            }
        });
    }
}

// Initialize editor when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global editor instance
    window.codeEditor = new CodeEditor();
    
    // Wait for tab manager to be ready, then connect them
    const connectManagers = () => {
        if (window.tabManager && window.codeEditor) {
            window.codeEditor.setTabManager(window.tabManager);
            window.codeEditor.renderEditor();
        } else {
            setTimeout(connectManagers, 50);
        }
    };
    
    connectManagers();
});