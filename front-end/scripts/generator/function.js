const fs = require('fs');
const path = require('path');

Object.defineProperty(String.prototype, 'capitalize', {
    value: function () {
        return this.charAt(0).toUpperCase() + this.slice(1);
    },
    enumerable: false,
});

function camelize(str) {
    return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

function generateRepo(name) {
    console.log(`Creating repository ${name}...`);
    const repositoryPath = path.join(__dirname, `../src/database/repositories`);
    const repositoryFilePath = path.join(repositoryPath, `${name}.repository.ts`);
    const nameCapitalized = name.capitalize();

    const repositoryTemplate = `/* eslint-disable @typescript-eslint/no-unused-vars */

import { EntityRepository, Repository } from 'typeorm';
import { ${nameCapitalized}Entity } from '~/database/entities/${name}.entity';

@EntityRepository(${nameCapitalized}Entity)
export class ${nameCapitalized}Repository extends Repository<${nameCapitalized}Entity> {}
`;

    if (!fs.existsSync(repositoryPath)) {
        fs.mkdirSync(repositoryPath, { recursive: true });
    }

    fs.writeFileSync(repositoryFilePath, repositoryTemplate);
}

function importToModule(name) {
    console.log(`Importing repository to module...`);
    const nameCapitalized = name.capitalize();
    const modulePath = path.join(__dirname, `../src/database/database.module.ts`);
    const moduleContent = fs.readFileSync(modulePath, 'utf8');
    // find const entities array in moduleContent
    const entities = moduleContent
        .match(/const entities = \[(.*?)\]/s)[1]
        .split(',')
        .map((e) => e.trim());
    if (entities instanceof Array) entities.push(`${nameCapitalized}Entity`);

    // find all imports in moduleContent
    const imports = moduleContent.match(/import \{.*?\} from .*/g);
    if (imports instanceof Array) imports.push(`import { ${nameCapitalized}Entity } from '~/database/entities/${name}.entity';`);
    console.log('LOG:: imports:', imports);

    let newModuleContent = moduleContent;
    // delete all imports from moduleContent and remove empty lines
    newModuleContent = newModuleContent.replace(/import \{.*?\} from .*/g, '');
    newModuleContent = newModuleContent.replace(/^\s*[\r\n]const entities/gm, 'const entities');

    // add new imports to first line
    newModuleContent = `${imports.join('\n')}\r\n\r\n${newModuleContent}`;

    // write entities to moduleContent
    newModuleContent = newModuleContent.replace(
        /const entities = \[(.*?)\]/s,
        `const entities = [\n    ${entities.join(',\n    ')}\n]`,
    );

    console.log('LOG:: newModuleContent:', newModuleContent);

    // write moduleContent to modulePath
    fs.writeFileSync(modulePath, newModuleContent);
}

module.exports = {
    camelize,
    generateRepo,
    importToModule,
};
