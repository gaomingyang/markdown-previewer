import { useState,useEffect } from 'react';
import {marked} from 'marked';

import './App.css';

function App() {
  const [leftWidth, setLeftWidth] = useState('50%');

  const handleDrag = (e) => {
    const container = document.getElementById('container');
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = (e.clientX - containerRect.left) / containerRect.width * 100 + '%';
    setLeftWidth(newLeftWidth);
  };

  // const initText="## Welcome to my React Markdown Previewer! \n## This is a sub-heading.\n### And here's some other cool stuff:\nHeres some code, `<div></div>`, between 2 backticks.```// this is multi-line code:\n function anotherExample(firstLine, lastLine) {if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n }\n}```";
  const initPreview = marked.parse("")

  const [text,setText] = useState("");
  const [preview,setPreview] = useState(initPreview);
  
  
  useEffect(()=>{
    const filePath = "/initdata.txt"
    fetch(filePath)
      .then((response)=>{
        if (!response.ok){
          throw new Error("Network response was not ok")
        }
        return response.text()
      })
      .then((data)=>{
        setText(data)
        let preview = marked.parse(data)
        setPreview(preview)
      })
  },[])

  function changeText(event) {
    let text = event.target.value
    setText(text)
    let html = marked.parse(text);
    setPreview(html)
  }

  return (
    <div className="App">
      <div>
        <h1>Markdown Previewer</h1>
      </div>
      <div id='container'>
        <div id="editor-container" style={{ width: leftWidth }}>
          <textarea id="editor" onChange={changeText} defaultValue={text}></textarea>
        </div>

        <div className="divider" onMouseDown={(e) => {
              e.preventDefault();
              document.addEventListener('mousemove', handleDrag);
              document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', handleDrag);
              });
        }}/>

        <div id="preview-container" style={{ width: `calc(100% - ${leftWidth})` }}>
          <div id="preview" dangerouslySetInnerHTML={{ __html: preview }}>
          </div>
        </div> 

      </div>
      <div id="footer">
        by <a href='https://github.com/gaomingyang/markdown-previewer'>Mingyang</a>
      </div>
    </div>
  );
}

export default App;
