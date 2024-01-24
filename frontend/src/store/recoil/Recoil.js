import { atom, selector } from "recoil";

export const token = atom({
    key: 'tokenAtom',
    default: Window.localStorage.getItems('token')
})