"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositotyImplTemplate = void 0;
const string_1 = require("../../util/string");
class RepositotyImplTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        return `import { Injectable } from '@nestjs/common';
import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
import { PrismaManagerService } from '@src/infra/lib/prisma/prisma-manager.service';

@Injectable()
export class Prisma${camelCaseRepository}Repository extends I${camelCaseRepository}Repository {
  constructor(private readonly prisma: PrismaManagerService) {
    super(prisma.${lowerCaseRepository});
  }
}`;
    }
}
exports.RepositotyImplTemplate = RepositotyImplTemplate;
//# sourceMappingURL=repository-impl.js.map