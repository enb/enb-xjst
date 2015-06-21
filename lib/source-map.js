module.exports = function (fileSources) {
    var lastBoundary = 0,
        boundaries = [],
        filenames = [],
        sources = [],
        code = '';

    fileSources.forEach(function (fileSource) {
        var source = fileSource.source;

        lastBoundary += source.split('\n').length;

        boundaries.push(lastBoundary);
        filenames.push(fileSource.filename);
        sources.push(source);

        code += '\n' + source;
    });

    function _getRangeIndexByLineNumber(lineNumber) {
        if (lineNumber > lastBoundary + 1) {
            return -1;
        }

        if (lineNumber < 0) {
            return -1;
        }

        for (var i = 0; i < boundaries.length; ++i) {
            if (lineNumber <= boundaries[i] + 1) {
                return i;
            }
        }
    }

    return {
        getOriginal: function (line, column) {
            var rangeIndex = _getRangeIndexByLineNumber(line),
                lowerBoundary = boundaries[rangeIndex - 1] || 0;

            if (rangeIndex !== -1) {
                return {
                    filename: filenames[rangeIndex],
                    source: sources[rangeIndex],
                    line: line - lowerBoundary - 1,
                    column: column
                };
            }
        },
        getCode: function () {
            return code;
        }
    };
};
