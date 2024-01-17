"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypemapTemplate = void 0;
const string_1 = require("../../util/string");
class TypemapTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        return `import { Prisma } from '@prisma/client';

import { CrudTypeMap } from './crud.typemap';

export class ${camelCaseRepository}TypeMap implements CrudTypeMap {
  aggregate: Prisma.${camelCaseRepository}AggregateArgs;
  count: Prisma.${camelCaseRepository}CountArgs;
  create: Prisma.${camelCaseRepository}CreateArgs;
  delete: Prisma.${camelCaseRepository}DeleteArgs;
  deleteMany: Prisma.${camelCaseRepository}DeleteManyArgs;
  findFirst: Prisma.${camelCaseRepository}FindFirstArgs;
  findMany: Prisma.${camelCaseRepository}FindManyArgs;
  findUnique: Prisma.${camelCaseRepository}FindUniqueArgs;
  update: Prisma.${camelCaseRepository}UpdateArgs;
  updateMany: Prisma.${camelCaseRepository}UpdateManyArgs;
  upsert: Prisma.${camelCaseRepository}UpsertArgs;
}`;
    }
}
exports.TypemapTemplate = TypemapTemplate;
//# sourceMappingURL=typemap.js.map