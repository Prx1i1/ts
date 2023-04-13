import Canvas from "./canvas"

class CanvasCollection{

    array: HTMLElement[][] = [];
    rawArray: Canvas[][] = [];
    image: HTMLImageElement;

    constructor(x: number, y:number, isTemplate: boolean){
        
        let image = new Image();
        image.src = "./sprites.png"
        this.image = image
        console.log("Image:", this.image)

        if(isTemplate){

        for(let i = 0; i < y; i++){
            let rawRow: Canvas[] = [];
            let row: HTMLElement[] = [];
            for(let j = 0; j < x/2; j++){
                rawRow.push(this.generateCanvas(j, i, x, y))
                row.push(this.generateInsideCanvas(x, y, j, i))
            }
            this.rawArray.push(rawRow)
            this.array.push(row)
        }
        for(let i = 0; i < y; i++){
            let row: HTMLElement[] = []
            let rawRow: Canvas[] = [];
            for(let j = x/2; j < x; j++){
                rawRow.push(this.generateCanvas(j, i, x, y))
                row.push(this.generateInsideCanvas(x, y, j, i))
            }
            this.array.push(row)
            this.rawArray.push(rawRow)
        }
    }else{

        for(let i = 0; i < y; i++){
            let rawRow: Canvas[] = [];
            let row: HTMLElement[] = [];
            for(let j = 0; j < x/2; j++){
                rawRow.push(this.generateCanvas(j, i, x, y))
                row.push(this.generateInsideCanvas(x, y, j, i))
            }
            this.rawArray.push(rawRow)
            this.array.push(row)
        }
        for(let i = 0; i < y; i++){
            let row: HTMLElement[] = []
            let rawRow: Canvas[] = [];
            for(let j = x/2; j < x; j++){
                rawRow.push(this.generateCanvas(j - 16, i + y, x, y))
                row.push(this.generateInsideCanvas(x, y, j - 16, i + y))
            }
            this.array.push(row)
            this.rawArray.push(rawRow)
        }
        
    }
        
    }

    private generateCanvas(x: number, y: number, totalx: number, totaly : number): Canvas{
        return new Canvas(x, y, totalx, totaly);
    }

    private generateInsideCanvas(totalx: number, totaly: number,x: number, y: number): HTMLElement{
        let canvas: Canvas = new Canvas(x, y, totalx, totaly);
        let finishedCanvas: HTMLElement = canvas.backgroundCanvasGenerator(this.image ,canvas.element, x, y)
        return finishedCanvas;
    }

}


export default CanvasCollection;