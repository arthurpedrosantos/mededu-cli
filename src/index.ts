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
var pjson = require("./../package.json");
const { execSync } = require("child_process");
const cliProgress = require("cli-progress");

const program = new Command();

console.log(figlet.textSync("MedEdu CLI"));

program
  .version(`${pjson.version}`)
  .description(
    `Um CLI para criação automação de arquitetura MedEdu - MedEdu CLI - v${
      pjson.version
    } - ${new Date().getFullYear()}`
  )
  .option("-r, --repository <value>", "Cria um novo repositório")
  .option("-u, --usecase <value>", "Cria os casos de uso da entidade")
  .parse(process.argv);

const options = program.opts();

const paths = {
  base: "src/base",
  types: "src/base/types",
  repositories: "src/application/repositories",
  repositoriesImpl: "src/infra/database/prisma/repositories",
  entities: "src/domain/entities",
  mappers: "src/infra/database/prisma/mappers",
  usecases: "src/application/usecases",
  providers: "src/application/providers",
};

function syncWriteFile(filename: string, data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(filename)) {
      console.error("Arquivo já existe:", filename);
      reject();
    }

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
  try {
    await syncWriteFile(
      `src/base/types/${StringUtil.kebabCase(repository)}.typemap.ts`,
      new TypemapTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`Typemap ${repository} criado com sucesso!`);
}

async function createRepositoryInterface(repository: string) {
  try {
    await syncWriteFile(
      `src/application/repositories/${StringUtil.kebabCase(
        repository
      )}.repository.ts`,
      new RepositotyInterfaceTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`Interface de repositório ${repository} criado com sucesso!`);
}

async function createRepositoryImpl(repository: string) {
  try {
    await syncWriteFile(
      `src/infra/database/prisma/repositories/${StringUtil.kebabCase(
        repository
      )}.repository.ts`,
      new RepositotyImplTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`Impl de repositório ${repository} criado com sucesso!`);
}

async function createEntity(repository: string) {
  try {
    await syncWriteFile(
      `src/domain/entities/${StringUtil.kebabCase(repository)}.entity.ts`,
      new EntityTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`Entidade ${repository} criado com sucesso!`);
}

async function createPrismaMapper(repository: string) {
  try {
    await syncWriteFile(
      `src/infra/database/prisma/mappers/${StringUtil.kebabCase(
        repository
      )}.mapper.ts`,
      new PrismaMapperTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`Mapper ${repository} criado com sucesso!`);
}

async function createFindUsecase(repository: string) {
  try {
    await syncWriteFile(
      `src/application/usecases/${StringUtil.kebabCase(
        repository
      )}/find.usecase.ts`,
      new FindUsecaseTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`FindUseCase ${repository} criado com sucesso!`);
}

async function createFindOneUsecase(repository: string) {
  try {
    await syncWriteFile(
      `src/application/usecases/${StringUtil.kebabCase(
        repository
      )}/find-one.usecase.ts`,
      new FindOneUsecaseTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`FindOneUseCase ${repository} criado com sucesso!`);
}

async function createDeleteUseCase(repository: string) {
  try {
    await syncWriteFile(
      `src/application/usecases/${StringUtil.kebabCase(
        repository
      )}/delete.usecase.ts`,
      new DeleteUsecaseTemplate(repository).getTemplate()
    );
  } catch (error) {}
  Log.success(`DeleteUseCase ${repository} criado com sucesso!`);
}

async function init(): Promise<void> {
  const progressBar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  progressBar.start(100, 0);

  if (options.repository) {
    await createTypemap(options.repository);
    progressBar.update(10);
    await createRepositoryInterface(options.repository);
    progressBar.update(20);
    await createRepositoryImpl(options.repository);
    progressBar.update(30);
    await createEntity(options.repository);
    progressBar.update(40);
    await createPrismaMapper(options.repository);
    progressBar.update(50);

    new DbProviderTemplate(options.repository).getTemplate();
    progressBar.update(60);

    execSync("npm run lint");
    progressBar.update(70);
  }

  if (options.usecase) {
    const path = `src/application/usecases/${StringUtil.kebabCase(
      options.usecase
    )}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    await createFindUsecase(options.usecase);
    progressBar.update(80);
    await createFindOneUsecase(options.usecase);
    progressBar.update(90);
    await createDeleteUseCase(options.usecase);

    new HttpProviderTemplate(options.usecase).getTemplate();

    execSync("npm run lint");
    progressBar.update(100);
  }
  progressBar.update(100);

  progressBar.stop();

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

init();
