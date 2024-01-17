import { StringUtil } from "../../util/string";

export class DeleteUsecaseTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
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
