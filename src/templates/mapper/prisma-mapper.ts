import { StringUtil } from "../../util/string";

export class PrismaMapperTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
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
