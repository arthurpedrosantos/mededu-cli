#! /usr/bin/env node

import { Log } from "./log/log";
import { EntityTemplate } from "./templates/domain/entity";
import { RepositotyImplTemplate } from "./templates/repository/repository-impl";
import { PrismaMapperTemplate } from "./templates/mapper/prisma-mapper";
import { TypemapTemplate } from "./templates/repository/typemap";
import { StringUtil } from "./util/string";
import { DbProviderTemplate } from "./templates/provider/db-provider";
import { RepositotyInterfaceTemplate } from "./templates/repository/repository-interface";
import { HttpProviderTemplate } from "./templates/provider/http-provider";
import { FindUsecaseTemplate } from "./templates/usecase/find-usecase";
import { DeleteUsecaseTemplate } from "./templates/usecase/delete";
import { FindOneUsecaseTemplate } from "./templates/usecase/find-one";

const { Command } = require("commander");
const fs = require("fs");
const figlet = require("figlet");

const { execSync } = require("child_process");

const program = new Command();

console.log(figlet.textSync("MedEdu CLI"));

program
  .version("1.4.1")
  .description(
    "Um CLI para criação automação de arquitetura MedEdu - MedEdu CLI - v1.4.1 - 2024"
  )
  .option("-r, --repository <value>", "Cria um novo repositório")
  .option("-u, --usecase <value>", "Cria os casos de uso da entidade")
  .parse(process.argv);

const options = program.opts();

function syncWriteFile(filename: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err: any) => {
      if (err) {
        console.error("Erro ao escrever no arquivo:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function createTypemap(repository: string) {
  await syncWriteFile(
    `src/base/types/${StringUtil.kebabCase(repository)}.typemap.ts`,
    new TypemapTemplate(repository).getTemplate()
  );
  Log.success(`Typemap ${repository} criado com sucesso!`);
}

async function createRepositoryInterface(repository: string) {
  await syncWriteFile(
    `src/application/repositories/${StringUtil.kebabCase(
      repository
    )}.repository.ts`,
    new RepositotyInterfaceTemplate(repository).getTemplate()
  );
}

async function createRepositoryImpl(repository: string) {
  await syncWriteFile(
    `src/infra/database/prisma/repositories/${StringUtil.kebabCase(
      repository
    )}.repository.ts`,
    new RepositotyImplTemplate(repository).getTemplate()
  );
}

async function createEntity(repository: string) {
  await syncWriteFile(
    `src/domain/entities/${StringUtil.kebabCase(repository)}.entity.ts`,
    new EntityTemplate(repository).getTemplate()
  );
}

async function createPrismaMapper(repository: string) {
  await syncWriteFile(
    `src/infra/database/prisma/mappers/${StringUtil.kebabCase(
      repository
    )}.mapper.ts`,
    new PrismaMapperTemplate(repository).getTemplate()
  );
}

async function createFindUsecase(repository: string) {
  await syncWriteFile(
    `src/application/usecases/${StringUtil.kebabCase(
      repository
    )}/find-one.usecase.ts`,
    new FindUsecaseTemplate(repository).getTemplate()
  );
}

async function createFindOneUsecase(repository: string) {
  await syncWriteFile(
    `src/application/usecases/${StringUtil.kebabCase(
      repository
    )}/find-one.usecase.ts`,
    new FindOneUsecaseTemplate(repository).getTemplate()
  );
}

async function createDeleteUseCase(repository: string) {
  await syncWriteFile(
    `src/application/usecases/${StringUtil.kebabCase(
      repository
    )}/delete.usecase.ts`,
    new DeleteUsecaseTemplate(repository).getTemplate()
  );
}

async function init(): Promise<void> {
  if (options.repository) {
    await createTypemap(options.repository);
    await createRepositoryInterface(options.repository);
    await createRepositoryImpl(options.repository);
    await createEntity(options.repository);
    await createPrismaMapper(options.repository);

    new DbProviderTemplate(options.repository).getTemplate();

    execSync("npm run lint");
  }

  if (options.usecase) {
    const path = `src/application/usecases/${StringUtil.kebabCase(
      options.usecase
    )}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    await createFindUsecase(options.usecase);
    await createFindOneUsecase(options.usecase);
    await createDeleteUseCase(options.usecase);

    new HttpProviderTemplate(options.usecase).getTemplate();

    execSync("npm run lint");
  }

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

init();
