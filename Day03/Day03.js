function readFile(){

    const fs = require('fs');
    return fs.readFileSync('input','utf-8').toString().split("\n");

}


function transposeCodeReport(diagnostic_report, col){
    let code_report_transpose = Array(diagnostic_report.length).fill('')

    for(let row=0; row<diagnostic_report.length; row++){
        
        code_report_transpose[row] = diagnostic_report[row][col]
    }
    return code_report_transpose
}


function getMoreAndLessSignificantBit(code_report){
    let tmp_0 = (code_report.join("")).split("0").length-1
    let tmp_1 = (code_report.join("")).split("1").length-1
    let significantBits = []
    if(tmp_0<=tmp_1){
        significantBits = ["1","0"]
    }
    else if(tmp_0>tmp_1){
        significantBits = ["0","1"]
    }
    return significantBits
}

function binaryToDecimal(binary_number){
    let decimal_number = 0

    for(let char_index = 0; char_index<binary_number.length; char_index++){
        let exponent = (2**(binary_number.length-1-char_index))
        decimal_number = decimal_number + (exponent*binary_number[char_index])
    }
    return decimal_number
}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function transposeDiagnosticReport(diagnostic_report){
    let diagnostic_report_transpose = []

    for(let col=0;col<diagnostic_report[0].length; col++){
      diagnostic_report_transpose[col] = transposeCodeReport(diagnostic_report, col)
    }

    return diagnostic_report_transpose
}



function getPowerConsumptionValues(diagnostic_report_transpose){
    let digit_more_used=""
    let digit_less_used=""

    for(let code_report_ind=0; code_report_ind<diagnostic_report_transpose.length; code_report_ind++){
        let significantBits = getMoreAndLessSignificantBit(diagnostic_report_transpose[code_report_ind])

        digit_more_used=digit_more_used + significantBits[0]
        digit_less_used=digit_less_used + significantBits[1]
    
    }
    return [binaryToDecimal(digit_more_used), binaryToDecimal(digit_less_used)]
}



function firstPart(){
    let diagnostic_report = readFile()
    let diagnostic_report_transpose = transposeDiagnosticReport(diagnostic_report)
    let power_consumption_values = getPowerConsumptionValues(diagnostic_report_transpose)
    console.log(power_consumption_values[0]*power_consumption_values[1]) 

}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/

function getDeprecatedIndexes(code_report_transpose, significant_bit){
    let remove_indexes=[]

    for(let char_command_index=0; char_command_index<code_report_transpose.length; char_command_index++){
        if(code_report_transpose[char_command_index] === significant_bit){
            remove_indexes[remove_indexes.length]=char_command_index
        }
    }
    return remove_indexes
}

function getLifeSupportRatingVariable(diagnostic_report, code_variable){
    for(let code_report_ind=0; code_report_ind<diagnostic_report[0]?.length; code_report_ind++){
        
        if(diagnostic_report.length==1){break}

        let code_report_transpose = transposeCodeReport(diagnostic_report, code_report_ind)
        let significant_bits = getMoreAndLessSignificantBit(code_report_transpose)
        let deprecated_indexes = getDeprecatedIndexes(code_report_transpose,significant_bits[code_variable])

        for(let index_deprecated=0; index_deprecated<deprecated_indexes.length; index_deprecated++){
            diagnostic_report.splice(deprecated_indexes[index_deprecated]-index_deprecated,1)
        }     
    }
    return binaryToDecimal(diagnostic_report[0])
}

function secondPart(){
    let diagnostic_report = readFile()
    let life_support_values = [getLifeSupportRatingVariable(diagnostic_report.slice(),0),
                                getLifeSupportRatingVariable(diagnostic_report.slice(),1)]
    console.log(life_support_values[0]*life_support_values[1])

}

/**************************************************************************************/
/**************************************************************************************/
/**************************************************************************************/


function main(){
    firstPart()
    secondPart()
}

main()