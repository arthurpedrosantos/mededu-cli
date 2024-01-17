"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositotyInterfaceTemplate = void 0;
const string_1 = require("../../util/string");
class RepositotyInterfaceTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        return `import { Prisma } from '@prisma/client';
import { CrudRepository } from '@src/base/crud.repository';
import { ${camelCaseRepository}TypeMap } from '@src/base/types/${lowerCaseRepository}.typemap';
import { ${camelCaseRepository} } from '@src/domain/entities/${lowerCaseRepository}.entity';

export abstract class I${camelCaseRepository}Repository extends CrudRepository<
${camelCaseRepository},
Prisma.${camelCaseRepository}Delegate,
${camelCaseRepository}TypeMap
> {
    constructor(protected readonly ${lowerCaseRepository}: Prisma.${camelCaseRepository}Delegate) {
        super(${lowerCaseRepository});
    }
}`;
    }
}
exports.RepositotyInterfaceTemplate = RepositotyInterfaceTemplate;
//# sourceMappingURL=repository-interface.js.map