import { StringUtil } from "../../util/string";

export class FindOneUsecaseTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
    return `import { I${camelCaseRepository}Repository } from '@src/application/repositories/${lowerCaseRepository}.repository';
    import { ${camelCaseRepository} } from '@src/domain/entities/${lowerCaseRepository}.entity';
    import { ${camelCaseRepository}NotFoundError } from '@src/domain/errors/${lowerCaseRepository}/${lowerCaseRepository}-not-found.error';
    
    import { UseCase } from '../usecase';
    
    type Request = {
      id: string;
    };
    
    type Response = ${camelCaseRepository};
    
    export abstract class IFindOne${camelCaseRepository}UseCase extends UseCase<
      Request,
      Response
    > {}
    
    export class FindOne${camelCaseRepository}UseCase implements IFindOne${camelCaseRepository}UseCase {
      constructor(private readonly ${lowerCaseRepository}Repo: I${camelCaseRepository}Repository) {}
    
      async execute(params: Request): Promise<Response> {
        const { id } = params;
        const entity = await this.${lowerCaseRepository}Repo.findUnique({
          where: { id },
        });
        if (!entity) throw new ${camelCaseRepository}NotFoundError();
        return entity;
      }
    }
    `;
  }
}
