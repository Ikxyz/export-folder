#!/usr/bin/env node
import _fs from 'fs';




const fs = _fs.promises;




const exportAll = async (path: string): Promise<string | undefined> => {

    const dir = await fs.readdir(path);

    const fileName = path.split('/').pop();

    const length = dir.length;

    const files: Array<string> = [];

    for (let i = 0; i < length; i++) {



        const stat = await fs.stat(path + '/' + dir[i]);

        if (stat.isDirectory()) {
            const exportFile = await exportAll(path + '/' + dir[i]);

            if (exportFile) {
                files.push(exportFile);
            }
        }

        if (dir[i].endsWith('.dart') && !dir[i].endsWith(fileName + '.dart')) {
            files.push(dir[i]);
        }

    }

    if (files.length == 0) return;

    const fileExtension = '.dart';
    const filePath = `${path}/${fileName}${fileExtension}`;
    const content = files.map((e) => `export '${e}';\n`).join('');

    console.log(filePath);

    await _fs.writeFile(filePath, content, _ => _);

    return `./${fileName}/${fileName}${fileExtension}`;
}

const statExport = () => {
    console.log("Starting")
    const [_, __, path] = process.argv;

    if (!path) return console.log("No Path Provider");

    console.log(path);

    exportAll(path);
}

statExport();


