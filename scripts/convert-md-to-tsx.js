const fs = require('fs');
const path = require('path');

// Read the COMPLETE.md file
const mdPath = '/Users/michalslawinski/Downloads/Szkolenie_dla_M_odych_Influencer_w/mlody_influencer_kurs_COMPLETE.md';
const outputPath = '/Users/michalslawinski/Sites/mayiai.pl/app/szkolenia/mlody-influencer/training-modules-data-FULL.tsx';

const mdContent = fs.readFileSync(mdPath, 'utf8');
const lines = mdContent.split('\n');

console.log(`Total lines: ${lines.length}`);

// Split content into modules based on ## headers
const modules = [];
let currentModule = null;
let currentContent = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Main section headers (##)
  if (line.startsWith('## ') && !line.includes('Spis Treści')) {
    // Save previous module
    if (currentModule && currentContent.length > 0) {
      modules.push({
        ...currentModule,
        rawContent: currentContent.join('\n')
      });
    }
    
    // Start new module
    const title = line.replace('## ', '').trim();
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9ąćęłńóśźż\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    currentModule = { id, title };
    currentContent = [];
  } else if (currentModule) {
    currentContent.push(line);
  }
}

// Save last module
if (currentModule && currentContent.length > 0) {
  modules.push({
    ...currentModule,
    rawContent: currentContent.join('\n')
  });
}

console.log(`Found ${modules.length} modules`);
modules.forEach((m, i) => {
  console.log(`${i + 1}. ${m.title} (${m.id}) - ${m.rawContent.length} chars`);
});

// Convert MD to TSX
function mdToTSX(md) {
  let tsx = md;
  
  // Headers
  tsx = tsx.replace(/### (.+)/g, '<h3 className="text-2xl font-bold text-purple-800 mt-8 mb-4">$1</h3>');
  tsx = tsx.replace(/#### (.+)/g, '<h4 className="text-xl font-bold text-purple-700 mt-6 mb-3">$1</h4>');
  tsx = tsx.replace(/##### (.+)/g, '<h5 className="text-lg font-semibold text-gray-800 mt-4 mb-2">$1</h5>');
  
  // Bold & Italic
  tsx = tsx.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  tsx = tsx.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Lists
  tsx = tsx.replace(/^- (.+)$/gm, '<li>$1</li>');
  tsx = tsx.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
  
  // Wrap lists
  tsx = tsx.replace(/(<li>.+?<\/li>\n)+/gs, (match) => {
    return `<ul className="list-disc pl-6 space-y-2 my-4">\n${match}</ul>\n`;
  });
  
  // Paragraphs
  tsx = tsx.split('\n\n').map(para => {
    if (para.trim() && !para.includes('<') && !para.startsWith('#')) {
      return `<p className="mb-4">${para.trim()}</p>`;
    }
    return para;
  }).join('\n\n');
  
  // Code blocks for special sections
  tsx = tsx.replace(/```(.+?)```/gs, '<div className="bg-gray-100 p-4 rounded-lg my-4"><code>$1</code></div>');
  
  return tsx;
}

// Generate TSX file
let tsxOutput = `import React from 'react'\n\nexport const trainingModules = [\n`;

modules.forEach((module, idx) => {
  const tsxContent = mdToTSX(module.rawContent);
  
  tsxOutput += `  {\n`;
  tsxOutput += `    id: '${module.id}',\n`;
  tsxOutput += `    title: '${module.title.replace(/'/g, "\\'")}',\n`;
  tsxOutput += `    duration: '${Math.max(10, Math.floor(module.rawContent.length / 500))} min',\n`;
  tsxOutput += `    content: (\n`;
  tsxOutput += `      <div className="space-y-6 text-gray-700 leading-relaxed">\n`;
  tsxOutput += `        ${tsxContent}\n`;
  tsxOutput += `      </div>\n`;
  tsxOutput += `    )\n`;
  tsxOutput += `  }${idx < modules.length - 1 ? ',' : ''}\n`;
});

tsxOutput += `]\n`;

fs.writeFileSync(outputPath, tsxOutput, 'utf8');
console.log(`\n✅ Generated: ${outputPath}`);
console.log(`Total modules: ${modules.length}`);
