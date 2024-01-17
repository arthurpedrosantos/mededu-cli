import { StringUtil } from "../../util/string";

export class TypemapTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
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
