module.exports = {
    NoConnectedHashtagsException: NoConnectedHashtagsException,
}

function NoConnectedHashtagsException(message) {
   this.message = message;
   this.name = "NoConnectedHashtagsException";
}


