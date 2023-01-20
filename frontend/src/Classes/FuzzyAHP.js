class FuzzyAHP {
    constructor() {
        this.RCI = [0, 0, 0.52, 0.89, 1.12, 1.26, 1.36, 1.41, 1.46, 1.49]
    }

    getBobotKriteria = () => {
        // console.log('-------- Perhitungan Bobot Kriteria --------\n')

        var criteria = []

        criteria.push([1, 1, 9, 7, 7])
        criteria.push([1, 1, 9, 7, 7])
        criteria.push([0.111, 0.111, 1, 0.2, 0.333])
        criteria.push([0.143, 0.143, 5, 1, 3])
        criteria.push([0.143, 0.143, 3, 0.333, 1])

        // console.log("Matriks AHP:\n" , criteria , "\n\n")

        //ahp
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

        var resultSumColumn = sumColumn(criteria)

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
        // console.log("Normalisasi matrix\n" , matrixNorm , "\n\n")


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
        // console.log("Bobot AHP\n" , AHP_Weights_result , "\n\n")

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
        // console.log("Consistency Measure\n" , cm_result , "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1] + cm_result[2] + cm_result[3] + cm_result[4]) / 5
        // console.log("Lamda maks\n" , lamda_maks , "\n\n")

        var CI = (lamda_maks - 5) / (5 - 1)
        // console.log("Consistency Index\n" , CI , "\n\n")

        var CR = CI / this.RCI[5 - 1]
        // console.log("Consistency Ratio\n" , CR , "\n\n")

        //Fuzzy AHP
        if (CR < 0.1) {
            var fuzzycriteria = []

            fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 1, m: 1, u: 1 }, { l: 7, m: 9, u: 9 }, { l: 5, m: 7, u: 9 }, { l: 5, m: 7, u: 9 }])
            fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 1, m: 1, u: 1 }, { l: 7, m: 9, u: 9 }, { l: 5, m: 7, u: 9 }, { l: 5, m: 7, u: 9 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.111, u: 0.143 }, { l: 0.111, m: 0.111, u: 0.143 }, { l: 1, m: 1, u: 1 }, { l: 0.143, m: 0.2, u: 0.333 }, { l: 0.2, m: 0.333, u: 1 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.111, m: 0.143, u: 0.2 }, { l: 3, m: 5, u: 7 }, { l: 1, m: 1, u: 1 }, { l: 1, m: 3, u: 5 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.111, m: 0.143, u: 0.2 }, { l: 1, m: 3, u: 5 }, { l: 0.2, m: 0.333, u: 1 }, { l: 1, m: 1, u: 1 }])

            // console.log("Matriks Fuzzy AHP\n" , fuzzycriteria , "\n\n")

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

            // console.log("Sintesis Fuzzy\n" , sintesisFuzzyResult , "\n\n")

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

            // console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

            //priority vector
            const vector = (c) => {
                var C1 = [
                    1,
                    c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l))),
                    c[0].m >= c[2].m ? 1 : c[0].m < c[2].m && c[0].m < c[2].l ? 0 : ((c[2].l - c[0].u) / ((c[0].m - c[0].u) - (c[2].m - c[2].l))),
                    c[0].m >= c[3].m ? 1 : c[0].m < c[3].m && c[0].m < c[3].l ? 0 : ((c[3].l - c[0].u) / ((c[0].m - c[0].u) - (c[3].m - c[3].l))),
                    c[0].m >= c[4].m ? 1 : c[0].m < c[4].m && c[0].m < c[4].l ? 0 : ((c[4].l - c[0].u) / ((c[0].m - c[0].u) - (c[4].m - c[4].l))),
                ]

                var C2 = [
                    c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                    1,
                    c[1].m >= c[2].m ? 1 : c[1].m < c[2].m && c[1].m < c[2].l ? 0 : ((c[2].l - c[1].u) / ((c[1].m - c[1].u) - (c[2].m - c[2].l))),
                    c[1].m >= c[3].m ? 1 : c[1].m < c[3].m && c[1].m < c[3].l ? 0 : ((c[3].l - c[1].u) / ((c[1].m - c[1].u) - (c[3].m - c[3].l))),
                    c[1].m >= c[4].m ? 1 : c[1].m < c[4].m && c[1].m < c[4].l ? 0 : ((c[4].l - c[1].u) / ((c[1].m - c[1].u) - (c[4].m - c[4].l))),
                ]

                var C3 = [
                    c[2].m >= c[0].m ? 1 : c[2].m < c[0].m && c[2].m < c[0].l ? 0 : ((c[0].l - c[2].u) / ((c[2].m - c[2].u) - (c[0].m - c[0].l))),
                    c[2].m >= c[1].m ? 1 : c[2].m < c[1].m && c[2].m < c[1].l ? 0 : ((c[1].l - c[2].u) / ((c[2].m - c[2].u) - (c[2].m - c[2].l))),
                    1,
                    c[2].m >= c[3].m ? 1 : c[2].m < c[3].m && c[2].m < c[3].l ? 0 : ((c[3].l - c[2].u) / ((c[2].m - c[2].u) - (c[3].m - c[3].l))),
                    c[2].m >= c[4].m ? 1 : c[2].m < c[4].m && c[2].m < c[4].l ? 0 : ((c[4].l - c[2].u) / ((c[2].m - c[2].u) - (c[4].m - c[4].l))),
                ]

                var C4 = [
                    c[3].m >= c[0].m ? 1 : c[3].m < c[0].m && c[3].m < c[0].l ? 0 : (c[0].l - c[3].u) / ((c[3].m - c[3].u) - (c[0].m - c[0].l)),
                    c[3].m >= c[1].m ? 1 : c[3].m < c[1].m && c[3].m < c[1].l ? 0 : (c[1].l - c[3].u) / ((c[3].m - c[3].u) - (c[1].m - c[1].l)),
                    c[3].m >= c[2].m ? 1 : c[3].m < c[2].m && c[3].m < c[2].l ? 0 : (c[2].l - c[3].u) / ((c[3].m - c[3].u) - (c[2].m - c[2].l)),
                    1,
                    c[3].m >= c[4].m ? 1 : c[3].m < c[4].m && c[3].m < c[4].l ? 0 : (c[4].l - c[3].u) / ((c[3].m - c[3].u) - (c[4].m - c[4].l)),
                ]

                var C5 = [
                    c[4].m >= c[0].m ? 1 : c[4].m < c[0].m && c[4].m < c[0].l ? 0 : ((c[0].l - c[4].u) / ((c[4].m - c[4].u) - (c[0].m - c[0].l))),
                    c[4].m >= c[1].m ? 1 : c[4].m < c[1].m && c[4].m < c[1].l ? 0 : ((c[1].l - c[4].u) / ((c[4].m - c[4].u) - (c[1].m - c[1].l))),
                    c[4].m >= c[2].m ? 1 : c[4].m < c[2].m && c[4].m < c[2].l ? 0 : ((c[2].l - c[4].u) / ((c[4].m - c[4].u) - (c[2].m - c[2].l))),
                    c[4].m >= c[3].m ? 1 : c[4].m < c[3].m && c[4].m < c[3].l ? 0 : ((c[3].l - c[4].u) / ((c[4].m - c[4].u) - (c[3].m - c[3].l))),
                    1,

                ]

                return [C1, C2, C3, C4, C5]
            }

            const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

            // console.log("Vektor Prioritas\n" , vectorPriorityResult , "\n\n")

            //defuzifikasi
            var defuzifikasiC1 = Math.min.apply(null, vectorPriorityResult[0])
            var defuzifikasiC2 = Math.min.apply(null, vectorPriorityResult[1])
            var defuzifikasiC3 = Math.min.apply(null, vectorPriorityResult[2])
            var defuzifikasiC4 = Math.min.apply(null, vectorPriorityResult[3])
            var defuzifikasiC5 = Math.min.apply(null, vectorPriorityResult[4])

            // console.log("Ordinat defuzifikasi: \n",defuzifikasiC1, defuzifikasiC2, defuzifikasiC3, defuzifikasiC4, defuzifikasiC5, '\n\n')

            //bobot Fuzzy kriteria
            var totaldefuzzifikasi = defuzifikasiC1 + defuzifikasiC2 + defuzifikasiC3 + defuzifikasiC4 + defuzifikasiC5

            var bobotFuzzy = {
                C1: defuzifikasiC1 / totaldefuzzifikasi,
                C2: defuzifikasiC2 / totaldefuzzifikasi,
                C3: defuzifikasiC3 / totaldefuzzifikasi,
                C4: defuzifikasiC4 / totaldefuzzifikasi,
                C5: defuzifikasiC5 / totaldefuzzifikasi
            }

            // console.log("Bobot Fuzzy:\n",bobotFuzzy)

            return bobotFuzzy
        }
    }

    getBobotSubKriteriaC1 = () => {
        // console.log('-------- Perhitungan Bobot Subkriteria Kriteria 1 --------\n')

        var criteria = []

        criteria.push([1, 0.143])
        criteria.push([7, 1])

        // console.log("Matriks AHP\n" , criteria , "\n\n")

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
        // console.log("Normalisasi Matriks\n" , matrixNorm , "\n\n")

        const AHP_Weights = (c) => {
            var C11 = 0
            var C12 = 0

            const item = c.map(item => item)

            C11 = (item[0][0] + item[0][1]) / 2
            C12 = (item[1][0] + item[1][1]) / 2

            return [C11, C12]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)
        // console.log("Bobot AHP\n" , AHP_Weights_result , "\n\n")

        var C11_AHP = AHP_Weights_result[0]
        var C12_AHP = AHP_Weights_result[1]

        //consistency
        const consistencyMeasure = (c, c1, c2) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2)) / c2

            return [C1, C2]
        }

        var cm_result = consistencyMeasure(criteria, C11_AHP, C12_AHP)
        // console.log("Consistency Measure\n" , cm_result , "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1]) / 2
        // console.log("Lamda maks\n" , lamda_maks , "\n\n")

        var CI = (lamda_maks - 2) / (2 - 1)
        // console.log("Consistency Index\n" , CI , "\n\n")

        var CR = CI / this.RCI[2 - 1]
        // console.log("Consistency Ratio\n" , CR , "\n\n")

        //Fuzzy AHP
        var fuzzycriteria = []

        fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 0.111, m: 0.143, u: 0.2 }])
        fuzzycriteria.push([{ l: 5, m: 7, u: 9 }, { l: 1, m: 1, u: 1 }])

        // console.log("Matriks Fuzzy AHP\n" , fuzzycriteria , "\n\n")

        //sintesis fuzzy
        const sintesisFuzzy = (c) => {
            var C1 = 0
            var C2 = 0

            C1 = ({ l: (c[0][0].l + c[0][1].l), m: (c[0][0].m + c[0][1].m), u: (c[0][0].u + c[0][1].u) })
            C2 = ({ l: (c[1][0].l + c[1][1].l), m: (c[1][0].m + c[1][1].m), u: (c[1][0].u + c[1][1].u) })

            return [C1, C2]
        }

        var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)
        // console.log("Sintesis Fuzzy\n" , sintesisFuzzyResult , "\n\n")

        var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l
        var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m
        var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u

        const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
            var C1 = 0
            var C2 = 0

            C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
            C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }

            return [C1, C2]
        }

        var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)
        // console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

        //priority vector
        const vector = (c) => {
            var C1 = [
                1,
                c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l)))
            ]

            var C2 = [
                c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                1,
            ]

            return [C1, C2]
        }

        const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

        // console.log("Vektor Prioritas\n" , vectorPriorityResult , "\n\n")

        //defuzifikasi
        var defuzifikasiC11 = Math.min.apply(null, vectorPriorityResult[0])
        var defuzifikasiC12 = Math.min.apply(null, vectorPriorityResult[1])

        // console.log("Ordinat defuzifikasi: \n",defuzifikasiC11, defuzifikasiC12, '\n\n')

        //bobot Fuzzy kriteria
        var totaldefuzzifikasi = defuzifikasiC11 + defuzifikasiC12

        var bobotFuzzy = {
            C11: defuzifikasiC11 / totaldefuzzifikasi,
            C12: defuzifikasiC12 / totaldefuzzifikasi
        }

        // console.log("Bobot Fuzzy: \n", bobotFuzzy)

        return bobotFuzzy
    }

    getBobotSubKriteriaC2 = () => {
        // console.log('-------- Perhitungan Bobot Subkriteria Kriteria 2 --------\n')

        var criteria = []

        criteria.push([1, 0.143])
        criteria.push([7, 1])

        // console.log("Matriks AHP\n" , criteria , "\n\n")

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
        // console.log("Normalisasi Matriks\n" , matrixNorm , "\n\n")

        const AHP_Weights = (c) => {
            var C21 = 0
            var C22 = 0

            const item = c.map(item => item)

            C21 = (item[0][0] + item[0][1]) / 2
            C22 = (item[1][0] + item[1][1]) / 2

            return [C21, C22]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)
        // console.log("Bobot AHP\n" , AHP_Weights_result , "\n\n")

        var C21_AHP = AHP_Weights_result[0]
        var C22_AHP = AHP_Weights_result[1]

        //consistency
        const consistencyMeasure = (c, c1, c2) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2)) / c2

            return [C1, C2]
        }

        var cm_result = consistencyMeasure(criteria, C21_AHP, C22_AHP)
        // console.log("Consistency Measure\n" , cm_result , "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1]) / 2
        // console.log("Lamda maks\n" , lamda_maks , "\n\n")

        var CI = (lamda_maks - 2) / (2 - 1)
        // console.log("Consistency Index\n" , CI , "\n\n")

        var CR = CI / this.RCI[2 - 1]
        // console.log("Consistency Ratio\n" , CR , "\n\n")

        //Fuzzy AHP
        var fuzzycriteria = []

        fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 0.111, m: 0.143, u: 0.2 }])
        fuzzycriteria.push([{ l: 5, m: 7, u: 9 }, { l: 1, m: 1, u: 1 }])

        // console.log("Matriks Fuzzy AHP\n" , fuzzycriteria , "\n\n")

        //sintesis fuzzy
        const sintesisFuzzy = (c) => {
            var C1 = 0
            var C2 = 0

            C1 = ({ l: (c[0][0].l + c[0][1].l), m: (c[0][0].m + c[0][1].m), u: (c[0][0].u + c[0][1].u) })
            C2 = ({ l: (c[1][0].l + c[1][1].l), m: (c[1][0].m + c[1][1].m), u: (c[1][0].u + c[1][1].u) })

            return [C1, C2]
        }

        var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)
        // console.log("Sintesis Fuzzy\n" , sintesisFuzzyResult , "\n\n")

        var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l
        var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m
        var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u

        const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
            var C1 = 0
            var C2 = 0

            C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
            C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }

            return [C1, C2]
        }

        var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)
        // console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

        //priority vector
        const vector = (c) => {
            var C1 = [
                1,
                c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l)))
            ]

            var C2 = [
                c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                1,
            ]

            return [C1, C2]
        }

        const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

        // console.log("Vektor Prioritas\n" , vectorPriorityResult , "\n\n")

        //defuzifikasi
        var defuzifikasiC21 = Math.min.apply(null, vectorPriorityResult[0])
        var defuzifikasiC22 = Math.min.apply(null, vectorPriorityResult[1])

        // console.log("Ordinat defuzifikasi: \n",defuzifikasiC21, defuzifikasiC22, '\n\n')

        //bobot Fuzzy kriteria
        var totaldefuzzifikasi = defuzifikasiC21 + defuzifikasiC22

        var bobotFuzzy = {
            C21: defuzifikasiC21 / totaldefuzzifikasi,
            C22: defuzifikasiC22 / totaldefuzzifikasi
        }

        // console.log("Bobot Fuzzy: \n", bobotFuzzy)

        return bobotFuzzy
    }

    getBobotSubKriteriaC3 = () => {
        console.log('-------- Perhitungan Bobot Subkriteria Kriteria 3 --------\n')

        var criteria = []

        criteria.push([1, 3, 7, 7])
        criteria.push([0.333, 1, 5, 5])
        criteria.push([0.143, 0.2, 1, 3])
        criteria.push([0.143, 0.2, 0.333, 1])

        console.log("Matriks AHP:\n", criteria, "\n\n")

        //ahp
        const sumColumn = (c) => {
            var C1 = 0
            var C2 = 0
            var C3 = 0
            var C4 = 0

            for (let i = 0; i < c.length; i++) {
                C1 += c[i][0]
                C2 += c[i][1]
                C3 += c[i][2]
                C4 += c[i][3]
            }

            return [C1, C2, C3, C4]
        }

        var resultSumColumn = sumColumn(criteria)

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
        console.log("Normalisasi matrix\n", matrixNorm, "\n\n")


        const AHP_Weights = (c) => {
            var C1 = 0
            var C2 = 0
            var C3 = 0
            var C4 = 0

            const item = c.map(item => item)

            C1 = (item[0][0] + item[0][1] + item[0][2] + item[0][3]) / 4
            C2 = (item[1][0] + item[1][1] + item[1][2] + item[1][3]) / 4
            C3 = (item[2][0] + item[2][1] + item[2][2] + item[2][3]) / 4
            C4 = (item[3][0] + item[3][1] + item[3][2] + item[3][3]) / 4

            return [C1, C2, C3, C4]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)
        console.log("Bobot AHP\n", AHP_Weights_result, "\n\n")

        var C31_AHP = AHP_Weights_result[0]
        var C32_AHP = AHP_Weights_result[1]
        var C33_AHP = AHP_Weights_result[2]
        var C34_AHP = AHP_Weights_result[3]

        //consistency
        const consistencyMeasure = (c, c1, c2, c3, c4) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2) + (c[0][2] * c3) + (c[0][3] * c4)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2) + (c[1][2] * c3) + (c[1][3] * c4)) / c2
            const C3 = ((c[2][0] * c1) + (c[2][1] * c2) + (c[2][2] * c3) + (c[2][3] * c4)) / c3
            const C4 = ((c[3][0] * c1) + (c[3][1] * c2) + (c[3][2] * c3) + (c[3][3] * c4)) / c4

            return [C1, C2, C3, C4]
        }

        var cm_result = consistencyMeasure(criteria, C31_AHP, C32_AHP, C33_AHP, C34_AHP)
        console.log("Consistency Measure\n", cm_result, "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1] + cm_result[2] + cm_result[3]) / 4
        console.log("Lamda maks\n", lamda_maks, "\n\n")

        var CI = (lamda_maks - 4) / (4 - 1)
        console.log("Consistency Index\n", CI, "\n\n")

        var CR = CI / this.RCI[4 - 1]
        console.log("Consistency Ratio\n", CR, "\n\n")

        //Fuzzy AHP
        if (CR < 0.1) {
            var fuzzycriteria = []

            fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 1, m: 3, u: 5 }, { l: 5, m: 7, u: 9 }, { l: 5, m: 7, u: 9 }])
            fuzzycriteria.push([{ l: 0.2, m: 0.333, u: 1 }, { l: 1, m: 1, u: 1 }, { l: 3, m: 5, u: 7 }, { l: 3, m: 5, u: 7 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.143, m: 0.2, u: 0.333 }, { l: 1, m: 1, u: 1 }, { l: 1, m: 3, u: 5 }])
            fuzzycriteria.push([{ l: 0.111, m: 0.143, u: 0.2 }, { l: 0.143, m: 0.2, u: 0.333 }, { l: 0.2, m: 0.333, u: 1 }, { l: 1, m: 1, u: 1 }])

            console.log("Matriks Fuzzy AHP\n", fuzzycriteria, "\n\n")

            //sintesis fuzzy
            const sintesisFuzzy = (c) => {
                var C1 = 0
                var C2 = 0
                var C3 = 0
                var C4 = 0

                C1 = ({ l: (c[0][0].l + c[0][1].l + c[0][2].l + c[0][3].l), m: (c[0][0].m + c[0][1].m + c[0][2].m + c[0][3].m), u: (c[0][0].u + c[0][1].u + c[0][2].u + c[0][3].u) })
                C2 = ({ l: (c[1][0].l + c[1][1].l + c[1][2].l + c[1][3].l), m: (c[1][0].m + c[1][1].m + c[1][2].m + c[1][3].m), u: (c[1][0].u + c[1][1].u + c[1][2].u + c[1][3].u) })
                C3 = ({ l: (c[2][0].l + c[2][1].l + c[2][2].l + c[2][3].l), m: (c[2][0].m + c[2][1].m + c[2][2].m + c[2][3].m), u: (c[2][0].u + c[2][1].u + c[2][2].u + c[2][3].u) })
                C4 = ({ l: (c[3][0].l + c[3][1].l + c[3][2].l + c[3][3].l), m: (c[3][0].m + c[3][1].m + c[3][2].m + c[3][3].m), u: (c[3][0].u + c[3][1].u + c[3][2].u + c[3][3].u) })

                return [C1, C2, C3, C4]
            }

            var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)

            console.log("Sintesis Fuzzy\n", sintesisFuzzyResult, "\n\n")

            var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l + sintesisFuzzyResult[2].l + sintesisFuzzyResult[3].l
            var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m + sintesisFuzzyResult[2].m + sintesisFuzzyResult[3].m
            var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u + sintesisFuzzyResult[2].u + sintesisFuzzyResult[3].u

            const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
                var C1 = 0
                var C2 = 0
                var C3 = 0
                var C4 = 0

                C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
                C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }
                C3 = { l: (c[2].l / totalUpper), m: (c[2].m / totalMedium), u: (c[2].u / totalLower) }
                C4 = { l: (c[3].l / totalUpper), m: (c[3].m / totalMedium), u: (c[3].u / totalLower) }

                return [C1, C2, C3, C4]
            }

            var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)

            console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

            //priority vector
            const vector = (c) => {
                var C1 = [
                    1,
                    c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l))),
                    c[0].m >= c[2].m ? 1 : c[0].m < c[2].m && c[0].m < c[2].l ? 0 : ((c[2].l - c[0].u) / ((c[0].m - c[0].u) - (c[2].m - c[2].l))),
                    c[0].m >= c[3].m ? 1 : c[0].m < c[3].m && c[0].m < c[3].l ? 0 : ((c[3].l - c[0].u) / ((c[0].m - c[0].u) - (c[3].m - c[3].l))),
                ]

                var C2 = [
                    c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                    1,
                    c[1].m >= c[2].m ? 1 : c[1].m < c[2].m && c[1].m < c[2].l ? 0 : ((c[2].l - c[1].u) / ((c[1].m - c[1].u) - (c[2].m - c[2].l))),
                    c[1].m >= c[3].m ? 1 : c[1].m < c[3].m && c[1].m < c[3].l ? 0 : ((c[3].l - c[1].u) / ((c[1].m - c[1].u) - (c[3].m - c[3].l))),
                ]

                var C3 = [
                    c[2].m >= c[0].m ? 1 : c[2].m < c[0].m && c[2].m < c[0].l ? 0 : ((c[0].l - c[2].u) / ((c[2].m - c[2].u) - (c[0].m - c[0].l))),
                    c[2].m >= c[1].m ? 1 : c[2].m < c[1].m && c[2].m < c[1].l ? 0 : ((c[1].l - c[2].u) / ((c[2].m - c[2].u) - (c[2].m - c[2].l))),
                    1,
                    c[2].m >= c[3].m ? 1 : c[2].m < c[3].m && c[2].m < c[3].l ? 0 : ((c[3].l - c[2].u) / ((c[2].m - c[2].u) - (c[3].m - c[3].l))),
                ]

                var C4 = [
                    c[3].m >= c[0].m ? 1 : c[3].m < c[0].m && c[3].m < c[0].l ? 0 : (c[0].l - c[3].u) / ((c[3].m - c[3].u) - (c[0].m - c[0].l)),
                    c[3].m >= c[1].m ? 1 : c[3].m < c[1].m && c[3].m < c[1].l ? 0 : (c[1].l - c[3].u) / ((c[3].m - c[3].u) - (c[1].m - c[1].l)),
                    c[3].m >= c[2].m ? 1 : c[3].m < c[2].m && c[3].m < c[2].l ? 0 : (c[2].l - c[3].u) / ((c[3].m - c[3].u) - (c[2].m - c[2].l)),
                    1,
                ]

                return [C1, C2, C3, C4]
            }

            const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

            console.log("Vektor Prioritas\n", vectorPriorityResult, "\n\n")

            //defuzifikasi
            var defuzifikasiC1 = Math.min.apply(null, vectorPriorityResult[0])
            var defuzifikasiC2 = Math.min.apply(null, vectorPriorityResult[1])
            var defuzifikasiC3 = Math.min.apply(null, vectorPriorityResult[2])
            var defuzifikasiC4 = Math.min.apply(null, vectorPriorityResult[3])

            console.log("Ordinat defuzifikasi: \n", defuzifikasiC1, defuzifikasiC2, defuzifikasiC3, defuzifikasiC4, '\n\n')

            //bobot Fuzzy kriteria
            var totaldefuzzifikasi = defuzifikasiC1 + defuzifikasiC2 + defuzifikasiC3 + defuzifikasiC4

            var bobotFuzzy = {
                C31: defuzifikasiC1 / totaldefuzzifikasi,
                C32: defuzifikasiC2 / totaldefuzzifikasi,
                C33: defuzifikasiC3 / totaldefuzzifikasi,
                C34: defuzifikasiC4 / totaldefuzzifikasi,
            }

            console.log("Bobot Fuzzy:\n", bobotFuzzy)

            return bobotFuzzy
        }
    }

    getBobotSubKriteriaC4 = () => {
        // console.log("------- Perhitungan Bobot Subkriteria C4 -------")
        var criteria = []

        criteria.push([1, 9])
        criteria.push([0.111, 1])

        // console.log("Matriks AHP\n" , criteria , "\n\n")

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
        // console.log("Normalisasi Matriks\n" , matrixNorm , "\n\n")

        const AHP_Weights = (c) => {
            var C41 = 0
            var C42 = 0

            const item = c.map(item => item)

            C41 = (item[0][0] + item[0][1]) / 2
            C42 = (item[1][0] + item[1][1]) / 2

            return [C41, C42]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)
        // console.log("Bobot AHP\n" , AHP_Weights_result , "\n\n")

        var C41_AHP = AHP_Weights_result[0]
        var C42_AHP = AHP_Weights_result[1]

        //consistency
        const consistencyMeasure = (c, c1, c2) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2)) / c2

            return [C1, C2]
        }

        var cm_result = consistencyMeasure(criteria, C41_AHP, C42_AHP)
        // console.log("Consistency Measure\n" , cm_result , "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1]) / 2
        // console.log("Lamda maks\n" , lamda_maks , "\n\n")

        var CI = (lamda_maks - 2) / (2 - 1)
        // console.log("Consistency Index\n" , CI , "\n\n")

        var CR = CI / this.RCI[2 - 1]
        // console.log("Consistency Ratio\n" , CR , "\n\n")

        //Fuzzy AHP
        var fuzzycriteria = []

        fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 7, m: 9, u: 9 }])
        fuzzycriteria.push([{ l: 0.111, m: 0.111, u: 0.143 }, { l: 1, m: 1, u: 1 }])

        // console.log("Matriks Fuzzy AHP\n" , fuzzycriteria , "\n\n")

        //sintesis fuzzy
        const sintesisFuzzy = (c) => {
            var C1 = 0
            var C2 = 0

            C1 = ({ l: (c[0][0].l + c[0][1].l), m: (c[0][0].m + c[0][1].m), u: (c[0][0].u + c[0][1].u) })
            C2 = ({ l: (c[1][0].l + c[1][1].l), m: (c[1][0].m + c[1][1].m), u: (c[1][0].u + c[1][1].u) })

            return [C1, C2]
        }

        var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)
        // console.log("Sintesis Fuzzy\n" , sintesisFuzzyResult , "\n\n")

        var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l
        var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m
        var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u

        const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
            var C1 = 0
            var C2 = 0

            C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
            C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }

            return [C1, C2]
        }

        var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)
        // console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

        //priority vector
        const vector = (c) => {
            var C1 = [
                1,
                c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l)))
            ]

            var C2 = [
                c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                1,
            ]

            return [C1, C2]
        }

        const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

        // console.log("Vektor Prioritas\n" , vectorPriorityResult , "\n\n")

        //defuzifikasi
        var defuzifikasiC41 = Math.min.apply(null, vectorPriorityResult[0])
        var defuzifikasiC42 = Math.min.apply(null, vectorPriorityResult[1])

        // console.log("Ordinat defuzifikasi: \n",defuzifikasiC41, defuzifikasiC42, '\n\n')

        //bobot Fuzzy kriteria
        var totaldefuzzifikasi = defuzifikasiC41 + defuzifikasiC42

        var bobotFuzzy = {
            C41: defuzifikasiC41 / totaldefuzzifikasi,
            C42: defuzifikasiC42 / totaldefuzzifikasi
        }

        // console.log("Bobot Fuzzy", bobotFuzzy)

        return bobotFuzzy
    }

    getBobotSubKriteriaC5 = () => {
        // console.log("------- Perhitungan Bobot Subkriteria C5 -------")

        var criteria = []

        criteria.push([1, 0.111])
        criteria.push([9, 1])

        // console.log("Matriks AHP\n" , criteria , "\n\n")

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
        // console.log("Normalisasi Matriks\n" , matrixNorm , "\n\n")

        const AHP_Weights = (c) => {
            var C51 = 0
            var C52 = 0

            const item = c.map(item => item)

            C51 = (item[0][0] + item[0][1]) / 2
            C52 = (item[1][0] + item[1][1]) / 2

            return [C51, C52]
        }

        var AHP_Weights_result = AHP_Weights(matrixNorm)
        // console.log("Bobot AHP\n" , AHP_Weights_result , "\n\n")

        var C51_AHP = AHP_Weights_result[0]
        var C52_AHP = AHP_Weights_result[1]

        //consistency
        const consistencyMeasure = (c, c1, c2) => {
            const C1 = ((c[0][0] * c1) + (c[0][1] * c2)) / c1
            const C2 = ((c[1][0] * c1) + (c[1][1] * c2)) / c2

            return [C1, C2]
        }

        var cm_result = consistencyMeasure(criteria, C51_AHP, C52_AHP)
        // console.log("Consistency Measure\n" , cm_result , "\n\n")

        var lamda_maks = (cm_result[0] + cm_result[1]) / 2
        // console.log("Lamda maks\n" , lamda_maks , "\n\n")

        var CI = (lamda_maks - 2) / (2 - 1)
        // console.log("Consistency Index\n" , CI , "\n\n")

        var CR = CI / this.RCI[2 - 1]
        // console.log("Consistency Ratio\n" , CR , "\n\n")

        //Fuzzy AHP
        var fuzzycriteria = []

        fuzzycriteria.push([{ l: 1, m: 1, u: 1 }, { l: 0.111, m: 0.111, u: 0.143 }])
        fuzzycriteria.push([{ l: 7, m: 9, u: 9 }, { l: 1, m: 1, u: 1 }])

        // console.log("Matriks Fuzzy AHP\n" , fuzzycriteria , "\n\n")

        //sintesis fuzzy
        const sintesisFuzzy = (c) => {
            var C1 = 0
            var C2 = 0

            C1 = ({ l: (c[0][0].l + c[0][1].l), m: (c[0][0].m + c[0][1].m), u: (c[0][0].u + c[0][1].u) })
            C2 = ({ l: (c[1][0].l + c[1][1].l), m: (c[1][0].m + c[1][1].m), u: (c[1][0].u + c[1][1].u) })

            return [C1, C2]
        }

        var sintesisFuzzyResult = sintesisFuzzy(fuzzycriteria)
        // console.log("Sintesis Fuzzy\n" , sintesisFuzzyResult , "\n\n")

        var totalLower = sintesisFuzzyResult[0].l + sintesisFuzzyResult[1].l
        var totalMedium = sintesisFuzzyResult[0].m + sintesisFuzzyResult[1].m
        var totalUpper = sintesisFuzzyResult[0].u + sintesisFuzzyResult[1].u

        const sintesisFuzzyDivided = (c, totalLower, totalMedium, totalUpper) => {
            var C1 = 0
            var C2 = 0

            C1 = { l: (c[0].l / totalUpper), m: (c[0].m / totalMedium), u: (c[0].u / totalLower) }
            C2 = { l: (c[1].l / totalUpper), m: (c[1].m / totalMedium), u: (c[1].u / totalLower) }

            return [C1, C2]
        }

        var sintesisFuzzyDividedResult = sintesisFuzzyDivided(sintesisFuzzyResult, totalLower, totalMedium, totalUpper)
        // console.log("Sintesis Fuzzy dibagi total\n", sintesisFuzzyDividedResult, "\n\n")

        //priority vector
        const vector = (c) => {
            var C1 = [
                1,
                c[0].m >= c[1].m ? 1 : c[0].m < c[1].m && c[0].m < c[1].l ? 0 : ((c[1].l - c[0].u) / ((c[0].m - c[0].u) - (c[1].m - c[1].l)))
            ]

            var C2 = [
                c[1].m >= c[0].m ? 1 : c[1].m < c[0].m && c[1].m < c[0].l ? 0 : ((c[0].l - c[1].u) / ((c[1].m - c[1].u) - (c[0].m - c[0].l))),
                1,
            ]

            return [C1, C2]
        }

        const vectorPriorityResult = vector(sintesisFuzzyDividedResult)

        // console.log("Vektor Prioritas\n" , vectorPriorityResult , "\n\n")

        //defuzifikasi
        var defuzifikasiC51 = Math.min.apply(null, vectorPriorityResult[0])
        var defuzifikasiC52 = Math.min.apply(null, vectorPriorityResult[1])

        // console.log("Ordinat defuzifikasi: \n",defuzifikasiC51, defuzifikasiC52, '\n\n')

        //bobot Fuzzy kriteria
        var totaldefuzzifikasi = defuzifikasiC51 + defuzifikasiC52

        var bobotFuzzy = {
            C51: defuzifikasiC51 / totaldefuzzifikasi,
            C52: defuzifikasiC52 / totaldefuzzifikasi
        }

        // console.log("Bobot Fuzzy", bobotFuzzy)

        return bobotFuzzy
    }

    decisionMaking = () => {
        var bobotFuzzyKriteria = this.getBobotKriteria()
        var bobotFuzzySubKriteriaC1 = this.getBobotSubKriteriaC1()
        var bobotFuzzySubKriteriaC2 = this.getBobotSubKriteriaC2()
        var bobotFuzzySubKriteriaC3 = this.getBobotSubKriteriaC3()
        var bobotFuzzySubKriteriaC4 = this.getBobotSubKriteriaC4()
        var bobotFuzzySubKriteriaC5 = this.getBobotSubKriteriaC5()

        var bobot = {
            C11: bobotFuzzySubKriteriaC1.C11 * bobotFuzzyKriteria.C1,
            C12: bobotFuzzySubKriteriaC1.C12 * bobotFuzzyKriteria.C1,
            C21: bobotFuzzySubKriteriaC2.C21 * bobotFuzzyKriteria.C2,
            C22: bobotFuzzySubKriteriaC2.C22 * bobotFuzzyKriteria.C2,
            C31: bobotFuzzySubKriteriaC3.C31 * bobotFuzzyKriteria.C3,
            C32: bobotFuzzySubKriteriaC3.C32 * bobotFuzzyKriteria.C3,
            C33: bobotFuzzySubKriteriaC3.C33 * bobotFuzzyKriteria.C3,
            C34: bobotFuzzySubKriteriaC3.C34 * bobotFuzzyKriteria.C3,
            C41: bobotFuzzySubKriteriaC4.C41 * bobotFuzzyKriteria.C4,
            C42: bobotFuzzySubKriteriaC4.C42 * bobotFuzzyKriteria.C4,
            C51: bobotFuzzySubKriteriaC5.C51 * bobotFuzzyKriteria.C5,
            C52: bobotFuzzySubKriteriaC5.C52 * bobotFuzzyKriteria.C5
        }

        return bobot
    }
}