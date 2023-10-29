import './App.css';

function App() {
  return (
    <div className="App">
      <div id="editor-container">
        <textarea id="editor" name="editor" rows="4" cols="50">内容</textarea>
      </div>
      <div id="preview-container">
        <div id="preview">
          预览
        </div>
      </div>
    </div>
  );
}

export default App;
