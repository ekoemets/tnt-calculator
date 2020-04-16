read = [
        [1, 20/100, 15/100, 15/100], # kirjuta siia enda tabeli read, alustades sellest reast kus on esimene X väärtus
        [2, 20/100, 15/100, 15/100],  # ehk ignoreeri kõige esimest kus on see üks lahter "X \ Y"
        #[3, 3/100, 15/100, 12/100]
        ]
veerud = [
        [0, 20/100, 20/100], # kirjuta siia enda tabeli veerud, alustades sellest veerust, kus on esimene Y väärtus
        [1, 15/100, 15/100],  # ehk ignoreeri kõige esimest kus on see üks lahter "X \ Y"
        [2, 15/100, 15/100]
        ]

# siit edasi pole rohkem midagi täita vaja

Xtabel = []
Ytabel = []
EXY = 0

for i in range(len(read)):
    tnt = 0
    for j in range(1,len(read[0])):
        tnt += read[i][j]
        EXY += read[i][j] * read[i][0] * veerud[j-1][0]
    Xtabel.append([read[i][0],tnt])

for i in range(len(veerud)):
    tnt = 0
    for j in range(1,len(veerud[0])):
        tnt += veerud[i][j]
    Ytabel.append([veerud[i][0],tnt])

EX = 0
EX2 = 0
EY = 0
EY2 = 0

for paar in Xtabel:
    #print(paar)
    EX += paar[0]*paar[1]
    EX2 += paar[0]**2 * paar[1]
print(f"EX = {EX}")
print(f"EX2 = {EX2}")
for paar in Ytabel:
    EY += paar[0]*paar[1]
    EY2 += paar[0]**2 * paar[1]
print(f"EY = {EY}")
print(f"EY2 = {EY2}")

DX = round(EX2 - EX**2, 6)
DY = round(EY2 - EY**2, 6)
print(f"DX = {DX}")
print(f"DY = {DY}")
print(f"EXY = {EXY}")
COV = EXY - EX*EY
print(f"COV = {COV}")
sigmaX = DX**0.5
sigmaY = DY**0.5
print(f"X standardhälve on {sigmaX}")
print(f"Y standardhälve on {sigmaY}")
print(f"Korrelatsioonikordaja on {COV/(sigmaX*sigmaY)}\n")

soltumatud = True
for i in range(len(read)):
    for j in range(1,len(read[0])):
        if read[i][j] != round(Xtabel[i][1] * Ytabel[j-1][1], 5):
            soltumatud = False
            print(f"{read[i][j]} ei vordu {Xtabel[i][1] * Ytabel[j-1][1]}, rida {i}, veerg {j}")
        if not soltumatud:
            break
    if not soltumatud:
        break

if soltumatud:
    print("X ja Y on sõltumatud")
else:
    print("X ja Y ei ole sõltumatud")