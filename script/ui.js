const display = document.getElementById('display');
const context = display.getContext('2d');

const tape = [];
const machine = new turingMachine(tape);
function nextStep(){

}
function previousStep(){
    console.log('previous step not implemented yet!');
}


const rulesetElem = document.getElementById('ruleset');
const ruleset=[];
let selectedRule;
function addRule(e){
    const idx = ruleset.push(new rule(0,0,0,1));

    const ruleElem = document.createElement('li');
    ruleElem.classList.add('rule');
    ruleElem.dataset.index=idx;
    for(let i=0;i<4;i++){
        const attributeElem = document.createElement('div');
        attributeElem.innerText='0';
        ruleElem.appendChild(attributeElem);
    }
    rulesetElem.appendChild(ruleElem);
    console.log(ruleset);
    machine.updateRule();
}
function deleteRule(e){
    
    if(selectedRule){
        //TODO (selectedRule.dataset.index);
    }
    machine.updateRule(ruleset);
}
function ruleClicked(e){
    if(e.target.id!=='ruleset'){
        console.log(e.target);
        if(e.target.classList.contains('rule')){
            if(selectedRule){
                
            }
            selectedRule=e.target;
            e.target.classList.add('selected');
            
        }
    }else{
        selectedRule=null;
    }
}

function updateRuleUI(){

}