const fs = require('fs');
const text = fs.readFileSync('full_content.txt', 'utf8');

// Find Rozdział 2
const r2Start = text.indexOf('Rozdział 2. Etyczny Kompas');
const r2End = text.indexOf('Rozdział 3. Sztuka Dialogu');

if (r2Start > 0 && r2End > r2Start) {
  const r2 = text.substring(r2Start, r2End);
  fs.writeFileSync('chapter2_extracted.txt', r2);
  console.log('Extracted Chapter 2:', r2.length, 'chars');
  console.log('First 500 chars:', r2.substring(0, 500));
} else {
  console.log('Not found');
}
