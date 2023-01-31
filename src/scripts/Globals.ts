import * as PIXI from 'pixi.js'
import { ColumnObject } from './ColumnSlots'

interface GlobalsObject {
    colums: ColumnObject[],
    appWidth: number,
    appHeight: number,
    spinDurationInMillis:number,
    spinSpeed: number,
    numColumnsByMachine: number,
    numSlotsByColumn: number,
    spinning: boolean,
    timeBetweenSpinColumns: number
}

export const Globals: GlobalsObject = {
    colums: [],
    appWidth: 600,
    appHeight: 360,
    spinDurationInMillis: 2000,
    spinSpeed: 15,
    numColumnsByMachine : 5,
    numSlotsByColumn: 3,
    spinning: false,
    timeBetweenSpinColumns: 300
}