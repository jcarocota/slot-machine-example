import * as PIXI from 'pixi.js';
import { LoaderConfig } from './LoaderConfig';
import { Slot, SlotObject } from './Slot';

export interface ColumnObject {
    colNum: number,
    container: PIXI.Container,
    slots: SlotObject[],
    moveSlots: (spinSpeed:number) => void

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

    for(let i:number = 0; i < numSlots+numSlotsOffset; i++) {
        const numFruit:number = Math.ceil(Math.random()*16);
        const tagSlot:string = 'fruit'+ numFruit;
        const url:string = LoaderConfig[tagSlot];
        const slot:SlotObject = Slot(url, spriteWidth, spriteHeight, tagSlot);

        container.addChild(slot.sprite);
        
        slot.sprite.x = spriteX;
        slot.sprite.y = spriteY+i*spriteHeight;

        slots.push(slot);
    }

    const moveSlots = async (spinSpeed:number) => {
        if(!spinSpeed) {
            return;
        }

        if(slots[0].sprite.y <= -60) {
            let slot:SlotObject = slots[0];
            slots.shift();
            slots.push(slot);
            slot.sprite.y = slots[slots.length-2].sprite.y + 120;
        }
        
        for(let slot of slots) {
            slot.sprite.y-=spinSpeed;
        }

    };

    const column:ColumnObject = {
        colNum: colNum,
        container: container,
        slots: slots,
        moveSlots: moveSlots 
    };

    return column;

}