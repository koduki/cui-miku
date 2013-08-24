class FileUtil
    if define? and define.amd
        define -> FileUtil
    else if module?.exports
        module.exports = FileUtil
    else
        @FileUtil = FileUtil

    constructor:(filepath, callback) ->
        console.log "tracemethod:init file open."
        @filepath = filepath
        @callback = callback

    onGetFileSystem:(fileSystem) =>
        console.log "tracemethod:onGetFileSystem."
        entries = @filepath.split("/")
        readFile = (dirEntry) =>
            name = entries.shift()

            if (entries.length == 0) 
                dirEntry.getFile name, {create: true, exclusive: false}, @onGetFileEntry, @handleError
            else
                dirEntry.getDirectory name, {create: true}, readFile, @handleError
        readFile(fileSystem.root)

    onGetFileEntry:(fileEntry) =>
        console.log "tracemethod:onGetFileEntry."
        console.log "fillepath:" + fileEntry.fullPath
        fileEntry.createWriter @onGetFileWriter, @handleError
    
    onGetFileWriter:(file) =>
        console.log "tracemethodonGetFileWriter."
        @callback(file)

    handleError: =>
        console.log "failed file open."

    openfile: =>
        console.log "tracemethod:openfile."
        window.requestFileSystem LocalFileSystem.PERSISTENT, 0, @onGetFileSystem, @handleError
    
    @open = (filepath, callback) =>
        console.log "start file open."
        fileutil = new FileUtil(filepath, callback)
        fileutil.openfile()