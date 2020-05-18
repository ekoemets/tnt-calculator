import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)
const precision = 6;

function calcTabel(read, veerud){
  var Xtabel = [];
  var Ytabel = [];
  var EXY = 0;

  for (let i = 0; i < read.length; i++){
    let tnt = 0;
    for (let j = 1; j < read[0].length; j++){
      tnt += read[i][j];
      EXY += read[i][j] * read[i][0] * veerud[j-1][0];
    }
    Xtabel.push([read[i][0],tnt]);
    //console.log(Xtabel);
  }

  for (let i = 0; i < veerud.length; i++){
    var tnt = 0;
    for (let j = 1; j < veerud[0].length; j++){
      tnt += veerud[i][j];
    }
    Ytabel.push([veerud[i][0],tnt]);
    //console.log(Ytabel)
  }

  var EX = 0;
  var EX2 = 0;
  for (let paar of Xtabel){
    //console.log(paar);
    EX += paar[0]*paar[1];
    EX2 += paar[0]**2 * paar[1];
  }
  var EY = 0;
  var EY2 = 0;
  for (let paar of Ytabel){
    EY += paar[0]*paar[1];
    EY2 += Math.pow(paar[0],2) * paar[1];
  }
  var DX = EX2 - Math.pow(EX,2);
  var DY = EY2 - Math.pow(EY,2);
  var COV = EXY - EX*EY;
  var sigmaX = Math.pow(DX,0.5);
  var sigmaY = Math.pow(DY,0.5);

  var soltumatud = "jah";
  for (let i=0; i<read.length; i++){
    for (let j=1; j<read.length; j++){
      if (read[i][j] !== Math.round(Xtabel[i][1] * Ytabel[j-1][1] * 100000)/100000){
        soltumatud = "ei";
        console.log(`${read[i][j]} ei võrdu ${Xtabel[i][1] * Ytabel[j-1][1]}, rida ${i}, veerg ${j}`);
        break;
      }
    }
    if (soltumatud === "ei"){
      break;
    }
  }

  return {EX:math.format(EX,precision),
    EX2:math.format(EX2,precision),
    EY:math.format(EY,precision),
    EY2:math.format(EY2,precision),
    DX:math.format(DX,precision),
    DY:math.format(DY,precision),
    EXY:math.format(EXY,precision),
    COV:math.format(COV,precision),
    sigma_X:math.format(sigmaX,precision),
    sigma_Y:math.format(sigmaY,precision),
    sõltumatud:soltumatud,
    korrelatsioonikordaja:math.format(COV/(sigmaX*sigmaY),precision)
  }
}
export default calcTabel;
/*
console.log(calcTabel([
        [1, 3/100, 15/100, 12/100],
        [2, 4/100, 20/100, 16/100],
        [3, 3/100, 15/100, 12/100]
        ],[
        [0, 3/100, 4/100, 3/100],
        [1, 15/100, 20/100, 15/100],
        [2, 12/100, 16/100, 12/100]
        ]))
        */