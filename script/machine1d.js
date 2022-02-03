let steps = 0;
function nextStep(){
    steps++;
}
function previousStep(){
    steps--;
}

class turingMachine{
    constructor(tape,ruleset){
        this.index=0;
        this.ruleset=ruleset;
        this.tape=tape;
        this.state=0;
        this.step=0;
    }

    next(n=1){
        for(let s = 0; s<n; s++){
            const tapevalue = this.tape[this.index] || 0;
            for(let k of this.ruleset){
                console.log(k);
                if(k.read===tapevalue && k.state===this.state){
                    this.tape[this.index]=k.write;
                    this.index+=k.move;
                    this.state=k.gostate;
                    break;
                }
            }
            this.step++;
        }
    }
}

class rule{
    constructor(read,state,write,move,gostate){
        this.read=read;
        this.state=state;
        this.write=write;
        this.move=move;
        this.gostate=gostate;
    }
}