class Canvas {
    backgroundimage: typeof Image;
    isSelected: boolean = false;
    element: HTMLElement;
    x : number;
    y : number;

    bgimage : number[] = [];

    constructor(x : number, y : number, totalx : number, totaly : number){

        this.x = x;
        this.y = y;

        this.element = document.createElement("canvas");
       //(totaly*2)
        this.element.style.width =  "calc(" + (100 / (totalx/2)) + "%"  + " - 1px" + ")"; //x + y rebalance to fit longer
        this.element.style.height = "calc(" + (100 / (totaly*2)) + "%"  + " - 1px" + ")"
        this.element.style.margin = "0px";
        this.element.classList.add(x.toString())
        this.element.classList.add(y.toString())

    }

    public getImageCoordinates(){
        return [this.x, this.y];
    }

    public setBaseLook(){
        this.element.addEventListener("contextmenu", function(event){
            event.preventDefault()
        })
        this.element.style.borderColor = "grey";
        this.element.style.borderWidth = "1px";
        this.element.style.margin = "-1px";
        this.element.style.borderStyle = "solid"
        this.element.style.backgroundColor = "black";
        this.isSelected = false;
    }

    public setBackground(tokens : DOMTokenList | string[]){
        this.bgimage = []
        this.bgimage.push(Number(tokens[0]), Number(tokens[1]))
        let backgroundimage = new Image();
        backgroundimage.src = "./sprites.png"
        let canvasElement = this.element as HTMLCanvasElement
        let ctx = canvasElement.getContext("2d")
        ctx.drawImage(backgroundimage, tokens[0] as unknown as number *48 , tokens[1] as unknown as number *48 , 49, 49, 0, 0, 350, 150)
        this.element = canvasElement;
        this.isSelected = false;
    }

    public backgroundFlare(){
        this.isSelected = true
        this.element.style.backgroundColor = "lime";
        this.element.style.border = "1px solid green"
    }

    public backgroundCanvasGenerator(image: any, canvas: HTMLElement, x: number, y: number): HTMLElement{
        let backgroundimage = new Image();
        backgroundimage.src = "./sprites.png"
        console.log("Working on canvas at pos:", x, y)
        let canvasElement = canvas as HTMLCanvasElement
        let ctx = canvasElement.getContext("2d")
        //rawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        ctx.drawImage(backgroundimage, x*48 , y*48 , 49, 49, 0, 0, 350, 150)
        return canvasElement;
    }
}

export default Canvas