import { StringUtil } from "../../util/string";

export class FindUsecaseTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
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
