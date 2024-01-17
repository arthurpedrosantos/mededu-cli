#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = require("./log/log");
const entity_1 = require("./templates/domain/entity");
const repository_impl_1 = require("./templates/repository/repository-impl");
const prisma_mapper_1 = require("./templates/mapper/prisma-mapper");
const typemap_1 = require("./templates/repository/typemap");
const string_1 = require("./util/string");
const db_provider_1 = require("./templates/provider/db-provider");
const repository_interface_1 = require("./templates/repository/repository-interface");
const http_provider_1 = require("./templates/provider/http-provider");
const find_usecase_1 = require("./templates/usecase/find-usecase");
const delete_1 = require("./templates/usecase/delete");
const find_one_1 = require("./templates/usecase/find-one");
const { Command } = require("commander");
const fs = require("fs");
const figlet = require("figlet");
const { execSync } = require("child_process");
const program = new Command();
console.log(figlet.textSync("MedEdu CLI"));
program
    .version("1.4.0")
    .description("Um CLI para criação automação de arquitetura MedEdu - MedEdu CLI - v1.4.0 - 2024")
    .option("-r, --repository <value>", "Cria um novo repositório")
    .option("-u, --usecase <value>", "Cria os casos de uso da entidade")
    .parse(process.argv);
const options = program.opts();
function syncWriteFile(filename, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, (err) => {
            if (err) {
                console.error("Erro ao escrever no arquivo:", err);
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}
function createTypemap(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/base/types/${string_1.StringUtil.kebabCase(repository)}.typemap.ts`, new typemap_1.TypemapTemplate(repository).getTemplate());
        log_1.Log.success(`Typemap ${repository} criado com sucesso!`);
    });
}
function createRepositoryInterface(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/application/repositories/${string_1.StringUtil.kebabCase(repository)}.repository.ts`, new repository_interface_1.RepositotyInterfaceTemplate(repository).getTemplate());
    });
}
function createRepositoryImpl(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/infra/database/prisma/repositories/${string_1.StringUtil.kebabCase(repository)}.repository.ts`, new repository_impl_1.RepositotyImplTemplate(repository).getTemplate());
    });
}
function createEntity(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/domain/entities/${string_1.StringUtil.kebabCase(repository)}.entity.ts`, new entity_1.EntityTemplate(repository).getTemplate());
    });
}
function createPrismaMapper(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/infra/database/prisma/mappers/${string_1.StringUtil.kebabCase(repository)}.mapper.ts`, new prisma_mapper_1.PrismaMapperTemplate(repository).getTemplate());
    });
}
function createFindUsecase(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/application/usecases/${string_1.StringUtil.kebabCase(repository)}/find-one.usecase.ts`, new find_usecase_1.FindUsecaseTemplate(repository).getTemplate());
    });
}
function createFindOneUsecase(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/application/usecases/${string_1.StringUtil.kebabCase(repository)}/find-one.usecase.ts`, new find_one_1.FindOneUsecaseTemplate(repository).getTemplate());
    });
}
function createDeleteUseCase(repository) {
    return __awaiter(this, void 0, void 0, function* () {
        yield syncWriteFile(`src/application/usecases/${string_1.StringUtil.kebabCase(repository)}/delete.usecase.ts`, new delete_1.DeleteUsecaseTemplate(repository).getTemplate());
    });
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.repository) {
            yield createTypemap(options.repository);
            yield createRepositoryInterface(options.repository);
            yield createRepositoryImpl(options.repository);
            yield createEntity(options.repository);
            yield createPrismaMapper(options.repository);
            new db_provider_1.DbProviderTemplate(options.repository).getTemplate();
            execSync("npm run lint");
        }
        if (options.usecase) {
            const path = `src/application/usecases/${string_1.StringUtil.kebabCase(options.usecase)}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, { recursive: true });
            }
            yield createFindUsecase(options.usecase);
            yield createFindOneUsecase(options.usecase);
            yield createDeleteUseCase(options.usecase);
            new http_provider_1.HttpProviderTemplate(options.usecase).getTemplate();
            execSync("npm run lint");
        }
        if (!process.argv.slice(2).length) {
            program.outputHelp();
        }
    });
}
init();
//# sourceMappingURL=index.js.map