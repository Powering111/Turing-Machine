let steps = 0;
function nextStep(){
    steps++;
}
function previousStep(){
    steps--;
}

class turingMachine{
    constructor(tape){
        this.index=0;
        this.ruleset=new Array();
        this.tape=tape;
        this.state=0;
    }

    updateRule(ruleset){
        this.ruleset=ruleset;
    }

    next(n=1){
        for(let s = 0; s<n; s++){
            const tapevalue = this.tape[this.index];
            for(let k of this.ruleset){
                if(k.read===tapevalue && k.state===this.state){
                    tapevalue=k.write;
                    this.index+=this.move;
                    break;
                }
            }
        }
    }
}

class rule{
    constructor(read,state,write,move){
        this.read=read;
        this.state=state;
        this.write=write;
        this.move=move;
    }
}