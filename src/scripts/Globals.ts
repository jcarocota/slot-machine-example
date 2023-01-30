import * as PIXI from 'pixi.js'
import { ColumnObject } from './ColumnSlots'

interface GlobalsObject {
    colums: ColumnObject[],
    spinDurationInMillis:number,
    spinSpeed: number,
    numColumnsByMachine: number,
    numSlotsByColumn: number
}

export const Globals: GlobalsObject = {
    colums: [],
    spinDurationInMillis: 3500,
    spinSpeed: 20,
    numColumnsByMachine : 5,
    numSlotsByColumn: 3
}