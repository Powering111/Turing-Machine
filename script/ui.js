const display = document.getElementById('display');
const ctx = display.getContext('2d');

const tape = [];
const ruleset=[];

const machine = new turingMachine(tape,ruleset);

function updateScale(){
    ctx.canvas.width=ctx.canvas.clientWidth*window.devicePixelRatio;
    ctx.canvas.height=ctx.canvas.clientHeight*window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

let view={
    offset:0,
}
let style={
    linewidth:2,
    boxwidth:70,
    boxheight:70,
    boxmargin:10
}
function update(){
    updateScale();
    console.log(`offset : ${view.offset}, ${typeof(view.offset)}`)
    ctx.clearRect(0,0,ctx.width,ctx.height);
    
    ctx.strokeStyle="black";
    ctx.lineWidth=style.linewidth;
    
    const displayIndex=Math.floor(view.offset);
    const offsetPixels = -(view.offset-displayIndex)*(style.boxwidth+style.boxmargin);
    const displayCount = Math.ceil(ctx.canvas.width/(style.boxwidth+style.boxmargin));

    for(let i=0;i<displayCount;i++){
        // fill if machine is here
        if(machine.index==i+displayIndex){
            ctx.fillStyle='yellow';
            ctx.fillRect(
                style.boxmargin*(i+1)+style.boxwidth*i+offsetPixels,
                style.boxmargin,
                style.boxwidth,
                style.boxheight
            )
        }
        // draw box
        ctx.strokeRect(
            style.boxmargin*(i+1)+style.boxwidth*i+offsetPixels,
            style.boxmargin,
            style.boxwidth,
            style.boxheight
        );
        // display value
        ctx.font="30px Nanum Gothic";
        ctx.fillStyle="red";
        let textString='0';
        if(tape[i+displayIndex]){
            textString = String(tape[i+displayIndex])
        }
        ctx.textBaseline = 'middle';
        ctx.fillText(
            textString,
            style.boxmargin*(i+1)+style.boxwidth*(i+0.5)-ctx.measureText(textString).width/2+offsetPixels,
            style.boxmargin+style.boxheight/2
        );
        
        // display index
        ctx.font="10px Nanum Gothic";
        ctx.fillStyle="black";
        textString = String(i+displayIndex)
        ctx.textBaseline = 'top';
        ctx.fillText(
            textString,
            style.boxmargin*(i+1)+style.boxwidth*(i+0.5)-ctx.measureText(textString).width/2+offsetPixels,
            style.boxmargin+style.boxheight
        );
    }

    // machine pointer
    if(machine.index>=displayIndex&&machine.index<displayIndex+displayCount){
        const pointerX=(style.boxmargin+style.boxwidth)*(machine.index-displayIndex)+style.boxmargin+style.boxwidth/2+offsetPixels;
        ctx.fillStyle='black';
        const pointer = new Path2D();
        pointer.moveTo(pointerX,style.boxmargin+style.boxheight+10);
        pointer.lineTo(pointerX-10,style.boxmargin+style.boxheight+20);
        pointer.lineTo(pointerX+10,style.boxmargin+style.boxheight+20);

        ctx.fill(pointer);

    }
}



function nextStep(){
    machine.next();
    update();
}
function resetStep(){
    console.log('reset step not implemented!');
    update();
}


const rulesetElem = document.getElementById('ruleset');
let selectedRule;



function addRule(e){
    ruleset.push(new rule(0,0,0,1));

    const ruleElem = document.createElement('li');
    ruleElem.classList.add('rule');
    for(let i=0;i<5;i++){
        const attributeElem = document.createElement('input');
        attributeElem.value=0;
        ruleElem.appendChild(attributeElem);
    }
    ruleElem.addEventListener('change',ruleChanged);
    rulesetElem.appendChild(ruleElem);
}

function deleteRule(e){
    
    if(selectedRule){
        const deleteIndex = [...selectedRule.parentNode.children].indexOf(selectedRule);
        ruleset.splice(deleteIndex,1);
        selectedRule.remove();
    }
}

function ruleClicked(e){
    if(e.target.id!=='ruleset'){
        if(e.target.classList.contains('rule')){
            if(selectedRule){
                selectedRule.classList.remove('selected');
            }
            selectedRule=e.target;
            e.target.classList.add('selected');
            
        }
        else{
            if(selectedRule){
                selectedRule.classList.remove('selected');
            }
            selectedRule=e.target.parentElement;
            e.target.parentElement.classList.add('selected');
            
            e.target.select();
        }
    }else{
        selectedRule=null;
    }
}

function ruleChanged(e){
    const type=['read','state','write','move','gostate'];
    const changeIndex=[...e.target.parentNode.parentNode.children].indexOf(e.target.parentNode);
    for(let idx=0;idx<5;idx++){
        ruleset[changeIndex][type[idx]]=Number(e.target.parentNode.children[idx].value);
    }
}

function clearRule(e){
    ruleset.splice(0,ruleset.length);
    while(rulesetElem.lastElementChild){
        rulesetElem.removeChild(rulesetElem.lastElementChild);
    }
}

update();