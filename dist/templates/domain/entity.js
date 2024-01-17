"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityTemplate = void 0;
const string_1 = require("../../util/string");
class EntityTemplate {
    constructor(repository) {
        this.repository = repository;
    }
    getTemplate() {
        const camelCaseRepository = string_1.StringUtil.camelCase(this.repository);
        const lowerCaseRepository = string_1.StringUtil.lowerCase(this.repository);
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
exports.EntityTemplate = EntityTemplate;
//# sourceMappingURL=entity.js.map