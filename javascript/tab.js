// Tab Management System - tab.js
// This file handles tab creation, switching, and management
// It works together with editor.js for the editor functionality

class TabManager {
    constructor() {
        this.editors = [
            { id: 1, name: "Untitled-1", content: "", language: "auto", minimized: false }
        ];
        this.activeEditorId = 1;
        this.nextEditorId = 2;
        this.editorInstance = null; // Will be set by editor.js
    }

    // Set the editor instance reference
    setEditorInstance(editorInstance) {
        this.editorInstance = editorInstance;
    }

    // Get current active editor
    getActiveEditor() {
        return this.editors.find(e => e.id === this.activeEditorId);
    }

    // Get all editors
    getAllEditors() {
        return this.editors;
    }

    // Get editor by ID
    getEditor(id) {
        return this.editors.find(e => e.id === id);
    }

    // Save current editor content before switching
    saveCurrentEditorContent() {
        if (this.editorInstance) {
            this.editorInstance.saveCurrentContent();
        }
    }

    // Create new tab
    createNewTab(name = null) {
        this.saveCurrentEditorContent();
        
        const newEditor = {
            id: this.nextEditorId,
            name: name || `Untitled-${this.nextEditorId}`,
            content: "",
            language: "auto",
            minimized: false
        };
        
        this.editors.push(newEditor);
        this.activeEditorId = this.nextEditorId;
        this.nextEditorId++;
        
        this.renderTabs();
        if (this.editorInstance) {
            this.editorInstance.renderEditor();
        }
    }

    // Switch to tab
    switchToTab(id) {
        if (id === this.activeEditorId) return;
        
        this.saveCurrentEditorContent();
        this.activeEditorId = id;
        this.renderTabs();
        
        if (this.editorInstance) {
            this.editorInstance.renderEditor();
        }
    }

    // Close tab
    closeTab(id) {
        if (this.editors.length === 1) {
            // Don't close the last tab, just clear it
            const lastEditor = this.editors[0];
            lastEditor.content = '';
            lastEditor.name = 'Untitled-1';
            lastEditor.language = 'auto';
            lastEditor.minimized = false;
            
            if (this.editorInstance) {
                this.editorInstance.renderEditor();
            }
            this.renderTabs();
            return;
        }

        this.editors = this.editors.filter(e => e.id !== id);
        
        if (this.activeEditorId === id) {
            this.activeEditorId = this.editors[0].id;
        }
        
        if (this.editors.length === 0) {
            this.hideWindow();
        } else {
            this.renderTabs();
            if (this.editorInstance) {
                this.editorInstance.renderEditor();
            }
        }
    }

    // Update editor data
    updateEditor(id, updates) {
        const editor = this.editors.find(e => e.id === id);
        if (editor) {
            Object.assign(editor, updates);
            
            // Auto-rename tab if it's still "Untitled" and has content
            if (editor.name.startsWith('Untitled-') && updates.content && updates.content.trim()) {
                const firstLine = updates.content.split('\n')[0].trim();
                if (firstLine.length > 0 && firstLine.length < 30) {
                    editor.name = firstLine.replace(/[^\w\s.-]/g, '').substring(0, 20) + (firstLine.length > 20 ? '...' : '');
                    this.renderTabs();
                }
            }
        }
    }

    // Minimize current tab
    minimizeTab() {
        const editor = this.getActiveEditor();
        if (editor) {
            this.saveCurrentEditorContent();
            editor.minimized = true;
            if (this.editorInstance) {
                this.editorInstance.renderEditor();
            }
        }
    }

    // Maximize current tab
    maximizeTab() {
        const editor = this.getActiveEditor();
        if (editor) {
            editor.minimized = false;
            if (this.editorInstance) {
                this.editorInstance.renderEditor();
            }
        }
    }

    // Render tabs
    renderTabs() {
        const tabs = document.getElementById('tabs');
        if (!tabs) return;
        
        tabs.innerHTML = '';
        
        this.editors.forEach(editor => {
            const tab = document.createElement('div');
            tab.className = 'msn-tab' + (editor.id === this.activeEditorId ? ' active' : '');
            
            // Tab content
            const tabContent = document.createElement('span');
            tabContent.className = 'tab-content';
            tabContent.textContent = editor.name;
            tab.appendChild(tabContent);
            
            // Modified indicator
            if (editor.content.trim() && editor.name.startsWith('Untitled-')) {
                const modifiedDot = document.createElement('span');
                modifiedDot.className = 'tab-modified';
                modifiedDot.textContent = '●';
                modifiedDot.style = 'color: #ff6b35; margin-left: 4px;';
                tab.appendChild(modifiedDot);
            }
            
            // Close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-tab';
            closeBtn.innerHTML = '×';
            closeBtn.title = 'Close tab';
            closeBtn.onclick = (e) => {
                e.stopPropagation();
                this.closeTab(editor.id);
            };
            tab.appendChild(closeBtn);
            
            // Tab click handler
            tab.onclick = () => {
                this.switchToTab(editor.id);
            };
            
            tabs.appendChild(tab);
        });
        
        // Add new tab button
        const addTab = document.createElement('div');
        addTab.className = 'msn-tab add-tab';
        addTab.innerHTML = '+';
        addTab.title = 'New tab (Ctrl+T)';
        addTab.onclick = () => {
            this.createNewTab();
        };
        tabs.appendChild(addTab);
    }

    // Show/hide window
    showWindow() {
        document.querySelector('.msn-messenger-window').style.display = 'block';
        const startBtn = document.getElementById('start-chat-btn');
        if (startBtn) {
            startBtn.style.display = 'none';
        }
    }

    hideWindow() {
        document.querySelector('.msn-messenger-window').style.display = 'none';
        const startBtn = document.getElementById('start-chat-btn');
        if (startBtn) {
            startBtn.style.display = 'block';
        }
    }

    // Initialize tab system
    init() {
        this.renderTabs();
        
        // Window control handlers
        const minimizeBtn = document.getElementById('minimize-btn');
        if (minimizeBtn) {
            minimizeBtn.onclick = () => this.minimizeTab();
        }

        const maximizeBtn = document.getElementById('maximize-btn');
        if (maximizeBtn) {
            maximizeBtn.onclick = () => this.maximizeTab();
        }

        const closeBtn = document.getElementById('close-btn');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeTab(this.activeEditorId);
        }

        // Start button handler
        const startBtn = document.getElementById('start-chat-btn');
        if (startBtn) {
            startBtn.onclick = () => {
                this.createNewTab();
                this.showWindow();
            };
        }

        // Keyboard shortcuts for tab management
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey) {
                switch(e.key) {
                    case 't':
                        e.preventDefault();
                        this.createNewTab();
                        break;
                    case 'w':
                        e.preventDefault();
                        this.closeTab(this.activeEditorId);
                        break;
                    case 'Tab':
                        e.preventDefault();
                        // Switch to next tab
                        const currentIndex = this.editors.findIndex(e => e.id === this.activeEditorId);
                        const nextIndex = (currentIndex + 1) % this.editors.length;
                        this.switchToTab(this.editors[nextIndex].id);
                        break;
                }
            }
        });

        // Save content before page unload
        window.addEventListener('beforeunload', () => {
            this.saveCurrentEditorContent();
        });
    }
}

// Initialize tab manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create global tab manager instance
    window.tabManager = new TabManager();
    
    // Wait a bit for editor.js to load, then initialize
    setTimeout(() => {
        window.tabManager.init();
    }, 50);
});