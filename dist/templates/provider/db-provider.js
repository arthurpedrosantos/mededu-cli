"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbProviderTemplate = void 0;
const log_1 = require("../../log/log");
const string_1 = require("../../util/string");
const fs = require("fs");
class DbProviderTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        const filePath = `src/infra/database/prisma-db.providers.ts`;
        const fileContent = fs.readFileSync(filePath, "utf8");
        const newContent = `{
      provide: I${camelCaseRepository}Repository,
      useClass: Prisma${camelCaseRepository}Repository,
    },`;
        if (fileContent.includes(newContent)) {
            log_1.Log.info(`O provider já existe no arquivo`);
            return ``;
        }
        let updatedFileContent = fileContent.replace(`];`, `${newContent}  
      ];`);
        const newImports = `
    import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import { Prisma${camelCaseRepository}Repository } from './prisma/repositories/${lowerCaseRepository}.repository';`;
        updatedFileContent = updatedFileContent.replace(`export const PrismaDbProviders: Provider[] = [`, `${newImports}
      
      export const PrismaDbProviders: Provider[] = [`);
        fs.writeFileSync(filePath, updatedFileContent, "utf8");
        return ``;
    }
}
exports.DbProviderTemplate = DbProviderTemplate;
//# sourceMappingURL=db-provider.js.map