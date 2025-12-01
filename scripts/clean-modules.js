const fs = require('fs');

// Read current file
const filePath = '/Users/michalslawinski/Sites/mayiai.pl/app/szkolenia/mlody-influencer/training-modules-data.tsx';
const content = fs.readFileSync(filePath, 'utf8');

// Extract all modules
const moduleMatches = content.matchAll(/\{[\s\S]*?id: '([^']+)',[\s\S]*?title: '([^']+)',[\s\S]*?duration: '([^']+)',[\s\S]*?content: \([\s\S]*?\n    \}\n  \}/g);

const modules = Array.from(moduleMatches).map((match, idx) => ({
  index: idx,
  id: match[1],
  title: match[2],
  duration: match[3],
  fullText: match[0]
}));

console.log(`Found ${modules.length} modules:\n`);
modules.forEach((m, i) => {
  console.log(`${i + 1}. ${m.id}`);
  console.log(`   Title: ${m.title}`);
  console.log(`   Duration: ${m.duration}`);
  console.log('');
});

// Identify duplicates
const idCounts = {};
modules.forEach(m => {
  idCounts[m.id] = (idCounts[m.id] || 0) + 1;
});

console.log('\nDuplicates:');
Object.entries(idCounts).forEach(([id, count]) => {
  if (count > 1) {
    console.log(`- ${id}: ${count}x`);
  }
});

// Recommended structure - keep first occurrence of each unique section
const keepModules = [
  'kompleksowy-przewodnik-dla-dzieci-i-rodziców', // Spis treści
  'wstęp-witaj-w-świecie-kreatywności-', // Wstęp (first one with emojis)
  'część-i-twoje-bezpieczne-cyfrowe-miejsce-platformy', // Część I (first one)
  'część-ii-twój-arsenał-bezpłatne-i-bezpieczne-narzę', // Część II
  'część-iii-maszyna-do-pomysłów-od-myśli-do-treści-', // Część III
  'część-iv-twój-plan-kalendarz-treści-krok-po-kroku-', // Część IV
  'część-v-specjalna-sekcja-dla-rodziców-', // Część V
  'część-vi-rozwijanie-umiejętności-młodego-twórcy-', // Część VI
  'część-vii-50-ciekawych-projektów-dla-młodych-influ', // Część VII (short)
  'część-specjalna-wszystkie-52-projekty---kompletne-', // 52 projekty (FULL)
  'zakończenie-twoja-podróż-dopiero-się-zaczyna-', // Zakończenie
  'załączniki-' // Załączniki
];

console.log(`\nRecommended to keep: ${keepModules.length} modules`);
console.log('Will remove duplicates and keep only essential content.\n');

// Build new file
let newContent = `import React from 'react'\n\nexport const trainingModules = [\n`;

let keptCount = 0;
const seen = new Set();

modules.forEach(module => {
  if (keepModules.includes(module.id) && !seen.has(module.id)) {
    newContent += `  ${module.fullText},\n`;
    seen.add(module.id);
    keptCount++;
    console.log(`✓ Keeping: ${module.title}`);
  }
});

newContent += `]\n`;

// Save
const outputPath = '/Users/michalslawinski/Sites/mayiai.pl/app/szkolenia/mlody-influencer/training-modules-data-CLEAN.tsx';
fs.writeFileSync(outputPath, newContent, 'utf8');

console.log(`\n✅ Generated clean file: ${outputPath}`);
console.log(`Kept ${keptCount} modules (removed ${modules.length - keptCount} duplicates)`);
