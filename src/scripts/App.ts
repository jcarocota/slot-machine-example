import * as PIXI from 'pixi.js';
import { ColumnSlots, ColumnObject } from './ColumnSlots';
import { Globals } from './Globals';

export const App = (appWidth:number = 600, appHeight:number = 360) => {
    const app:PIXI.Application = new PIXI.Application({
        //view: (document.getElementById("pixi-canvas") as HTMLCanvasElement),
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0x6495ed,
        width: appWidth,
        height: appHeight
    });
    
    document.body.appendChild(app.view as HTMLCanvasElement);

    const run = () => {

        const appContainer = new PIXI.Container();        
        app.stage.addChild(appContainer);

        appContainer.width = appWidth;
        appContainer.height = appHeight;

        appContainer.x = 0;
        appContainer.y = 0;

        for(let i:number = 0; i < Globals.numColumnsByMachine; i++) {
            const column:ColumnObject = ColumnSlots(
                Globals.numSlotsByColumn,
                appWidth/Globals.numColumnsByMachine,
                appHeight,
                i*appWidth/Globals.numColumnsByMachine,0,i);
            Globals.colums.push(column);
            appContainer.addChild(column.container);
        }

        let spinning:boolean = true;

        app.ticker.add((dt:number) => {

            if(spinning) {
                for(let column of Globals.colums) {    
                    column.moveSlots(Globals.spinSpeed);
                }
            }
            
        });

        setTimeout(() => {
            spinning = false;
        }, Globals.spinDurationInMillis);

    }

    run();
    
}