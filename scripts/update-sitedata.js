import fs from 'fs';

const filePath = 'src/data/siteData.js';
let content = fs.readFileSync(filePath, 'utf8');

const startMarker = 'export const portfolioCategories =';
const endMarker = 'export const collaborationServices =';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newContent =
    content.slice(0, startIndex) +
    "export { portfolioCategories, portfolioProjects } from './portfolioData';\n\n" +
    content.slice(endIndex);

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('✓ Successfully updated siteData.js to export from portfolioData.js');
} else {
  console.error('Markers not found', { startIndex, endIndex });
}
