export const ProgressiveMovementPath = "Mechanics/Kinematics/ProgressiveMovement";

export const G2GConfig = {
    type: 'G2G',
    count: 2,
    taskConfig: {
        questionAxes: ['x','v','a'],
        answersAxes: ['x','v','a'],
        correctAnswersCount: 1,   
        answersCount: 6,
        zeroAaxis: false
    }
}

export const S2GConfig = {
    type: 'S2G',
            count: 2,
            taskConfig: {
                axes: ['x','v','a'],
                doubleGraphChance: 1,
                answersCount: 4,
                zeroAaxis: false
            }
}

export const RSConfig = {
    type: 'RS',
            count: 2,
            taskConfig: {
                isSimple: false,
                axes: ['x','v','a'],
                answersCount: 4,
                segmentsCount: [3, 4],
                zeroAaxis: false
            }
}

export const levelTemplate = {
    isExam: false,
    tasks: [
        G2GConfig,
        S2GConfig,
        RSConfig
    ]
}