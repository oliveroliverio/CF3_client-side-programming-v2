// note, this currently is meant to be run on chrome dev tools as a code snippet.  make an npm run version later.

// Function to handle pre code blocks
function handlePreCodeBlock(preElement) {
    // Get all code elements within this pre block
    const codeContent = Array.from(preElement.querySelectorAll('code'))
        .map(code => code.textContent.trim())
        .join('\n');

    // Default to 'js' for JavaScript
    let language = 'js';
    // Look for specific language classes
    const languageClass = Array.from(preElement.classList)
        .find(cls => cls.startsWith('language-'));
    if (languageClass) {
        const detectedLang = languageClass.replace('language-', '');
        if (detectedLang) language = detectedLang;
    }

    return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n\n`;
}

// Main conversion function
function convertHtmlToMarkdown() {
    let markdown = '';
    const container = document.body; // Changed from getElementById to use body

    function processNode(node) {
        switch (node.nodeName.toLowerCase()) {
            case 'h1':
            case 'h2':
            case 'h3':
            case 'h4':
            case 'h5':
            case 'h6': {
                const level = node.nodeName.charAt(1);
                const text = node.textContent.trim();
                markdown += `\n${'#'.repeat(level)} ${text}\n\n`;
                break;
            }
            case 'p': {
                let text = '';
                for (const child of node.childNodes) {
                    if (child.nodeType === Node.TEXT_NODE) {
                        text += child.textContent;
                    } else if (child.nodeName.toLowerCase() === 'code') {
                        text += `\`${child.textContent.trim()}\``;
                    } else if (child.nodeName.toLowerCase() === 'a') {
                        text += `[${child.textContent}](${child.href})`;
                    } else if (child.nodeName.toLowerCase() === 'img') {
                        text += `![${child.alt}](${child.src})`;
                    } else {
                        text += child.textContent;
                    }
                }
                if (text.trim()) { // Only add non-empty paragraphs
                    markdown += text.trim() + '\n\n';
                }
                break;
            }
            case 'pre': {
                if (node.classList.contains('prettyprint') && node.classList.contains('prettyprinted')) {
                    markdown += handlePreCodeBlock(node);
                }
                break;
            }
            case 'code': {
                if (!node.closest('pre.prettyprint.prettyprinted')) {
                    let codeContent = node.textContent.trim();
                    if (!node.closest('p')) {
                        markdown += `\n\`\`\`js\n${codeContent}\n\`\`\`\n\n`;
                    }
                }
                break;
            }
            case 'ul':
            case 'ol': {
                markdown += '\n';
                Array.from(node.children).forEach(li => {
                    const prefix = node.nodeName.toLowerCase() === 'ul' ? '- ' : '1. ';
                    markdown += `${prefix}${li.textContent.trim()}\n`;
                });
                markdown += '\n';
                break;
            }
            case 'blockquote': {
                const text = node.textContent.trim().split('\n')
                    .map(line => `> ${line}`)
                    .join('\n');
                markdown += `\n${text}\n\n`;
                break;
            }
            case 'img': {
                markdown += `![${node.alt}](${node.src})\n\n`;
                break;
            }
            default: {
                if (node.childNodes && node.childNodes.length > 0) {
                    for (const child of node.childNodes) {
                        processNode(child);
                    }
                }
            }
        }
    }

    processNode(container);
    return markdown.trim();
}

// Execute and copy to clipboard
const markdown = convertHtmlToMarkdown();
copy(markdown);  // This will copy the markdown to your clipboard
console.log('Markdown has been copied to your clipboard!');
console.log('Preview of the first 500 characters:');
console.log(markdown.substring(0, 500));
