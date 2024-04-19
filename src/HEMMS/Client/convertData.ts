import fs from 'fs';
import path from 'path';

interface JsonItem {
  date: string;
  time: string;
  power: number;
  cost: number;
}

// Get the absolute path to the data.json file
const dataFilePath = path.join(__dirname, 'constants', 'data.json');

// Read the contents of data.json
const jsonData = fs.readFileSync(dataFilePath, 'utf8');

// Parse the JSON content into an array of objects
const data: JsonItem[] = JSON.parse(jsonData);

// Map each object to the DataPoint type structure for power
const powerData = data.map((item: JsonItem) => ({
  date: new Date(item.date + ' ' + item.time).toISOString(),
  value: item.power,
}));

// Map each object to the DataPoint type structure for cost
const costData = data.map((item: JsonItem) => ({
  date: new Date(item.date + ' ' + item.time).toISOString(),
  value: item.cost,
}));

// Generate TypeScript content for power
const powerTsContent = `
export type PowerDataPoint = {
  date: string;
  value: number;
};

export const powerData: PowerDataPoint[] = [
${powerData.map(({ date, value }) => `  {date: '${date}', value: ${value}},`).join('\n')}
];
`;

// Generate TypeScript content for cost
const costTsContent = `
export type CostDataPoint = {
  date: string;
  value: number;
};

export const costData: CostDataPoint[] = [
${costData.map(({ date, value }) => `  {date: '${date}', value: ${value}},`).join('\n')}
];
`;

// Write the TypeScript content to PowerData.ts in the constants directory
fs.writeFileSync(path.join(__dirname, 'constants', 'PowerData.ts'), powerTsContent);

// Write the TypeScript content to CostData.ts in the constants directory
fs.writeFileSync(path.join(__dirname, 'constants', 'CostData.ts'), costTsContent);

console.log('Conversion completed successfully.\n');
