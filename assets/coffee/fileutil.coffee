class FileUtil
    constructor:(filepath, callback) ->
        console.log "tracemethod:init file open."
        @filepath = filepath
        @callback = callback

    onGetFileSystem:(fileSystem) =>
        console.log "tracemethod:onGetFileSystem."
        readFile = (dirEntry) =>
            dirEntry.getFile "readme.txt",{create: true, exclusive: false}, @onGetFileEntry, @handleError
        fileSystem.root.getDirectory "COLAS", {create: true}, readFile, @handleError

    onGetFileEntry:(fileEntry) =>
        console.log "tracemethod:onGetFileEntry."
        console.log "fillepath:" + fileEntry.fullPath
        fileEntry.createWriter @onGetFileWriter, @handleError
    
    onGetFileWriter:(writer) =>
        console.log "tracemethodonGetFileWriter."
        writer.write "{this:'hogehoge3'}"

    handleError: =>
        console.log "failed file open."

    openfile: =>
        console.log "tracemethod:openfile."
        window.requestFileSystem LocalFileSystem.PERSISTENT, 0, @onGetFileSystem, @handleError
    
    @open = (filepath, callback) =>
        console.log "start file open."
        fileutil = new FileUtil(filepath, callback)
        fileutil.openfile()

window.FileUtil = FileUtil