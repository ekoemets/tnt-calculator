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
  var DX = Math.round(EX2 - Math.pow(EX,2)*10**6)/10**6;
  var DY = Math.round(EY2 - Math.pow(EY,2)*10**6)/10**6;
  var COV = EXY - EX*EY;
  var sigmaX = Math.pow(DX,0.5);
  var sigmaY = Math.pow(DY,0.5);

  var soltumatud = true;
  for (let i=0; i<read.length; i++){
    for (let j=1; j<read.length; j++){
      if (read[i][j] !== Math.round(Xtabel[i][1] * Ytabel[j-1][1] * 100000)/100000){
        soltumatud = false;
        console.log(`${read[i][j]} ei võrdu ${Xtabel[i][1] * Ytabel[j-1][1]}, rida ${i}, veerg ${j}`);
        break;
      }
    }
    if (!soltumatud){
      break;
    }
  }

  return {EX:EX, EX2:EX2, EY:EY, EY2:EY2, DX:DX, DY:DY, EXY:EXY, COV: COV, sigmaX:sigmaX, sigmaY:sigmaY, soltumatud:soltumatud, korrelatsioonikordaja:COV/(sigmaX*sigmaY)}
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
/*
for (element in calcTabel([
        [1, 3/100, 15/100, 12/100],
        [2, 4/100, 20/100, 16/100],
        [3, 3/100, 15/100, 12/100]
        ],[
        [0, 3/100, 4/100, 3/100],
        [1, 15/100, 20/100, 15/100],
        [2, 12/100, 16/100, 12/100]
        ])){
          console.log(element)
        }
*/