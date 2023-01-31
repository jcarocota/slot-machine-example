import * as PIXI from 'pixi.js';
import { ColumnSlots, ColumnObject } from './ColumnSlots';
import { Globals } from './Globals';

export const App = (appWidth:number = 600, appHeight:number = 360) => {
    const app:PIXI.Application = new PIXI.Application({
        //view: (document.getElementById("pixi-canvas") as HTMLCanvasElement),
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        backgroundColor: 0x0d2331,
        width: appWidth,
        height: appHeight
    });
    
    document.body.appendChild(app.view as HTMLCanvasElement);

    const run = () => {

        const appContainer = new PIXI.Container();  
        appContainer.width = appWidth;
        appContainer.height = appHeight;      
        app.stage.addChild(appContainer);

        

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

        /*app.ticker.add((dt:number) => {

            if(Globals.spinning) {
                for(let column of Globals.colums) {    
                    column.moveSlots(Globals.spinSpeed);
                }
            }
            
        });*/

        appContainer.interactive = true;
        appContainer.on('pointerdown',(ev) => {
            if(Globals.spinning) {
                return;
            }

            Globals.spinning = true;
            let i = 0;
            let numColumnsSpinning = Globals.colums.length;
            for(let column of Globals.colums) {
                setTimeout(() => {
                    column.decelerateIndex = -0.1;
                    column.setColumnSpinning(true);
                    setTimeout(() => {
                        column.decelerateIndex = 0.6;
                    }, Globals.spinDurationInMillis/2);
                    setTimeout(() => {
                        column.setColumnSpinning(false);
                        numColumnsSpinning--;
                        Globals.spinning = numColumnsSpinning > 0;
                    }, Globals.spinDurationInMillis);
                }, i*Globals.timeBetweenSpinColumns);
                i++;
            }
        });

    }

    run();
    
}