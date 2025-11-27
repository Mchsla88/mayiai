const fs = require('fs');

const content = fs.readFileSync('full_content.txt', 'utf8');

// Clean up the content - remove extra whitespace but preserve structure
const cleanContent = (text) => {
  return text
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
};

// Helper to convert plain text to HTML with basic formatting
const textToHtml = (text) => {
  return text
    .split('\n\n')
    .map(para => {
      para = para.trim();
      if (!para) return '';
      
      // Headers
      if (para.match(/^(Sekcja|Rozdział|Zakończenie)/)) {
        return `<h3 class="text-2xl font-bold text-purple-700 mb-4 mt-6">${para}</h3>`;
      }
      if (para.match(/^\d+\./)) {
        return `<h4 class="text-xl font-bold text-gray-800 mb-3 mt-4">${para}</h4>`;
      }
      
      // Lists
      if (para.includes('\n') && para.match(/^[•\-]/m)) {
        const items = para.split('\n').filter(l => l.trim());
        return `<ul class="list-disc list-inside space-y-2 text-gray-700 mb-4">${items.map(item => `<li>${item.replace(/^[•\-]\s*/, '')}</li>`).join('')}</ul>`;
      }
      
      // Regular paragraph
      return `<p class="text-gray-700 mb-4 leading-relaxed">${para}</p>`;
    })
    .join('\n');
};

// Extract major sections
const wstep = content.match(/Sztuczna Inteligencja w Edukacji.*?(?=Rozdział 1\.)/s)?.[0] || '';
const r1 = content.match(/Rozdział 1\..*?(?=Rozdział 2\.)/s)?.[0] || '';
const r2 = content.match(/Rozdział 2\..*?(?=Rozdział 3\.)/s)?.[0] || '';
const r3 = content.match(/Rozdział 3\..*?(?=Rozdział 4\.)/s)?.[0] || '';
const r4 = content.match(/Rozdział 4\..*?(?=Rozdział 5\.)/s)?.[0] || '';
const r5 = content.match(/Rozdział 5\..*?(?=Rozdział 6\.)/s)?.[0] || '';
const r6 = content.match(/Rozdział 6\..*?(?=Rozdział 7\.)/s)?.[0] || '';
const r7 = content.match(/Rozdział 7\..*?(?=Zakończenie)/s)?.[0] || '';
const koniec = content.match(/Zakończenie:.*$/s)?.[0] || '';

console.log('Extracted sections - lengths:');
console.log('Wstęp:', wstep.length);
console.log('R1:', r1.length);
console.log('R2:', r2.length);
console.log('R3:', r3.length);
console.log('R4:', r4.length);
console.log('R5:', r5.length);
console.log('R6:', r6.length);
console.log('R7:', r7.length);
console.log('Koniec:', koniec.length);

// Save individual files for each chapter
fs.writeFileSync('content_wstep.txt', cleanContent(wstep));
fs.writeFileSync('content_r1.txt', cleanContent(r1));
fs.writeFileSync('content_r2.txt', cleanContent(r2));
fs.writeFileSync('content_r3.txt', cleanContent(r3));
fs.writeFileSync('content_r4.txt', cleanContent(r4));
fs.writeFileSync('content_r5.txt', cleanContent(r5));
fs.writeFileSync('content_r6.txt', cleanContent(r6));
fs.writeFileSync('content_r7.txt', cleanContent(r7));
fs.writeFileSync('content_koniec.txt', cleanContent(koniec));

console.log('Files created successfully!');
