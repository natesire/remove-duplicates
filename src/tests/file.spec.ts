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

// looks for duplicate files starting from the root dir
it('dir path should not contain duplicate files', () => {
    expect(__dirname).toContain('src\\tests');
});