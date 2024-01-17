import { StringUtil } from "../../util/string";

export class RepositotyImplTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
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
