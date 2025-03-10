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
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    setLoading(true); // Show loader
    setReview(""); // Clear previous review

    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(response.data);
    } catch (error) {
      setReview("Error fetching review. Please try again.");
    } finally {
      setLoading(false); // Hide loader after response
    }
  }

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
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

          <div onClick={!loading ? reviewCode : null} className={`review ${loading ? "disabled" : ""}`}>
            {loading ? <span className="loader"></span> : "Review"}
          </div>
        </div>

        <div className="right">
          {loading ? <div className="loading-text">Generating review...</div> : <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>}
        </div>
      </main>
    </>
  );
}

export default App;
