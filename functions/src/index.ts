import * as functions from 'firebase-functions'
import * as express from 'express'
import * as cors from 'cors'
import { getLevels, getLevel, addLevel, setLevel, setLevelsSequences, getLevelsSequences, deleteLevel, renameLevel } from './handlers/handlers'
const app = express()
const api = express()
app.use(cors())
app.use('/api/v1', api)


// http://localhost:5000/physmin/europe-west1/admin/api/v1/collection/Mechanics/Kinematics/ProgressiveMovement/Concepts/
api.get('/getLevels/:Subject/:Branch/:Chapter/:Topic', getLevels)
api.get('/getLevel/:Subject/:Branch/:Chapter/:Topic/:Level', getLevel)
api.get('/getLevelsSequences/:Subject/:Branch/:Chapter/:Topic', getLevelsSequences)

api.post('/addLevel/:Subject/:Branch/:Chapter/:Topic', addLevel)
api.post('/setLevel/:Subject/:Branch/:Chapter/:Topic/:Level', setLevel)
api.post('/deleteLevel/:Subject/:Branch/:Chapter/:Topic/:Level', deleteLevel)
api.post('/renameLevel/:Subject/:Branch/:Chapter/:Topic/:Level', renameLevel)
api.post('/setLevelsSequences/:Subject/:Branch/:Chapter/:Topic', setLevelsSequences)

export const admin = functions.region('europe-west1').https.onRequest(app)