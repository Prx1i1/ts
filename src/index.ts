import { isNonNullChain } from "../node_modules/typescript/lib/typescript";
import CanvasCollection from "./CanvasCollection";

let advancedSelection : boolean = false

let image = new Image();
let imgageSliceData: DOMTokenList | string[];

let operativeStart: DOMTokenList | string[];
let operativeEnd: DOMTokenList | string[];

let operativeFieldsContents: number[][] = []

let globalCollectionCanvas: CanvasCollection;

let editsList : number[][][][] = [];
let editIndice: number = -1; //theoretically its clean

image.src = "./sprites.png"

window.onload = () => {
    loader();
    init(32, 20); //size of second page
    initCanvas(32, 20);
}

function loader(){
    console.log("load");
    let baseCanvas = document.getElementById("baseImage")
    if (baseCanvas != null){
        baseCanvas.style.backgroundImage = "url(" + image.src + ")";
        // baseCanvas.style.width = image.width/2 + "px";
        // baseCanvas.style.height = image.height/2 + "px";
        baseCanvas.style.backgroundSize = "cover";
        baseCanvas.style.backgroundRepeat = "round"; //enough for styles

    }
}

function init(x: number, y: number){
    let collection: CanvasCollection = new CanvasCollection(x, y, true); //two dimensional array entity
    console.log("init")
    let canvasPage: HTMLElement = document.getElementById("canvasGallery")
    collection.array.map((e,i) => {
        e.map((f) => {
            f.addEventListener("click", function(this){
                console.log(this.classList) //single digit for same coord
                let res;
                if(this.classList.length == 1){
                    res = [this.classList[0], this.classList[0]]
                }else{
                    res = this.classList
                }
                imgageSliceData = res; //set image properties
                console.log("set image of cords:", imgageSliceData)
                // changeBackgroundDrag(globalCollectionCanvas) //canvas changed to work
                commitChangingBackground();
 
            })
            canvasPage.appendChild(f)
        })
        
    })

}

function searchOperative(x: number, y: number) : number{
    let temp = null
    operativeFieldsContents.map((a, i) => {
        if(a[0] == x && a[1] == y){
            console.log(a[0], x, a[1], y)
            console.log("found intersect", i)
            temp = i
            
        }
    })
    return temp
}

function numberCheck(a : number, b: number){
    if (Number(a) >= Number(b)){
        return true
    }else{
        return false
    }
}

function checkCanvasArea(cords: number[] , operativeOne: number[], operativeTwo: number[], advancedSelection: boolean): boolean{
    //x
    let xChecked: boolean = false;
    let yChecked: boolean = false;

    if(numberCheck(operativeTwo[0], operativeOne[0])){
        if(numberCheck(cords[0], operativeOne[0]) && numberCheck(operativeTwo[0], cords[0]) ){
            xChecked = true
        }
    }else{
        if(numberCheck(operativeOne[0], cords[0]) && numberCheck(cords[0], operativeTwo[0])){
            xChecked = true
        }
    }

    //y
    if(numberCheck(operativeTwo[1], operativeOne[1])){
        if(numberCheck(cords[1], operativeOne[1]) && numberCheck(operativeTwo[1], cords[1])){
            yChecked = true
        }
    }else{
        if(numberCheck(operativeOne[1], cords[1]) && numberCheck(cords[1], operativeTwo[1])){
            yChecked = true
        }
    }
    
    if(xChecked && yChecked){
        // console.log("Dev debug")
        // console.log(operativeOne, cords, operativeTwo)

        //fields list
        //if not advanced selection
        if(!advancedSelection){
        operativeFieldsContents.push([cords[0], cords[1]])


            globalCollectionCanvas.rawArray.map((e) => {
                e.map((c) => {
                    let list = c.element.classList as unknown as number[]
                    if(list.length == 1){
                        list = [list[0], list[0]]
                    }
                    let values = [cords[0], cords[1]]
                    if(list[0] == values[0] && list[1] == values[1]){
                        c.backgroundFlare()
                    }
                })
            })


        }else{
            let res = searchOperative(cords[0], cords[1])//why is null there
            console.log("result", res)
            if(res !== null){
                console.log("amogius")
                let key = Number(res)
                console.log(operativeFieldsContents[key])
                operativeFieldsContents.splice(key, 1)
                globalCollectionCanvas.rawArray.map((e) => {
                    e.map((c) => {
                        let list = c.element.classList as unknown as number[]
                        if(list.length == 1){
                            list = [list[0], list[0]]
                        }
                        let values = [cords[0], cords[1]]
                        if(list[0] == values[0] && list[1] == values[1]){
                            c.setBaseLook()
                        }
                    })
                })
            }else{
                console.log("adding")
                operativeFieldsContents.push([cords[0], cords[1]])
                globalCollectionCanvas.rawArray.map((e) => {
                    e.map((c) => {
                        let list = c.element.classList as unknown as number[]
                        if(list.length == 1){
                            list = [list[0], list[0]]
                        }
                        let values = [cords[0], cords[1]]
                        if(list[0] == values[0] && list[1] == values[1]){
                            c.backgroundFlare()
                        }
                    })
                })
            }
        }
       // console.log(operativeFieldsContents)
        
        return true;

    }else{
        return false;
    }

}

function undoPrototype(x: number | 32, y: number | 20, isRedo: boolean){
    console.log("edits", editsList)
    
    //remake the whole canvas

    let collection: CanvasCollection = new CanvasCollection(x, y, false);

    if(isRedo){
        editIndice += 2
    }

    globalCollectionCanvas = collection
    let secondCanvasPage = document.getElementById("canvasCollections");
    secondCanvasPage.innerHTML = "";
    collection.rawArray.map((e, i) => {
        e.map((canvas, j) => {
            canvas.setBaseLook();


            let lastEdit : number[][][] = editsList[editIndice];

            console.log("REDO CHECK", editsList.length, editIndice)

            // console.log(lastEdit)
            try{
                if(lastEdit[i][j].length === 0){
                    canvas.setBaseLook()
                }else{
                    canvas.setBackground([String(lastEdit[i][j][0]), String(lastEdit[i][j][1])])
                }
            }catch{
                lastEdit = editsList[editsList.length - 1];
                if(editsList.length == 0){
                    editIndice --; //reset
                }else{
                console.log("ER", lastEdit)
                if(lastEdit[i][j].length === 0){
                    canvas.setBaseLook()
                }else{
                    canvas.setBackground([String(lastEdit[i][j][0]), String(lastEdit[i][j][1])])
                }}

            }
            secondCanvasPage.appendChild(canvas.element);

            canvas.element.addEventListener('mousedown', (ev) => {
                //starting to drag dn
                console.log("dragging")
                operativeStart = canvas.element.classList
                if (canvas.element.classList.length == 1){
                    operativeStart = [canvas.element.classList[0], canvas.element.classList[0]]
                }
            })

            canvas.element.addEventListener("mouseup", (ev) => {
                console.log("release")
                operativeEnd = canvas.element.classList
                if (canvas.element.classList.length == 1){
                    operativeEnd = [canvas.element.classList[0], canvas.element.classList[0]]
                }
                //trigger of function
                changeBackgroundDrag(collection) // changing dragged field
            })

            canvas.element.addEventListener('click', (ev) => {
                canvas.setBackground(imgageSliceData);
            })

          
        })
    })

    //clean array of editList
    editIndice--;




}



function commitChangingBackground(){
    console.log("COMMITING")

    console.log(operativeFieldsContents)

    editIndice += 1; //number last before current

    editsList.splice(editIndice + 1)


    //popup
    document.getElementById("undoList").innerHTML = "Moves to undo: " +  (editsList.length - 1)

    globalCollectionCanvas.rawArray.map((r) => {
        r.map((c) => {
            operativeFieldsContents.map((cords) => {
                let classList : DOMTokenList | number[] = c.element.classList
                if (classList.length == 1){
                    classList = [Number(classList[0]), Number(classList[0])]
                }else{
                    classList = [Number(classList[0]), Number(classList[1])]
                }
                //console.log("COMMIT BG CHANGE stgr")
                if(cords[0] == classList[0] && cords[1] == classList[1]){
                    //console.log("COMMIT BG CHANGE")
                    c.setBackground(imgageSliceData)
                }
            })
            
        })
    })
    operativeFieldsContents = []


     //save move
     let arrayEdits : number[][][] = []
     globalCollectionCanvas.rawArray.map((row) => {
         let temp: number[][] = []
         row.map((element) => {
             temp.push(element.bgimage)
         })
         arrayEdits.push(temp)
     })
 
     editsList.push(arrayEdits)
 
     console.log(arrayEdits)
}

function changeBackgroundDrag(coll: CanvasCollection){
    coll.rawArray.map((e) => {
        e.map((q) => {
            let cords = q.element.classList as unknown as number[]
            let operativeOne = operativeStart as unknown as number[]
            let operativeTwo = operativeEnd as unknown as number[]


            //check length
            if(cords.length == 1){
                cords = [cords[0], cords[0]]
            }

            if(!advancedSelection){
                //operativeFieldsContents = []
            }
            checkCanvasArea(cords as number[], operativeOne as number[], operativeTwo as number[], advancedSelection)


        })
    })
    return "Finished";
}

function initCanvas(x: number, y: number){
    let collection: CanvasCollection = new CanvasCollection(x, y, false);

    let undoDivButton = document.getElementById("undoListButton")
    undoDivButton.addEventListener('click', (e) => {
        undoPrototype(32, 20, false)
    })

    
    var map: any = {}; // You could also use an array
    onkeydown = onkeyup = function(e){
 
        map[e.keyCode] = e.type == 'keydown';
        /* insert conditional here */
        console.log(map)
        if(map[17] & map[90]){
            console.log("CTRL")
                console.log("Z")
                undoPrototype(32, 20, false)
        }
        if(map[17] & map[89]){
            console.log("CTRL")
                console.log("Y")
                undoPrototype(32, 20, true)
        }
    }

    document.addEventListener('keydown', (key) => {
        //console.log(key)
        if([224, 17].includes(Number(key.keyCode))){
            //doznaczanie/odznaczanie
            advancedSelection = true
        }
    })

    document.addEventListener("keydown", (key) => {
        if(key.keyCode == 46){

            operativeFieldsContents = []
            globalCollectionCanvas.rawArray.map((c) => {
                c.map((e) => {
                    if(e.isSelected){
                        e.setBaseLook()
                    }
                })
            })
        }
    })

    document.addEventListener("keyup", (key) => {
        if([224, 17].includes(key.keyCode)){
            //doznaczanie/odznaczanie
            advancedSelection = false
            console.log("ended selection mode")
        }
    })


    globalCollectionCanvas = collection
    let secondCanvasPage = document.getElementById("canvasCollections");
    collection.rawArray.map((e, i) => {
        e.map((canvas, j) => {
            canvas.setBaseLook();
            secondCanvasPage.appendChild(canvas.element);

            canvas.element.addEventListener('mousedown', (ev) => {
                //starting to drag dn
                console.log("dragging")
                operativeStart = canvas.element.classList
                if (canvas.element.classList.length == 1){
                    operativeStart = [canvas.element.classList[0], canvas.element.classList[0]]
                }
            })

            canvas.element.addEventListener("mouseup", (ev) => {
                console.log("release")
                operativeEnd = canvas.element.classList
                if (canvas.element.classList.length == 1){
                    operativeEnd = [canvas.element.classList[0], canvas.element.classList[0]]
                }
                //trigger of function
                changeBackgroundDrag(collection) // changing dragged field
            })

            canvas.element.addEventListener('click', (ev) => {
                canvas.setBackground(imgageSliceData);
            })

          
        })
    })

    let arrayEdits : number[][][] = []
    globalCollectionCanvas.rawArray.map((row) => {
        let temp: number[][] = []
        row.map((element) => {
            temp.push([])
        })
        arrayEdits.push(temp)
    })

    editsList.push(arrayEdits)

}
