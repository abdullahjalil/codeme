A nostalgic, fully-functional multi-language code editor that recreates the classic MSN Messenger interface from the early 2000s. Write, execute, and debug code in JavaScript, Python, PHP, and Java - all within the familiar blue gradient windows of MSN Messenger!

![MSN Code Editor](https://img.shields.io/badge/Style-Early%202000s-blue?style=for-the-badge&logo=windows&logoColor=white)
![Languages](https://img.shields.io/badge/Languages-JavaScript%20|%20Python%20|%20PHP%20|%20Java-brightgreen?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Code-success?style=for-the-badge)

## 🌟 Features

### 🎨 **Authentic MSN Messenger UI**
- Classic blue gradient theme with MSN Messenger styling
- Nostalgic window controls (minimize, maximize, close)
- MSN-style sidebar with "contacts" showing programming languages
- Authentic early 2000s typography and button designs

### 📝 **Multi-Tab Code Editor**
- Create unlimited coding tabs with `Ctrl+T`
- Smart tab naming based on code content
- Switch between tabs with `Ctrl+Tab`
- Modified indicator for unsaved changes
- Persistent content when switching tabs

### 🚀 **Multi-Language Support**
| Language | Execution | Features |
|----------|-----------|----------|
| **JavaScript** | Client-side | Instant execution, console capture, object inspection |
| **Python** | Server-side | Full Python 3 support, error handling, output capture |
| **PHP** | Server-side | PHP CLI execution, auto `<?php` tag insertion |
| **Java** | Server-side | Automatic compilation, class detection, full Java support |

### ⚡ **Powerful Code Features**
- **Smart Language Detection** - Automatically detects programming language
- **Syntax-Aware Editing** - Monospace fonts and proper indentation
- **Code Execution** - Run code with `Ctrl+Enter`
- **File Operations** - Save files with proper extensions using `Ctrl+S`
- **Code Formatting** - Basic JavaScript code formatting
- **Real-time Output** - See results, errors, and console output instantly

### 🔧 **Developer-Friendly**
- **Keyboard Shortcuts** - Professional IDE-style shortcuts
- **Tab Indentation** - Press Tab for 4-space indentation
- **Error Handling** - Clear error messages with line numbers
- **Multiple Output Types** - Console logs, return values, and errors
- **File Downloads** - Save your code with appropriate file extensions

## 🖼️ Screenshots

*The interface recreates the authentic MSN Messenger experience while providing modern code editing capabilities.*

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+ (for backend)
- **Python 3** (for Python code execution)
- **PHP CLI** (for PHP code execution) 
- **Java JDK** (for Java code execution)
- **Modern Web Browser**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/msn-code-editor.git
cd msn-code-editor
```

### 2. Setup Frontend
```bash
# No setup needed! Just open index.html in your browser
# Or use a simple HTTP server:
python3 -m http.server 8000
# Then visit: http://localhost:8000
```

### 3. Setup Backend (for Python, PHP, Java support)
```bash
# Install Node.js dependencies
npm install

# Start the backend server
npm start
```

### 4. Install Language Interpreters
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3 php-cli default-jdk

# macOS (with Homebrew)  
brew install python3 php openjdk

# Windows - Download from official websites:
# Python: https://python.org
# PHP: https://php.net  
# Java: https://oracle.com/java
```

### 5. Start Coding! 🎉
Open your browser to the frontend and start coding with that nostalgic MSN Messenger feel!

## 📁 Project Structure

```
msn-code-editor/
├── index.html              # Main HTML file
├── stylesheets/
│   ├── main.css            # MSN Messenger styling
│   └── tab.css             # Tab system styles  
├── javascript/
│   ├── tab.js             # Tab management system
│   └── editor.js          # Code editor functionality
├── server.js              # Backend server for code execution
├── package.json           # Node.js dependencies
├── temp/                  # Temporary files (auto-created)
└── README.md             # This file
```

## 🎮 Usage Guide

### Creating and Managing Tabs
- **New Tab**: Click `+` or press `Ctrl+T`
- **Switch Tabs**: Click tab or press `Ctrl+Tab`  
- **Close Tab**: Click `×` or press `Ctrl+W`
- **Smart Naming**: Tabs auto-rename based on your code

### Writing Code
- **Language Selection**: Choose from dropdown or let auto-detection work
- **Smart Indentation**: Press `Tab` for 4-space indentation
- **Professional Editing**: Full textarea with monospace font

### Running Code  
- **Execute**: Click "Run Code" or press `Ctrl+Enter`
- **Save File**: Click "Save File" or press `Ctrl+S`
- **Clear Editor**: Click "Clear" to reset
- **Format Code**: Click "Format" for basic JavaScript formatting

### Language-Specific Examples

#### JavaScript (Client-side)
```javascript
// Runs instantly in your browser
console.log("Hello MSN Messenger!");
let numbers = [1, 2, 3, 4, 5];
let sum = numbers.reduce((a, b) => a + b, 0);
console.log(`Sum: ${sum}`);
return "JavaScript executed successfully!";
```

#### Python (Server-side)
```python
# Executes on the backend server
print("Hello from Python!")
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"Sum of {numbers} = {total}")

# List comprehension example
squares = [x**2 for x in range(5)]
print(f"Squares: {squares}")
```

#### PHP (Server-side)
```php
<?php
echo "Greetings from PHP!\n";

// Array operations
$numbers = [1, 2, 3, 4, 5];
$sum = array_sum($numbers);
echo "Sum: $sum\n";

// Object-oriented example
class Greeting {
    public function say($name) {
        return "Hello, $name from PHP!";
    }
}

$greeter = new Greeting();
echo $greeter->say("MSN User");
?>
```

#### Java (Server-side)
```java
public class MSNExample {
    public static void main(String[] args) {
        System.out.println("Java in MSN Messenger!");
        
        // Array processing
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int num : numbers) {
            sum += num;
        }
        System.out.println("Sum: " + sum);
        
        // Object example
        Greeting g = new Greeting("MSN User");
        g.greet();
    }
    
    static class Greeting {
        private String name;
        
        public Greeting(String name) {
            this.name = name;
        }
        
        public void greet() {
            System.out.println("Hello, " + name + " from Java!");
        }
    }
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+T` | Create new tab |
| `Ctrl+W` | Close current tab |
| `Ctrl+Tab` | Switch to next tab |
| `Ctrl+Enter` | Run code |
| `Ctrl+S` | Save file |
| `Tab` | Insert 4 spaces |

## 🔧 API Reference

### Backend Endpoints

#### Execute Code
```http
POST /api/execute
Content-Type: application/json

{
  "code": "print('Hello World')",
  "language": "python"
}
```

#### Health Check
```http
GET /api/health
```

#### Check Interpreters
```http
GET /api/interpreters
```

## 🛡️ Security Features

- **Input Validation**: Code length limits and dangerous pattern detection
- **Execution Timeout**: 10-second limit prevents infinite loops
- **Process Isolation**: Each execution runs in separate process
- **Temporary Files**: Auto-cleanup prevents disk space issues
- **Sandboxed Environment**: Code runs in controlled temporary directory

⚠️ **Note**: This is designed for development/educational use. For production, add authentication, stricter sandboxing, and containerization.

## 🎨 Customization

### Modifying the MSN Theme
Edit `stylesheets/main.css` to customize:
- Color scheme (currently MSN Messenger blue)
- Font families (currently Tahoma/Verdana)
- Button styles and gradients
- Window sizing and layout

### Adding New Languages
1. Add language option to dropdown in `editor.js`
2. Extend `detectLanguage()` function with new patterns
3. Add execution handler in `server.js`
4. Update file extension mapping

### Custom Keyboard Shortcuts
Modify the keyboard event handlers in both `tab.js` and `editor.js`.

## 🐛 Troubleshooting

### Common Issues

**Frontend not loading properly:**
- Use a local HTTP server instead of opening HTML directly
- Check browser console for JavaScript errors

**Backend connection failed:**
- Ensure backend server is running on port 3001
- Check firewall settings
- Verify Node.js dependencies are installed

**Language execution not working:**
- Verify interpreters are installed: `python3 --version`, `php --version`, `java -version`
- Check that executables are in system PATH
- Review server logs for detailed error messages

**Code execution timeout:**
- Code is taking longer than 10 seconds
- Check for infinite loops
- Reduce computational complexity

## 🤝 Contributing

We love contributions! Here's how you can help:

### Areas for Improvement
- 🌟 **New Language Support** (Go, Rust, C++, etc.)
- 🎨 **Theme Variations** (Windows XP, AIM, Yahoo Messenger)
- 🔧 **Advanced Features** (Debugging, Git integration, plugins)
- 🛡️ **Security Enhancements** (Better sandboxing, rate limiting)
- 📱 **Mobile Responsiveness** (Touch-friendly interface)

### How to Contribute
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft** - For the iconic MSN Messenger design that inspired this project
- **Early 2000s Nostalgia** - For the inspiration to recreate this beloved interface
- **Open Source Community** - For the tools and libraries that make this possible

## 🌐 Connect

- **GitHub Issues**: Report bugs and request features
- **Discussions**: Share your MSN Code Editor creations
- **Wiki**: Community-maintained documentation and tutorials

---

### 💭 *"Because sometimes you want to code like it's 2003"*

*Relive the golden age of instant messaging while building the future with code. MSN Code Editor brings together nostalgic design with modern development tools.*

**Happy Coding!** 🚀👨‍💻👩‍💻
