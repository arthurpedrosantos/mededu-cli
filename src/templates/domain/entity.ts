import { StringUtil } from "../../util/string";

export class EntityTemplate implements Template {
  constructor(private repository: string) {}
  getTemplate(): string {
    const camelCaseRepository = StringUtil.camelCase(this.repository);
    const lowerCaseRepository = StringUtil.lowerCase(this.repository);
    return `import { BaseEntity } from '@src/base/model/base.entity';

    export interface ${camelCaseRepository}Props {
      id?: string;
    }
    
    export class ${camelCaseRepository} extends BaseEntity {
      constructor(private readonly props: ${camelCaseRepository}Props) {
        super({
          id: props.id,
        });
      }
    
      public get id(): string {
        return super.id;
      }
    }
    `;
  }
}
