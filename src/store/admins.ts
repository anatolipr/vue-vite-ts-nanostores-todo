import {computed, ReadableAtom} from 'nanostores'
import {User, users} from './users.js'

export const admins :ReadableAtom<User[]> = computed(users, list =>
    list.filter(user => user.isAdmin)
)
