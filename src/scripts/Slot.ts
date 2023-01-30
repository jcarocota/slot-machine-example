import * as PIXI from 'pixi.js';

export interface SlotObject {
    tag: string,
    sprite: PIXI.Sprite
}

export const Slot = (urlSprite:string, spriteWidth:number, spriteHeight:number, tag:string): SlotObject => {
    const sprite:PIXI.Sprite = PIXI.Sprite.from(urlSprite);

    sprite.width = spriteWidth;
    sprite.height = spriteHeight;
    sprite.anchor.set(0.5);

    const slot:SlotObject = {
        tag: tag,
        sprite: sprite
    }
    
    return slot;
}