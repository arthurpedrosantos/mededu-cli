import { StringUtil } from "../../util/string";

export class RepositotyInterfaceTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
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
