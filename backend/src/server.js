import fs from 'fs';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from 'ws';

import { InputError, AccessError, } from './error';
import swaggerDocument from '../swagger.json';
import {
  sessionIdFromPlayerId,
  getEmailFromAuthorization,
  getActiveSessionFromSessionId,
  login,
  logout,
  register,
  save,
  getQuizzesFromAdmin,
  addQuiz,
  startQuiz,
  endSession,
  submitAnswers,
  getResults,
  assertOwnsQuiz,
  getQuiz,
  playerJoin,
  updateQuiz,
  sessionStatus,
  assertOwnsSession,
  removeQuiz,
  sessionResults,
  advanceQuiz,
  getQuestion,
  getAnswers,
  hasStarted,
} from './service';
import { quizQuestionPublicReturn, quizQuestionGetCorrectAnswers } from './custom';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json({ limit: '50mb', }));

const catchErrors = fn => async (req, res) => {
  try {
    await fn(req, res);
    save();
  } catch (err) {
    if (err instanceof InputError) {
      res.status(400).send({ error: err.message, });
    } else if (err instanceof AccessError) {
      res.status(403).send({ error: err.message, });
    } else {
      console.log(err);
      res.status(500).send({ error: 'A system error ocurred', });
    }
  }
};

/***************************************************************
                       Auth Functions
***************************************************************/

const authed = fn => async (req, res) => {
  const email = getEmailFromAuthorization(req.header('Authorization'));
  await fn(req, res, email);
};

app.post('/admin/auth/login', catchErrors(async (req, res) => {
  const { email, password, } = req.body;
  const token = await login(email, password);
  return res.json({ token, });
}));

app.post('/admin/auth/register', catchErrors(async (req, res) => {
  const { email, password, name, } = req.body;
  const token = await register(email, password, name);
  return res.json({ token, });
}));

app.post('/admin/auth/logout', catchErrors(authed(async (req, res, email) => {
  await logout(email);
  return res.json({});
})));

/***************************************************************
                       Quiz Functions
***************************************************************/

app.get('/admin/quiz', catchErrors(authed(async (req, res, email) => {
  return res.json({ quizzes: await getQuizzesFromAdmin(email), });
})));

app.post('/admin/quiz/new', catchErrors(authed(async (req, res, email) => {
  return res.json({ quizId: await addQuiz(req.body.name, email), });
})));

app.get('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
  const { quizid, } = req.params;
  await assertOwnsQuiz(email, quizid);
  return res.json(await getQuiz(quizid));
})));

app.put('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
  const { quizid, } = req.params;
  const { questions, name, thumbnail, } = req.body;
  await assertOwnsQuiz(email, quizid);
  await updateQuiz(quizid, questions, name, thumbnail);
  return res.status(200).send({});
})));

app.delete('/admin/quiz/:quizid', catchErrors(authed(async (req, res, email) => {
  const { quizid, } = req.params;
  await assertOwnsQuiz(email, quizid);
  await removeQuiz(quizid);
  return res.status(200).send({});
})));

app.post('/admin/quiz/:quizid/start', catchErrors(authed(async (req, res, email) => {
  const { quizid, } = req.params;
  await assertOwnsQuiz(email, quizid);
  const sessionid = await startQuiz(quizid);
  return res.status(200).json({ sessionid, });
})));

app.post('/admin/quiz/:sessionid/advance', catchErrors(authed(async (req, res, email) => {
  const { sessionid, } = req.params;
  await assertOwnsSession(email, sessionid);
  const stage = await advanceQuiz(sessionid, session => {
    ws_server.broadcastToSession(client => client.send(JSON.stringify({ type: 'timeup', correct: JSON.stringify(quizQuestionGetCorrectAnswers(session.questions[session.position]).sort()) === JSON.stringify(session.players[client.pid].answers[session.position].answerIds.sort()) })), sessionid)
  })
    .then(data => {
      if (data.question) {
        ws_server.broadcastToSession(client => client.send(JSON.stringify({ type: 'advance', question: data.question })), sessionid)
      } else {
        ws_server.broadcastToSession(client => client.send(JSON.stringify({ type: 'finished' })), sessionid)
      }

      return data.stage
    })
  return res.status(200).json({ stage, });
})));

app.post('/admin/quiz/:sessionid/end', catchErrors(authed(async (req, res, email) => {
  const { sessionid, } = req.params;
  await assertOwnsSession(email, sessionid);
  await endSession(sessionid).then(() => ws_server.broadcastToSession(client => client.send(JSON.stringify({ type: 'finished' })), sessionid));
  return res.status(200).send({});
})));

app.get('/admin/session/:sessionid/status', catchErrors(authed(async (req, res, email) => {
  const { sessionid, } = req.params;
  await assertOwnsSession(email, sessionid);
  return res.status(200).json({ results: await sessionStatus(sessionid), });
})));

app.get('/admin/session/:sessionid/results', catchErrors(authed(async (req, res, email) => {
  const { sessionid, } = req.params;
  await assertOwnsSession(email, sessionid);
  return res.status(200).json({ results: await sessionResults(sessionid), });
})));

/***************************************************************
                       Play Functions
***************************************************************/

app.post('/play/join/:sessionid', catchErrors(async (req, res) => {
  const { sessionid, } = req.params;
  const { name, } = req.body;
  const playerId = await playerJoin(name, sessionid);
  return res.status(200).send({ playerId, });
}));

app.get('/play/:playerid/status', catchErrors(async (req, res) => {
  const { playerid, } = req.params;
  return res.status(200).send({ started: await hasStarted(playerid), });
}));

app.get('/play/:playerid/question', catchErrors(async (req, res) => {
  const { playerid, } = req.params;
  return res.status(200).send({ question: await getQuestion(playerid), });
}));

app.get('/play/:playerid/answer', catchErrors(async (req, res) => {
  const { playerid, } = req.params;
  return res.status(200).send({ answerIds: await getAnswers(playerid), });
}));

app.put('/play/:playerid/answer', catchErrors(async (req, res) => {
  const { playerid, } = req.params;
  const { answerIds, } = req.body;
  await submitAnswers(playerid, answerIds).then(() => {
    ws_server.sendAdmin(JSON.stringify({ type: 'answered'}), sessionIdFromPlayerId(playerid))
  });
  return res.status(200).send({});
}));

app.get('/play/:playerid/results', catchErrors(async (req, res) => {
  const { playerid, } = req.params;
  return res.status(200).send(await getResults(playerid));
}));

/***************************************************************
                       Running Server
***************************************************************/

app.get('/', (req, res) => res.redirect('/docs'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const configData = JSON.parse(fs.readFileSync('../frontend/src/config.json'));
const port = 'BACKEND_PORT' in configData ? configData.BACKEND_PORT : 5000;

const server = app.listen(port, () => {
  console.log(`Backend is now listening on port ${port}!`);
  console.log(`For API docs, navigate to http://localhost:${port}`);
});

const ws_server = new Server({ server: server });

const users = {}
const admins = {}

ws_server.broadcastToSession = (fn, sid) => {
  if (users[sid]) {
    users[sid].forEach(client => fn(client))
  }
}

ws_server.sendAdmin = (msg, sid) => {
  if (admins[sid]) {
    admins[sid].send(msg)
  }
}

ws_server.on('connection', ws => {
  ws.on('message', (msg) => {
      const data = JSON.parse(msg)

      console.log(data)

      switch (data.type) {
        case 'pjoin':
          users[data.session] ? users[data.session].push(ws) : users[data.session] = [ws]
          playerJoin(data.name, data.session)
            .then(pid => {
              ws.send(JSON.stringify({ type: "pjoinr", pid: pid }))
              ws.pid = pid
            })
            ws_server.sendAdmin(JSON.stringify({type: 'joined', name: data.name}), data.session)
          break
        case 'started':
          admins[data.sid] = ws
          break
        case 'preconn':
          let session = {}
          let id = -1

          try {
            id = sessionIdFromPlayerId(data.pid)
            session = getActiveSessionFromSessionId(id)
            ws.pid = id
          } catch {
            ws.send(JSON.stringify({type: 'finished'}))
            break
          }
          
          if (session.answerAvailable) {
            ws.send(JSON.stringify({ type: 'timeup', correct: JSON.stringify(quizQuestionGetCorrectAnswers(session.questions[session.position]).sort()) === JSON.stringify(session.players[playerId].answers[session.position].answerIds.sort()) }))
          } else {
            ws.send(JSON.stringify({ type: 'advance', question: quizQuestionPublicReturn(session.questions[session.position]) }))
          }

          users[id] ? users[id].push(ws) : users[id] = [ws]
          break
      }
  })

  ws.on('close', () => {
    if (ws.pid) {
      delete ws.pid
    }

    for (const p in users) {
      const ind = users[p].findIndex(el => { return el === ws })

      if (ind !== -1) {
        if (users[p].length > 1) {
          users[p].splice(ind, 1)
        } else {
          delete users[p]
        }
      }
    }
  })
})

export default server
