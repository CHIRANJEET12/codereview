import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const [code, setCode] = useState(`//Write the desired code that seems doubtful.
function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

async function reviewCode() {
  setLoading(true);
  try {
    const response = await axios.post("https://codelens-teo2.onrender.com/ai/get-review", {
      code,
    });
    setReview(response.data);
  } catch (error) {
    console.error("Error fetching review:", error);
  }
  setLoading(false);
}


  return (
    <>
      <main>
        <div className="left">
          <h4>Switch to desktop mode in phones for better experience.</h4>
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div onClick={reviewCode} className="review">
            {loading ? "Generating response..." : "Review"}
          </div>
        </div>
        <div className="right">
          <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
        </div>
      </main>

      {/* Social Links Section */}
      <footer>
        <p>Follow Me:</p>
        <a href="https://www.linkedin.com/in/chiranjeet-dwivedy-17a143279/" target="_blank">LinkedIn</a>
        <a href="https://github.com/CHIRANJEET12" target="_blank">GitHub</a>
        <a href="https://leetcode.com/u/4gVg10rUIY/" target="_blank">LeetCode</a>
        <a href="https://instagram.com/naniantic/" target="_blank">Instagram</a>
      </footer>
    </>
  );
}

export default App;
