"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMapperTemplate = void 0;
const string_1 = require("../../util/string");
class PrismaMapperTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        return `import { ${camelCaseRepository} as Prisma${camelCaseRepository} } from '@prisma/client';
    import { ${camelCaseRepository} } from '@src/domain/entities/${lowerCaseRepository}.entity';
    
    export abstract class Prisma${camelCaseRepository}Mapper {
      public static toPrisma(${lowerCaseRepository}: ${camelCaseRepository}): Prisma${camelCaseRepository} {
        if (! ${lowerCaseRepository}) return null;
        return {
          id: ${lowerCaseRepository}.id,
        };
      }
      public static toDomain(${lowerCaseRepository}: Prisma${camelCaseRepository}): ${camelCaseRepository} {
        if (!${lowerCaseRepository}) return null;
        return new ${camelCaseRepository}({
          id: ${lowerCaseRepository}.id,
        });
      }
      public static toDomainList(entities: Prisma${camelCaseRepository}[]): ${camelCaseRepository}[] {
        return entities.map((entity) => this.toDomain(entity));
      }
    }`;
    }
}
exports.PrismaMapperTemplate = PrismaMapperTemplate;
//# sourceMappingURL=prisma-mapper.js.map