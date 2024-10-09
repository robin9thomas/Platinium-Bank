import { User } from "./users.entity"


export const characterProviders = [
    {
        provide: 'USER_REPOSITORY',
        useValue: User
    }
]