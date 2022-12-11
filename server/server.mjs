import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Server } from 'socket.io';


import "./config/database.mjs";
import { typeDefs } from './config/config.mjs';

import {
  panelResolver,
  addPanelResolver,
  allPanelesResolver,
  updatePanelResolver,
  deletePanelResolver,
} from './controllers/PanelController.mjs';
import {
  tareaResolver,
  addTareaResolver,
  allTareasResolver,
  updateTareaResolver,
  deleteTareaResolver,
} from './controllers/TareasController.mjs';



// se crean los resolvers
const resolvers = {
  Query: {
    hello: () => 'world',
    panel: panelResolver,
    tarea: tareaResolver,

    allPaneles: allPanelesResolver,
    allTareas: allTareasResolver,
  },

  Mutation: {
    addPanel: addPanelResolver,
    updatePanel: updatePanelResolver,
    deletePanel: deletePanelResolver,

    addTarea: addTareaResolver,
    updateTarea: updateTareaResolver,
    deleteTarea: deleteTareaResolver,
  }
}

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('a user connected');


  // panels
  socket.on('addPanel', (panel) => {
    console.log('addPanel', panel);
    addPanelResolver(null, {
      _id: +(new Date()),
      titulo: panel.title,
      descripcion: panel.description,
    })
  })

  socket.on('deletePanel', (id) => {
    deletePanelResolver(null, { _id: id })
  })


  // tareas
  socket.on('addTarea', ({ id, tarea }) => {
    console.log('addTarea', { id, tarea });
    addTareaResolver(null, {
      _id: id,
      titulo: tarea.title,
      descripcion: tarea.description,
      panelId: tarea.panelId,
    })
  })

  socket.on('deleteTarea', (id) => {
    console.log('deleteTarea', id);
    deleteTareaResolver(null, { _id: id })
  })

  socket.on('modifyTarea', ({ id, tarea }) => {
    console.log('modifyTarea', { id, tarea });
    updateTareaResolver(null, {
      _id: id,
      titulo: tarea.title,
      descripcion: tarea.description,
    })
  })


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

app.use('/', express.static('webapp'));

await new Promise((resolve) => httpServer.listen({ port: 80 }, resolve));
console.log(`🚀 Server ready at http://localhost:80`);
