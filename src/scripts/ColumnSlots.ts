import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { LoaderConfig } from './LoaderConfig';
import { Slot, SlotObject } from './Slot';

export interface ColumnObject {
    colNum: number,
    container: PIXI.Container,
    slots: SlotObject[],
    setColumnSpinning: (spinning:boolean) => void
    intervalSpinning: NodeJS.Timer,
    decelerateIndex:number

}

export const ColumnSlots = (
    numSlots:number, columnWidth:number, columnHeight:number, 
    x:number, y:number, colNum:number):ColumnObject => {
    const container:PIXI.Container = new PIXI.Container();
    container.width = columnWidth;
    container.height = columnHeight;
    container.x = x;
    container.y = y;

    const numSlotsOffset:number = 2;
    
    const spriteWidth:number = columnWidth;
    const spriteHeight:number = columnHeight/numSlots;
    const spriteX:number = spriteWidth /2;
    const spriteY:number = (spriteHeight /2) - (spriteHeight*(numSlotsOffset/2));

    const slots:SlotObject[] = [];

    const decelerateIndex: number = 0;

    const getTagSlot = () => {
        const numFruit:number = Math.ceil(Math.random()*16);
        const tagSlot:string = 'fruit'+ numFruit;

        return tagSlot
    };

    for(let i:number = 0; i < numSlots+numSlotsOffset; i++) {

        const tagSlot:string = getTagSlot();
        const url:string = LoaderConfig[tagSlot];
        const slot:SlotObject = Slot(url, spriteWidth, spriteHeight, tagSlot);

        container.addChild(slot.sprite);
        
        slot.sprite.x = spriteX;
        slot.sprite.y = spriteY+i*spriteHeight;

        slots.push(slot);
    }

    let intervalSpinning:NodeJS.Timer = null;

    const turnOnColumnSpinning = () => {
        const delay = 10;

        let spinSpeed:number = Globals.spinSpeed;
        const intervalSpinning = setInterval(() => {
            
            if(slots[0].sprite.y <= -1.5*spriteHeight/2) {
                let slot:SlotObject = slots[0];
                slots.shift();
                slots.push(slot);
                const tagSlot:string = getTagSlot();
                const url:string = LoaderConfig[tagSlot];
                slot.sprite.texture = PIXI.Texture.from(url);
                slot.tag = tagSlot;
                slot.sprite.y = slots[slots.length-2].sprite.y + spriteHeight;
            }
            
            for(let slot of slots) {
                slot.sprite.y-=spinSpeed;
            }
            spinSpeed-=column.decelerateIndex;
            console.log(decelerateIndex);
        }, delay);

        return intervalSpinning;
    };

    const turnOffColumnSpinning = (intervalSpinning:NodeJS.Timer) => {
        clearInterval(intervalSpinning);
        slots.forEach((slot, i) => {
            slot.sprite.y = spriteY+((i+1)*spriteHeight);
        });
    };

    const setColumnSpinning = (spinning:boolean) => {
        if(Globals.spinSpeed && spinning) {
            intervalSpinning = turnOnColumnSpinning();
        } else if(intervalSpinning) {
            turnOffColumnSpinning(intervalSpinning);
        }
    }

    const column:ColumnObject = {
        colNum: colNum,
        container: container,
        slots: slots,
        setColumnSpinning: setColumnSpinning,
        intervalSpinning: intervalSpinning,
        decelerateIndex: decelerateIndex 
    };

    return column;

}