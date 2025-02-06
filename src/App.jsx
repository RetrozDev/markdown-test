import { useState } from "react";
import "./App.css"; // Import du CSS

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(`#  Markdown test \n\n**Bold** and *italic*\n\n\`\`\`js\nconsole.log("Hello!");\n\`\`\`\n\n- Item 1\n- Item 2\n\n[Google](https://google.com)`);

  const convertMarkdownToHtml = (md) => {
    return md
    // Titres
    .replace(/^###### (.*$)/gim, "<h6>$1</h6>")
    .replace(/^##### (.*$)/gim, "<h5>$1</h5>")
    .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // Gras & Italique
    .replace(/\*\*(.*?)\*\*/gim, "<b>$1</b>") // **bold**
    .replace(/__(.*?)__/gim, "<b>$1</b>") // __bold__
    .replace(/\*(.*?)\*/gim, "<i>$1</i>") // *italic*
    .replace(/_(.*?)_/gim, "<i>$1</i>") // _italic_

    // Code inline & blocs de code
    .replace(/```([^`]+)```/gims, "<pre><code>$1</code></pre>") // ```code```

    // Listes ordonnées & non ordonnées
    .replace(/^\s*\- (.*$)/gim, "<ul><li>$1</li></ul>") // - item
    .replace(/^\s*\d+\.(.*$)/gim, "<ol><li>$1</li></ol>") // 1. item

    // Citations
    .replace(/^> (.*$)/gim, "<blockquote>$1</blockquote>") // > quote

    // Liens
    .replace(/\[([^\]]+)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>') // [text](url)

    // Images
    .replace(/!\[([^\]]+)\]\((.*?)\)/gim, '<img src="$2" alt="$1" style="max-width:100%"/>') // ![alt](url)

    // Retours à la ligne
    .replace(/\n/gim, "<br>")

  };

  return (
    <div className="App">
      <textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Innerhtml isn't risky here */}
      <div className="preview" dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }} />
    </div>
  );
}
