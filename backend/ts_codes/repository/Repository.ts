import { Repository } from "typeorm"

export interface repositoryI {
    [name: string]: Repository<any>
}

export class Repo { 

    static ArrayOfRepositories: repositoryI = {}
    
    static create(repositories: repositoryI ) {
        Repo.ArrayOfRepositories = repositories
    }

    static getRepo(name: string) {
        return Repo.ArrayOfRepositories[name]
    }

}