import { atom } from 'nanostores'

export type User = {
    username: string,
    isAdmin: boolean
}

export const users = atom<User[]>([])

export function addUser(user: User) :void {
    users.set([...users.get(), user]);
}
