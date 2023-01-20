class FuzzyAHP {
    constructor() {
        this.RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]
    }

    hitungBobotKriteria = () => {
        var criteria = []

        criteria.push([1, 1, 9, 7, 7])
        criteria.push([1, 1, 9, 7, 7])
        criteria.push([0.111, 0.111, 1, 0.2, 0.333])
        criteria.push([0.143, 0.143, 5, 1, 3])
        criteria.push([0.143, 0.143, 3, 0.333, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C1 = 0
            var C2 = 0
            var C3 = 0
            var C4 = 0
            var C5 = 0

            for (let i = 0; i < c.length; i++) {
                C1 += c[i][0]
                C2 += c[i][1]
                C3 += c[i][2]
                C4 += c[i][3]
                C5 += c[i][4]
            }

            return [C1, C2, C3, C4, C5]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC1 = resultSumColumn[0]
        var totalColumnC2 = resultSumColumn[1]
        var totalColumnC3 = resultSumColumn[2]
        var totalColumnC4 = resultSumColumn[3]
        var totalColumnC5 = resultSumColumn[4]

        const normMatrix = (c, tC1, tC2, tC3, tC4, tC5) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2), (c[i][2] / tC3), (c[i][3] / tC4), (c[i][4] / tC5)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC1, totalColumnC2, totalColumnC3, totalColumnC4, totalColumnC5)

        const AHP_Weights = (c) => {
            var C1 = 0
            var C2 = 0
            var C3 = 0
            var C4 = 0
            var C5 = 0

            const item = c.map(item => item)

            C1 = (item[0][0] + item[0][1] + item[0][2] + item[0][3] + item[0][4]) / 5
            C2 = (item[1][0] + item[1][1] + item[1][2] + item[1][3] + item[1][4]) / 5
            C3 = (item[2][0] + item[2][1] + item[2][2] + item[2][3] + item[2][4]) / 5
            C4 = (item[3][0] + item[3][1] + item[3][2] + item[3][3] + item[3][4]) / 5
            C5 = (item[4][0] + item[4][1] + item[4][2] + item[4][3] + item[4][4]) / 5

            return [C1, C2, C3, C4, C5]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C1_AHP = AHP_Weights_result[0]
        var C2_AHP = AHP_Weights_result[1]
        var C3_AHP = AHP_Weights_result[2]
        var C4_AHP = AHP_Weights_result[3]
        var C5_AHP = AHP_Weights_result[4]

        //consistency
        const consistencyMeasure = (c, c1, c2, c3, c4, c5) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2) + (c[0][2] * c3) + (c[0][3] * c4) + (c[0][4] * c5)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2) + (c[1][2] * c3) + (c[1][3] * c4) + (c[1][4] * c5)) / c2
            const C3 = ((c[2][0] * c1) + (c[2][1] * c2) + (c[2][2] * c3) + (c[2][3] * c4) + (c[2][4] * c5)) / c3
            const C4 = ((c[3][0] * c1) + (c[3][1] * c2) + (c[3][2] * c3) + (c[3][3] * c4) + (c[3][4] * c5)) / c4
            const C5 = ((c[4][0] * c1) + (c[4][1] * c2) + (c[4][2] * c3) + (c[4][3] * c4) + (c[4][4] * c5)) / c5

            return [C1, C2, C3, C4, C5]
        }

        var cm_result = consistencyMeasure(criteria, C1_AHP, C2_AHP, C3_AHP, C4_AHP, C5_AHP)

        var lamda_maks = (cm_result[0] + cm_result[1] + cm_result[2] + cm_result[3] + cm_result[4]) / 5
        var CI = (lamda_maks - 5) / (5 - 1)

        var CR = CI / this.RCI[5 - 1]

        if (CR < 0.1) {
            var fuzzycriteria = []

            fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 1, m: 1, u: 1 }, { l: 7, m: 9, u: 9 }, { l: 5, m: 7, u: 9 }, { l: 5, m: 7, u: 9 }])
            fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 1, m: 1, u: 1 }, { l: 7, m: 9, u: 9 }, { l: 5, m: 7, u: 9 }, { l: 5, m: 7, u: 9 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.111, u: 0.143 }, { l: 0.111, m: 0.111, u: 0.143 }, { l: 1, m: 1, u: 1 }, { l: 0.143, m: 0.2, u: 0.333 }, { l: 0.2, m: 0.333, u: 1 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.111, m: 0.143, u: 0.2 }, { l: 3, m: 5, u: 7 }, { l: 1, m: 1, u: 1 }, { l: 1, m: 3, u: 5 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.111, m: 0.143, u: 0.2 }, { l: 1, m: 3, u: 5 }, { l: 0.2, m: 0.333, u: 1 }, { l: 1, m: 1, u: 1 }])

            //sintesis fuzzy
            const sintesisFuzzy = (c) => {
                var C1 = 0
                var C2 = 0
                var C3 = 0
                var C4 = 0
                var C5 = 0

                C1 = ({ l: (c[0][0].l + c[0][1].l + c[0][2].l + c[0][3].l + c[0][4].l), m: (c[0][0].m + c[0][1].m + c[0][2].m + c[0][3].m + c[0][4].m), u: (c[0][0].u + c[0][1].u + c[0][2].u + c[0][3].u + c[0][4].u) })
                C2 = ({ l: (c[1][0].l + c[1][1].l + c[1][2].l + c[1][3].l + c[1][4].l), m: (c[1][0].m + c[1][1].m + c[1][2].m + c[1][3].m + c[1][4].m), u: (c[1][0].u + c[1][1].u + c[1][2].u + c[1][3].u + c[1][4].u) })
                C3 = ({ l: (c[2][0].l + c[2][1].l + c[2][2].l + c[2][3].l + c[2][4].l), m: (c[2][0].m + c[2][1].m + c[2][2].m + c[2][3].m + c[2][4].m), u: (c[2][0].u + c[2][1].u + c[2][2].u + c[2][3].u + c[2][4].u) })
                C4 = ({ l: (c[3][0].l + c[3][1].l + c[3][2].l + c[3][3].l + c[3][4].l), m: (c[3][0].m + c[3][1].m + c[3][2].m + c[3][3].m + c[3][4].m), u: (c[3][0].u + c[3][1].u + c[3][2].u + c[3][3].u + c[3][4].u) })
                C5 = ({ l: (c[4][0].l + c[4][1].l + c[4][2].l + c[4][3].l + c[4][4].l), m: (c[4][0].m + c[4][1].m + c[4][2].m + c[4][3].m + c[4][4].m), u: (c[4][0].u + c[4][1].u + c[4][2].u + c[4][3].u + c[4][4].u) })

                return [C1, C2, C3, C4, C5]
            }

            var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)

            var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l + sintesisFuzzyResult[2].l + sintesisFuzzyResult[3].l + sintesisFuzzyResult[4].l
            var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m + sintesisFuzzyResult[2].m + sintesisFuzzyResult[3].m + sintesisFuzzyResult[4].m
            var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u + sintesisFuzzyResult[2].u + sintesisFuzzyResult[3].u + sintesisFuzzyResult[4].u

            const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
                var C1 = 0
                var C2 = 0
                var C3 = 0
                var C4 = 0
                var C5 = 0

                C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
                C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }
                C3 = { l: (c[2].l / totalUpper), m: (c[2].m / totalMedium), u: (c[2].u / totalLower) }
                C4 = { l: (c[3].l / totalUpper), m: (c[3].m / totalMedium), u: (c[3].u / totalLower) }
                C5 = { l: (c[4].l / totalUpper), m: (c[4].m / totalMedium), u: (c[4].u / totalLower) }

                return [C1, C2, C3, C4, C5]
            }

            var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)
        } else {
            console.log("Tidak Konsisten")
        }
    }

    hitungSubKriteriaC1 = () => {
        const RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]

        var criteria = []

        criteria.push([1, 0.143])
        criteria.push([7, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C11 = 0
            var C12 = 0

            for (let i = 0; i < c.length; i++) {
                C11 += c[i][0]
                C12 += c[i][1]
            }

            return [C11, C12]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC11 = resultSumColumn[0]
        var totalColumnC12 = resultSumColumn[1]

        const normMatrix = (c, tC1, tC2) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC11, totalColumnC12)

        const AHP_Weights = (c) => {
            var C11 = 0
            var C12 = 0

            const item = c.map(item => item)

            C11 = (item[0][0] + item[0][1]) / 2
            C12 = (item[1][0] + item[1][1]) / 2

            return [C11, C12]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C11_AHP = AHP_Weights_result[0]
        var C12_AHP = AHP_Weights_result[1]
    }

    hitungSubKriteriaC2 = () => {
        const RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]

        var criteria = []

        criteria.push([1, 0.143])
        criteria.push([7, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C21 = 0
            var C22 = 0

            for (let i = 0; i < c.length; i++) {
                C21 += c[i][0]
                C22 += c[i][1]
            }

            return [C21, C22]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC21 = resultSumColumn[0]
        var totalColumnC22 = resultSumColumn[1]

        const normMatrix = (c, tC1, tC2) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC21, totalColumnC22)

        const AHP_Weights = (c) => {
            var C21 = 0
            var C22 = 0

            const item = c.map(item => item)

            C21 = (item[0][0] + item[0][1]) / 2
            C22 = (item[1][0] + item[1][1]) / 2

            return [C21, C22]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C21_AHP = AHP_Weights_result[0]
        var C22_AHP = AHP_Weights_result[1]
    }

    hitungSubKriteriaC3 = () => {
        const RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]

        var criteria = []

        criteria.push([1, 3, 7, 7])
        criteria.push([0.333, 1, 5, 5])
        criteria.push([0.143, 0.2, 1, 3])
        criteria.push([0.143, 0.2, 0.333, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C31 = 0
            var C32 = 0
            var C33 = 0
            var C34 = 0

            for (let i = 0; i < c.length; i++) {
                C31 += c[i][0]
                C32 += c[i][1]
                C33 += c[i][2]
                C34 += c[i][3]
            }

            return [C31, C32, C33, C34]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC31 = resultSumColumn[0]
        var totalColumnC32 = resultSumColumn[1]
        var totalColumnC33 = resultSumColumn[2]
        var totalColumnC34 = resultSumColumn[3]

        const normMatrix = (c, tC1, tC2, tC3, tC4) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2), (c[i][2] / tC3), (c[i][3] / tC4)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC31, totalColumnC32, totalColumnC33, totalColumnC34)

        const AHP_Weights = (c) => {
            var C31 = 0
            var C32 = 0
            var C33 = 0
            var C34 = 0

            const item = c.map(item => item)

            C31 = (item[0][0] + item[0][1] + item[0][2] + item[0][3]) / 4
            C32 = (item[1][0] + item[1][1] + item[1][2] + item[1][3]) / 4
            C33 = (item[2][0] + item[2][1] + item[2][2] + item[2][3]) / 4
            C34 = (item[3][0] + item[3][1] + item[3][2] + item[3][3]) / 4

            return [C31, C32, C33, C34]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C31_AHP = AHP_Weights_result[0]
        var C32_AHP = AHP_Weights_result[1]
        var C33_AHP = AHP_Weights_result[2]
        var C34_AHP = AHP_Weights_result[3]

        //consistency
        const consistencyMeasure = (c, c1, c2, c3, c4) => {
            const C31 = ((c[0][0] * c1) + (c[0][1] * c2) + (c[0][2] * c3) + (c[0][3] * c4)) / c1
            const C32 = ((c[1][0] * c1) + (c[1][1] * c2) + (c[1][2] * c3) + (c[1][3] * c4)) / c2
            const C33 = ((c[2][0] * c1) + (c[2][1] * c2) + (c[2][2] * c3) + (c[2][3] * c4)) / c3
            const C34 = ((c[3][0] * c1) + (c[3][1] * c2) + (c[3][2] * c3) + (c[3][3] * c4)) / c4

            return [C31, C32, C33, C34]
        }

        var cm_result = consistencyMeasure(criteria, C31_AHP, C32_AHP, C33_AHP, C34_AHP)
        console.log(cm_result)

        var lamda_maks = (cm_result[0] + cm_result[1] + cm_result[2] + cm_result[3]) / 4
        var CI = (lamda_maks - 4) / (4 - 1)

        var CR = CI / RCI[4 - 1]

        //Fuzzy AHP
        if (CR < 0.1) {

        } else {
            console.log("Tidak Konsisten")
        }
    }

    hitungSubKriteriaC4 = () => {
        const RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]

        var criteria = []

        criteria.push([1, 9])
        criteria.push([0.111, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C41 = 0
            var C42 = 0

            for (let i = 0; i < c.length; i++) {
                C41 += c[i][0]
                C42 += c[i][1]
            }

            return [C41, C42]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC41 = resultSumColumn[0]
        var totalColumnC42 = resultSumColumn[1]

        const normMatrix = (c, tC1, tC2) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC41, totalColumnC42)

        const AHP_Weights = (c) => {
            var C41 = 0
            var C42 = 0

            const item = c.map(item => item)

            C41 = (item[0][0] + item[0][1]) / 2
            C42 = (item[1][0] + item[1][1]) / 2

            return [C41, C42]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C41_AHP = AHP_Weights_result[0]
        var C42_AHP = AHP_Weights_result[1]
    }

    hitungSubKriteriaC5 = () => {
        const RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]

        var criteria = []

        criteria.push([1, 0.111])
        criteria.push([9, 1])

        //ahp
        var resultSumColumn = []

        const sumColumn = (c) => {
            var C51 = 0
            var C52 = 0

            for (let i = 0; i < c.length; i++) {
                C51 += c[i][0]
                C52 += c[i][1]
            }

            return [C51, C52]
        }

        resultSumColumn = sumColumn(criteria)

        var totalColumnC51 = resultSumColumn[0]
        var totalColumnC52 = resultSumColumn[1]

        const normMatrix = (c, tC1, tC2) => {
            var dividedCriteria = []

            for (let i = 0; i < c.length; i++) {
                dividedCriteria.push([(c[i][0] / tC1), (c[i][1] / tC2)])
            }

            return dividedCriteria
        }

        var matrixNorm = normMatrix(criteria, totalColumnC51, totalColumnC52)

        const AHP_Weights = (c) => {
            var C51 = 0
            var C52 = 0

            const item = c.map(item => item)

            C51 = (item[0][0] + item[0][1]) / 2
            C52 = (item[1][0] + item[1][1]) / 2

            return [C51, C52]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)

        var C51_AHP = AHP_Weights_result[0]
        var C52_AHP = AHP_Weights_result[1]
    }
}