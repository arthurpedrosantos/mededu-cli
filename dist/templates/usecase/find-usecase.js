"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUsecaseTemplate = void 0;
const string_1 = require("../../util/string");
class FindUsecaseTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
        return `import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import { ${camelCaseRepository} } from '@src/domain/entities/${lowerCaseRepository}.entity';
    
    import { UseCase } from '../usecase';
    
    type Request = {
      companyId: string;
    };
    
    type Response = ${camelCaseRepository}[];
    
    export abstract class IFind${camelCaseRepository}UseCase extends UseCase<
      Request,
      Response
    > {}
    
    export class Find${camelCaseRepository}UseCase implements IFind${camelCaseRepository}UseCase {
      constructor(private readonly ${lowerCaseRepository}Repo: I${camelCaseRepository}Repository) {}
    
      async execute(request: Request): Promise<Response> {
        const entities = await this.${lowerCaseRepository}Repo.findMany({
          where: {
            company: {
              id: request.companyId,
            },
          },
        });
        return entities;
      }
    }
    `;
    }
}
exports.FindUsecaseTemplate = FindUsecaseTemplate;
//# sourceMappingURL=find-usecase.js.map