const socket = io();

class ioAPI {
    static addTarea(id, tarea) {
        socket.emit('addTarea', { id, tarea });
    }

    static deleteTarea(id) {
        socket.emit('deleteTarea', id);
    }

    static deletePanel(id) {
        socket.emit('deletePanel', id);
    }

    static modifyTarea(id, tarea) {
        socket.emit('modifyTarea', { id, tarea });
    }

    static modifyPanel(id, panel) {
        socket.emit('modifyPanel', { id, panel });
    }
}

window.ioAPI = ioAPI
