import { Log } from "../../log/log";
import { StringUtil } from "../../util/string";

const fs = require("fs");

export class DbProviderTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);

    const filePath = `src/infra/database/prisma-db.providers.ts`;
    const fileContent = fs.readFileSync(filePath, "utf8");

    const newContent = `{
      provide: I${camelCaseRepository}Repository,
      useClass: Prisma${camelCaseRepository}Repository,
    },`;

    if (fileContent.includes(newContent)) {
      Log.info(`O provider já existe no arquivo`);
      return ``;
    }

    let updatedFileContent = fileContent.replace(
      `];`,
      `${newContent}  
      ];`
    );

    const newImports = `
    import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import { Prisma${camelCaseRepository}Repository } from './prisma/repositories/${lowerCaseRepository}.repository';`;

    updatedFileContent = updatedFileContent.replace(
      `export const PrismaDbProviders: Provider[] = [`,
      `${newImports}
      
      export const PrismaDbProviders: Provider[] = [`
    );

    fs.writeFileSync(filePath, updatedFileContent, "utf8");

    return ``;
  }
}
