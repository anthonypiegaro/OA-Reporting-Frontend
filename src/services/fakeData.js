
const data = {
    userData: [
        {
            "name": "Test Athlete",
            "DOB": "01/01/2023",
            "Playing Level": "College",
            "Email": "testathlete@gmail.com",
        }
    ],
    mobilityData: [
        {
            date: "09/17/2023",
            assessments: [
                {
                    name: "Horizontal Adduction Right",
                    score: "Across",
                    passed: true,
                    standard: "Arcoss",
                    description: "Description for the drill goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name:"Horizontal Adduction Left",
                    score: "Short",
                    passed: false,
                    standard: "Across",
                    description: "Description for drill here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                }
            ]
        },
        {
            date: "08/17/2023",
            assessments: [
                {
                    name: "Horizontal Adduction Right",
                    score: "Across",
                    passed: true,
                    standard: "Arcoss",
                    description: "Description for the drill goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name:"Horizontal Adduction Left",
                    score: "Short",
                    passed: false,
                    standard: "Across",
                    description: "Description for drill here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                }
            ]
        },
        {
            date: "07/17/2023",
            assessments: [
                {
                    name: "Horizontal Adduction Right",
                    score: "Across",
                    passed: true,
                    standard: "Arcoss",
                    description: "Description for the drill goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name:"Horizontal Adduction Left",
                    score: "Short",
                    passed: false,
                    standard: "Across",
                    description: "Description for drill here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                },
                {
                    name: "Shoulder External Rotation Right",
                    score: 45,
                    passed: false,
                    standard: 90,
                    description: "Description goes here",
                    drills: [
                        "Drill one as link",
                        "Drill two as link",
                    ]
                }
            ]
        }
    ],
    PhysicalData: [
        {
            date: "09/23/2023",
            assessments: [
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
            ]
        },
        {
            date: "08/23/2023",
            assessments: [
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
                {name: "Push-Ups", score: 45, standard: 25, unit: "reps"},
            ]
        }
    ],
    physicalReports: [
        {
            "date": "",
            "assessments": ""
        },
    ],
    mobilityReports: [
        {},
    ],
    assessmentDetails: {
        "pull-ups": {
            type: "quantitative",
            standard: 10,
            unit: "reps",
            description: "Description goes here",
        },
        "push-ups": {
            type: "quantitative",
            standard: 25,
            unit: "reps",
            description: "Description goes here",
        },
        "lateral jump right": {
            type: "quantitative",
            standard: 80,
            unit: "inches",
            description: "Description goes here",
        },
        "lateral jump left": {
            type: "quantitative",
            standard: 80,
            unit: "inches",
            description: "Description goes here",
        },
        "broad jump": {
            type: "quantitative",
            standard: 100,
            unit: "inches",
            description: "Description goes here",
        },
        "vertical jump": {
            type: "quantitative",
            standard: 20,
            unit: "inches",
            description: "Description goes here",
        },
        "medball toss": {
            type: "quantitative",
            standard: 20,
            unit: "mph",
            description: "Description goes here",
        },
        "pro agility": {
            type: "quantitative",
            standard: 1.5,
            unit: "seconds",
            description: "Description goes here",
        },
        "10 yard acceleration": {
            type: "quantitative",
            standard: 1.5,
            unit: "seconds",
            description: "Description goes here",
        },
        "plate pinch hold right": {
            type: "quantitative",
            standard: 60,
            unit: "seconds",
            description: "Description goes here",
        },
        "plate pinch hold reft": {
            type: "quantitative",
            standard: 60,
            unit: "seconds",
            description: "Description goes here",
        },
        "w hold": {
            type: "quantitative",
            standard: 60,
            unit: "seconds",
            description: "Description goes here",
        },
        "horizontal adduction right": {
            type: "qualitative",
            standard: "across",
            unit: null,
            description: "Description goes here",
        },
        "horizontal adduction left": {
            type: "qualitative",
            standard: "across",
            unit: null,
            description: "Description goes here",
        },
        "shoulder external rotation right": {
            type: "quantitative",
            standard: 90,
            unit: "degrees",
            description: "Description goes here",
        },
        "shoulder internal rotation right": {
            type: "quantitative",
            standard: 90,
            unit: "degrees",
            description: "Description goes here",
        },
        "shoulder external rotation left": {
            type: "quantitative",
            standard: 90,
            unit: "degrees",
            description: "Description goes here",
        },
        "shoulder internal rotation left": {
            type: "quantitative",
            standard: 90,
            unit: "degrees",
            description: "Description goes here",
        },
        "t-spine rotation right": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "t-spine rotation left": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "hip internal rotation right": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "hip internal rotation left": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "hip external rotation right": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "hip external rotation left": {
            type: "quantitative",
            standard: 45,
            unit: "degrees",
            description: "Description goes here",
        },
        "ankle dorsiflexion right": {
            type: "quantitative",
            standard: 35,
            unit: "degrees",
            description: "Description goes here",
        },
        "ankle dorsiflexion left": {
            type: "quantitative",
            standard: 35,
            unit: "degrees",
            description: "Description goes here",
        },
        "overhead squat": {
            type: "qualitative",
            standard: "3",
            unit: null,
            description: "Description goes here",
        },
        "hurdle right": {
            type: "qualitative",
            standard: "3",
            unit: null,
            description: "Description goes here",
        },
        "hurdle left": {
            type: "qualitative",
            standard: "3",
            unit: null,
            description: "Description goes here",
        },
        "aslr right": {
            type: "qualitative",
            standard: "3",
            unit: null,
            description: "Description goes here",
        },
        "aslr left": {
            type: "qualitative",
            standard: "3",
            unit: null,
            description: "Description goes here",
        },
    }
};

export default data;