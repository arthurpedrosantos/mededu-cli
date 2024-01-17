import { StringUtil } from "../../util/string";
const fs = require("fs");

export class HttpProviderTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);

    const filePath = `src/infra/http/http.providers.ts`;
    const fileContent = fs.readFileSync(filePath, "utf8");

    const findUsecaseProvider = `ProviderFactory.provide(IFind${camelCaseRepository}UseCase, Find${camelCaseRepository}UseCase, [
      I${camelCaseRepository}Repository,
    ]),
    ProviderFactory.provide(IFindOne${camelCaseRepository}UseCase, FindOne${camelCaseRepository}UseCase, [
      I${camelCaseRepository}Repository,
    ]),
    ProviderFactory.provide(IDelete${camelCaseRepository}UseCase, Delete${camelCaseRepository}UseCase, [
      I${camelCaseRepository}Repository,
    ]),`;

    let updatedFileContent = fileContent.replace(
      `...HttpExternalProviders,`,
      `...HttpExternalProviders,
      ${findUsecaseProvider}`
    );

    const newImports = `
    import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import {
      Find${camelCaseRepository}UseCase,
      IFind${camelCaseRepository}UseCase,
    } from '@src/application/usecases/${lowerCaseRepository}/find.usecase';
    import {
      FindOne${camelCaseRepository}UseCase,
      IFindOne${camelCaseRepository}UseCase,
    } from '@src/application/usecases/${lowerCaseRepository}/find-one.usecase';
    import {
      Delete${camelCaseRepository}UseCase,
      IDelete${camelCaseRepository}UseCase,
    } from '@src/application/usecases/${lowerCaseRepository}/delete.usecase';
    `;

    updatedFileContent = updatedFileContent.replace(
      `export const HttpExternalProviders: Provider[] = [`,
      `${newImports}
      
      export const HttpExternalProviders: Provider[] = [`
    );

    fs.writeFileSync(filePath, updatedFileContent, "utf8");

    return ``;
  }
}
