const socket = io();

window.deleteTarea = (id) => {
    socket.emit('deleteTarea', id);
}

window.deletePanel = (id) => {
    socket.emit('deletePanel', id);
}

window.modifyTarea = (id, tarea) => {
    socket.emit('modifyTarea', { id, tarea });
}

window.modifyPanel = (id, panel) => {
    socket.emit('modifyPanel', { id, panel });
}
