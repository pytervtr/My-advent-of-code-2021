class Command{

    constructor(instruction, units){
        this.instruction=instruction;
        this.units=units
    }
}



function readFile(){

    const fs = require('fs');
    return fs.readFileSync('input','utf-8').toString().split("\n");

}

function parseInputCommands(inputCommands){

    let commandsArray = []

    for(let command of inputCommands){
        let tmp_command = command.split(" ")
        commandsArray.push(new Command(tmp_command[0], parseInt(tmp_command[1])))
    }

    return commandsArray
}

function getInputCommands(){
    let inputCommands = readFile()
    let commandsArray = parseInputCommands(inputCommands)

    return commandsArray

}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function calculateDepth(commandsArray){
    let horizontal_coord=0
    let vertical_coord=0

    for(let command of commandsArray){
        if(command.instruction === "up"){
            vertical_coord = vertical_coord - command.units
        }
        else if(command.instruction === "down"){
            vertical_coord = vertical_coord + command.units
        }
        else if(command.instruction === "forward"){
            horizontal_coord = horizontal_coord +command.units

        }
    }

    return [horizontal_coord,vertical_coord]
}

function firstPart(){

    var commandsArray = getInputCommands()

    var depthCoordinates = calculateDepth(commandsArray)

    console.log(depthCoordinates[0]*depthCoordinates[1])

}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function calculateDepthWithAim(commandsArray){
    let horizontal_coord=0
    let vertical_coord=0
    let aim = 0

    for(let command of commandsArray){
        if(command.instruction === "up"){
           aim = aim - command.units
        }
        else if(command.instruction === "down"){
            aim = aim + command.units
        }
        else if(command.instruction === "forward"){
            horizontal_coord = horizontal_coord + command.units
            vertical_coord = vertical_coord + (aim * command.units)

        }
    }

    return [horizontal_coord,vertical_coord]
}

function secondPart(){

    var commandsArray = getInputCommands()

    var depthCoordinates = calculateDepthWithAim(commandsArray)

    console.log(depthCoordinates[0]*depthCoordinates[1])


}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function main(){

    firstPart();
    secondPart();
}

main()