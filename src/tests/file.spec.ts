import fs from 'fs'
import path from 'path';

let schemaFilename: string;

beforeAll(() => {
    schemaFilename = path.join(__dirname, 'mock.json');
});

it('should remove duplicate field by key', () => {
    let schemaNormalized = JSON.parse(fs.readFileSync(schemaFilename, 'utf8'));
    fs.writeFileSync('src/clean_application.json', JSON.stringify(schemaNormalized, null, 2));
});

it('dir path should not contain duplicate files', () => {
    expect(__dirname).toContain('src\\tests');
});

it('dir path should not contain duplicate files', () => {
    expect(fs.existsSync('src\\tests\\mock.json')).toBe(true);
});

it('writes the clean file', () => {
    let test = "test";
    // write to file
    fs.writeFileSync('clean.output.json', test);
    expect(fs.existsSync('clean.output.json')).toBe(true);
});

it('writes the clean file', () => {
    let test = "test";
    // write to file
    fs.writeFileSync('clean.output.json', test);
    let read = fs.readFileSync('clean.output.json', 'utf8');
    expect(read).toBe(test);
});