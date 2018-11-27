const chartThemeJson = '../assets/config/ascm-chart-theme.project.json';

const { resolve, relative } = require('path');
// source file
const chartTheme = require(chartThemeJson);
const { writeFileSync } = require('fs-extra');

const file = resolve(__dirname, '..','app', 'config', 'chart-theme.ts');
writeFileSync(file,
`// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export const chartTheme = ${JSON.stringify(chartTheme, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

console.log(`exchange ${chartThemeJson} to ${relative(resolve(__dirname, '..'), file)}`);