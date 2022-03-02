

function readFile(){

    const fs = require('fs');
    return (fs.readFileSync('input','utf-8').toString().split("\n")).map(Number);

}

function countDeepIncreases(deepArray){
    let increases = 0;



    ((deepArray.slice(1,deepArray.length)).forEach(function(item,index) {
        if(item>deepArray[index]){
            increases++;
        }
        
    }));
    return increases;
}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/


function sumContigousElement(contigousElements, deepArray){
    let sumArray = new Array();
    let sumElement = 0;

    for (let index = 0; index< deepArray.length-contigousElements+1; index++){
        for(let nElement = 0; nElement<contigousElements; nElement++){
            sumElement = sumElement+deepArray[index+nElement];
        }
        sumArray.push(sumElement);
        sumElement = 0;
    }
    return sumArray
}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function firstPart(){
    var deepArray = readFile();
    var deepCount = countDeepIncreases(deepArray)
    console.log(deepCount)
}


function secondPart(){
    var deepArray = readFile();
    var deepSumsArray = sumContigousElement(3, deepArray) 
    var deepCount = countDeepIncreases(deepSumsArray)

    console.log(deepCount)
}
/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/


function main(){
    
    firstPart()
    secondPart()
}
main()

