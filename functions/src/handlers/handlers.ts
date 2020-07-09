import { Request, Response } from "express";
import { db } from './../config'

export const getLevels = async (req: Request, resp: Response) => {
    db.collection('Subjects').doc(req.params.Subject)
        .collection('Branches').doc(req.params.Branch)
        .collection('Chapters').doc(req.params.Chapter)
        .collection('Topics').doc(req.params.Topic)
        .collection('levels').listDocuments()
        .then(res => {
            let arr: any[] = []
            res.forEach(doc => {
                arr.push(doc.id)
            });
            resp.json(arr)
        })
        .catch(err => {
            resp.status(404).json("[Firebase] Collection not found!")
        })
}

export const getLevel = async (req: Request, resp: Response) => {
    db.collection('Subjects').doc(req.params.Subject)
        .collection('Branches').doc(req.params.Branch)
        .collection('Chapters').doc(req.params.Chapter)
        .collection('Topics').doc(req.params.Topic)
        .collection('levels').doc(req.params.Level)
        .get().then(doc => {
            resp.json(doc.data())
        })
        .catch(err => {
            resp.status(404).json("[Firebase] Cant find document")
        })
}

export const deleteLevel = async (req: Request, resp: Response) => {
    db.collection('Subjects').doc(req.params.Subject)
        .collection('Branches').doc(req.params.Branch)
        .collection('Chapters').doc(req.params.Chapter)
        .collection('Topics').doc(req.params.Topic)
        .collection('levels').doc(req.params.Level)
        .delete().then(doc => {
            resp.json("Deleted successfull.")
        })
        .catch(err => {
            resp.status(404).json("[Firebase] Cant find document")
        })
}

export const addLevel = async (req: Request, resp: Response) => {
    const newLevel = {
        isExam: req.body.isExam,
        tasks: req.body.tasks
    }

    if (newLevel.isExam === undefined || newLevel.tasks === undefined || newLevel.tasks.length === 0) {
        resp.status(501).json("Cant parse request body. " + JSON.stringify(req.body))
        return
    }

    db.collection('Subjects')
        .doc(req.params.Subject).collection('Branches')
        .doc(req.params.Branch).collection('Chapters')
        .doc(req.params.Chapter).collection('Topics')
        .doc(req.params.Topic).collection('levels')
        .add(newLevel).then(doc => {
            resp.json([doc.id, doc])
        })
        .catch(err => {
            resp.status(501).json("[Firebase] Cant add document. " + err)
        })
}

export const setLevel = async (req: Request, resp: Response) => {
    const newLevel = {
        isExam: req.body.isExam,
        tasks: req.body.tasks
    }

    if (newLevel.isExam === undefined || newLevel.tasks === undefined || newLevel.tasks.length === 0) {
        resp.status(501).json("Cant parse request body. " + JSON.stringify(req.body))
        return
    }

    db.collection('Subjects').doc(req.params.Subject)
        .collection('Branches').doc(req.params.Branch)
        .collection('Chapters').doc(req.params.Chapter)
        .collection('Topics').doc(req.params.Topic)
        .collection('levels').doc(req.params.Level)
        .set(newLevel).then(doc => {
            resp.json("Successfull.")
        })
        .catch(err => {
            resp.status(501).json("[Firebase] Cant set document. " + err)
        })
}

export const setLevelsSequences = async (req: Request, resp: Response) => {
    const sequences = {
        ExamsSequence: req.body.ExamsSequence as [],
        ExercisesSequence: req.body.ExercisesSequence as []
    }
    if (sequences.ExamsSequence === undefined || sequences.ExercisesSequence === undefined) {
        resp.status(501).json("Cant parse request body. \r\n" + JSON.stringify(req.body))
        return
    }

    db.collection('Subjects')
        .doc(req.params.Subject).collection('Branches')
        .doc(req.params.Branch).collection('Chapters')
        .doc(req.params.Chapter).collection('Topics')
        .doc(req.params.Topic)
        .set(sequences)
        .then(doc => {
            resp.json("Sequences changed.")
        })
        .catch(err => {
            resp.status(404).json("Cant find document")
        })
}

export const getLevelsSequences = async (req: Request, resp: Response) => {
    let result = {
        ExamsSequence: Array<String>(),
        ExercisesSequence: Array<String>(),
        exercisesList: Array<String>(),
        examsList: Array<String>()
    }

    db.collection('Subjects')
        .doc(req.params.Subject).collection('Branches')
        .doc(req.params.Branch).collection('Chapters')
        .doc(req.params.Chapter).collection('Topics')
        .doc(req.params.Topic)
        .get().then(doc => {
            result.ExamsSequence = doc.data()!!.ExamsSequence || Array<String>()
            result.ExercisesSequence = doc.data()!!.ExercisesSequence || Array<String>()

            db.collection('Subjects')
                .doc(req.params.Subject).collection('Branches')
                .doc(req.params.Branch).collection('Chapters')
                .doc(req.params.Chapter).collection('Topics')
                .doc(req.params.Topic).collection('levels')
                .where('isExam', '==', true).get().then((snapshot) => {
                    snapshot.forEach(doc2 => {
                        result.examsList.push(doc2.id)
                    })

                    db.collection('Subjects')
                    .doc(req.params.Subject).collection('Branches')
                    .doc(req.params.Branch).collection('Chapters')
                    .doc(req.params.Chapter).collection('Topics')
                    .doc(req.params.Topic).collection('levels')
                    .where('isExam', '==', false).get().then((snapshot2) => {
                        snapshot2.forEach(doc3 => {
                            result.exercisesList.push(doc3.id)
                        })
                        
                        resp.json(result)
                    }).catch(err2 => {
                        resp.status(404).json("Cant find levels in topic[2].")
                    })

                }).catch(err => {
                    resp.status(404).json("Cant find levels in topic.")
                })
        })
        .catch(err => {
            resp.status(404).json("Cant find topic.")
        })
}

export const renameLevel = async (req: Request, resp: Response) => {
    const newName = req.body.newName

    if (newName === undefined) {
        resp.status(501).json("Cant parse request body. " + JSON.stringify(req.body))
        return
    }

    var currentLevel: FirebaseFirestore.DocumentData

    db.collection('Subjects').doc(req.params.Subject) // Get current level
        .collection('Branches').doc(req.params.Branch)
        .collection('Chapters').doc(req.params.Chapter)
        .collection('Topics').doc(req.params.Topic)
        .collection('levels').doc(req.params.Level)
        .get().then(doc => {
            currentLevel = doc.data()!!

            db.collection('Subjects').doc(req.params.Subject) // If exist, get level with name renamed to
                .collection('Branches').doc(req.params.Branch)
                .collection('Chapters').doc(req.params.Chapter)
                .collection('Topics').doc(req.params.Topic)
                .collection('levels').doc(newName)
                .get().then(doc1 => {
                    if (doc1.exists)
                        resp.status(501).json("[Firebase] document already exist. name: " + newName) // If exist, return error
                    else {
                        db.collection('Subjects') // Create new level with requested name, and old data
                            .doc(req.params.Subject).collection('Branches')
                            .doc(req.params.Branch).collection('Chapters')
                            .doc(req.params.Chapter).collection('Topics')
                            .doc(req.params.Topic).collection('levels')
                            .doc(newName).set(currentLevel).then(doc2 => {

                                db.collection('Subjects').doc(req.params.Subject) // Delete old
                                    .collection('Branches').doc(req.params.Branch)
                                    .collection('Chapters').doc(req.params.Chapter)
                                    .collection('Topics').doc(req.params.Topic)
                                    .collection('levels').doc(req.params.Level)
                                    .delete().then(doc3 => {
                                        resp.json("Renamed successfull.")
                                    })
                                    .catch(err2 => {
                                        resp.status(404).json("[Firebase][WTF] Cant delete item while renaming. ")
                                    })
                            })
                            .catch(err => {
                                resp.status(501).json("[Firebase] Cant add document. " + err)
                            })
                    }
                }).catch(err1 => {
                    resp.status(501).json("[Firebase] Cant get document with name" + req.params.Level)
                })
        })
        .catch(err3 => {
            resp.status(404).json("[Firebase] Cant find document with name" + req.params.Level)
        })
}
