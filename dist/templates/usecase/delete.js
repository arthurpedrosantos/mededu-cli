"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUsecaseTemplate = void 0;
const string_1 = require("../../util/string");
class DeleteUsecaseTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        return `import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import { ${camelCaseRepository}NotFoundError } from '@src/domain/errors/${lowerCaseRepository}/${lowerCaseRepository}-not-found.error';
    
    import { UseCase } from '../usecase';
    
    type Request = {
      id: string;
    };
    
    type Response = void;
    
    export abstract class IDelete${camelCaseRepository}UseCase extends UseCase<
      Request,
      Response
    > {}
    
    export class Delete${camelCaseRepository}UseCase implements IDelete${camelCaseRepository}UseCase {
      constructor(private readonly ${lowerCaseRepository}Repo: I${camelCaseRepository}Repository) {}
    
      async execute(params: Request): Promise<Response> {
        const { id } = params;
        const ${lowerCaseRepository}Exists = await this.${lowerCaseRepository}Repo.findUnique({
          where: { id },
        });
        if (!${lowerCaseRepository}Exists) throw new ${camelCaseRepository}NotFoundError();
        await this.${lowerCaseRepository}Repo.delete({
          where: { id },
        });
      }
    }
    `;
    }
}
exports.DeleteUsecaseTemplate = DeleteUsecaseTemplate;
//# sourceMappingURL=delete.js.map