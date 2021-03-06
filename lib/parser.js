module.exports = (function(){
    /*
     * Generated by PEG.js 0.7.0.
     *
     * http://pegjs.majda.cz/
     */

    function quote(s) {
        /*
         * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
         * string literal except for the closing quote character, backslash,
         * carriage return, line separator, paragraph separator, and line feed.
         * Any character may appear in the form of an escape sequence.
         *
         * For portability, we also escape escape all control and non-ASCII
         * characters. Note that "\0" and "\v" escape sequences are not used
         * because JSHint does not like the first and IE the second.
         */
        return '"' + s
            .replace(/\\/g, '\\\\')  // backslash
            .replace(/"/g, '\\"')    // closing quote character
            .replace(/\x08/g, '\\b') // backspace
            .replace(/\t/g, '\\t')   // horizontal tab
            .replace(/\n/g, '\\n')   // line feed
            .replace(/\f/g, '\\f')   // form feed
            .replace(/\r/g, '\\r')   // carriage return
            .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
            + '"';
    }

    var result = {
        /*
         * Parses the input with a generated parser. If the parsing is successfull,
         * returns a value explicitly or implicitly specified by the grammar from
         * which the parser was generated (see |PEG.buildParser|). If the parsing is
         * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
         */
        parse: function(input, startRule) {
            var parseFunctions = {
                "Joblist": parse_Joblist,
                "Period": parse_Period,
                "ServiceLine": parse_ServiceLine,
                "Service": parse_Service,
                "SlowService": parse_SlowService,
                "FlackyService": parse_FlackyService,
                "UnresponsiveService": parse_UnresponsiveService,
                "MockService": parse_MockService,
                "DropyService": parse_DropyService,
                "Url": parse_Url,
                "integer": parse_integer,
                "insig": parse_insig,
                "sp": parse_sp,
                "crlf": parse_crlf
            };

            if (startRule !== undefined) {
                if (parseFunctions[startRule] === undefined) {
                    throw new Error("Invalid rule name: " + quote(startRule) + ".");
                }
            } else {
                startRule = "Joblist";
            }

            var pos = { offset: 0, line: 1, column: 1, seenCR: false };
            var reportFailures = 0;
            var rightmostFailuresPos = { offset: 0, line: 1, column: 1, seenCR: false };
            var rightmostFailuresExpected = [];

            function padLeft(input, padding, length) {
                var result = input;

                var padLength = length - input.length;
                for (var i = 0; i < padLength; i++) {
                    result = padding + result;
                }

                return result;
            }

            function escape(ch) {
                var charCode = ch.charCodeAt(0);
                var escapeChar;
                var length;

                if (charCode <= 0xFF) {
                    escapeChar = 'x';
                    length = 2;
                } else {
                    escapeChar = 'u';
                    length = 4;
                }

                return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
            }

            function clone(object) {
                var result = {};
                for (var key in object) {
                    result[key] = object[key];
                }
                return result;
            }

            function advance(pos, n) {
                var endOffset = pos.offset + n;

                for (var offset = pos.offset; offset < endOffset; offset++) {
                    var ch = input.charAt(offset);
                    if (ch === "\n") {
                        if (!pos.seenCR) { pos.line++; }
                        pos.column = 1;
                        pos.seenCR = false;
                    } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                        pos.line++;
                        pos.column = 1;
                        pos.seenCR = true;
                    } else {
                        pos.column++;
                        pos.seenCR = false;
                    }
                }

                pos.offset += n;
            }

            function matchFailed(failure) {
                if (pos.offset < rightmostFailuresPos.offset) {
                    return;
                }

                if (pos.offset > rightmostFailuresPos.offset) {
                    rightmostFailuresPos = clone(pos);
                    rightmostFailuresExpected = [];
                }

                rightmostFailuresExpected.push(failure);
            }

            function parse_Joblist() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = [];
                result1 = parse_Period();
                while (result1 !== null) {
                    result0.push(result1);
                    result1 = parse_Period();
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, p) {
                        ret = [];
                        ret = ret.concat(p);
                        return ret;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_Period() {
                var result0, result1, result2, result3, result4, result5;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                if (input.substr(pos.offset, 4) === "time") {
                    result0 = "time";
                    advance(pos, 4);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("\"time\"");
                    }
                }
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        result2 = parse_integer();
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = [];
                                result5 = parse_ServiceLine();
                                while (result5 !== null) {
                                    result4.push(result5);
                                    result5 = parse_ServiceLine();
                                }
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
                                } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, normaltime, c) {
                        services = []
                        services = services.concat(c)
                        return {
                            time: normaltime,
                            cmds: services
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[2], result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_ServiceLine() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Service();
                if (result0 !== null) {
                    result1 = [];
                    result2 = parse_crlf();
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_crlf();
                    }
                    if (result1 !== null) {
                        result0 = [result0, result1];
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, s) {
                        return s;
                    })(pos0.offset, pos0.line, pos0.column, result0[0]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_Service() {
                var result0;

                result0 = parse_SlowService();
                if (result0 === null) {
                    result0 = parse_FlackyService();
                    if (result0 === null) {
                        result0 = parse_UnresponsiveService();
                        if (result0 === null) {
                            result0 = parse_DropyService();
                            if (result0 === null) {
                                result0 = parse_MockService();
                            }
                        }
                    }
                }
                return result0;
            }

            function parse_SlowService() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Url();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 4) === "slow") {
                            result2 = "slow";
                            advance(pos, 4);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"slow\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_integer();
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
                                } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, url, l) {
                        return {
                            service: url,
                            type: 'slow',
                            latency: l
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_FlackyService() {
                var result0, result1, result2, result3, result4, result5, result6;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Url();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 6) === "flacky") {
                            result2 = "flacky";
                            advance(pos, 6);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"flacky\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_integer();
                                if (result4 !== null) {
                                    result5 = parse_insig();
                                    if (result5 !== null) {
                                        result6 = parse_integer();
                                        if (result6 !== null) {
                                            result0 = [result0, result1, result2, result3, result4, result5, result6];
                                        } else {
                                            result0 = null;
                                            pos = clone(pos1);
                                        }
                                    } else {
                                        result0 = null;
                                        pos = clone(pos1);
                                    }
                                } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, url, lo, hi) {
                        return {
                            service: url,
                            type: 'flacky',
                            lo: lo,
                            hi: hi
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[4], result0[6]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_UnresponsiveService() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Url();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 12) === "unresponsive") {
                            result2 = "unresponsive";
                            advance(pos, 12);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"unresponsive\"");
                            }
                        }
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, url) {
                        return {
                            service: url,
                            type: 'unresponsive'
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_MockService() {
                var result0, result1, result2, result3, result4;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Url();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 4) === "mock") {
                            result2 = "mock";
                            advance(pos, 4);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"mock\"");
                            }
                        }
                        if (result2 !== null) {
                            result3 = parse_insig();
                            if (result3 !== null) {
                                result4 = parse_Url();
                                if (result4 !== null) {
                                    result0 = [result0, result1, result2, result3, result4];
                                } else {
                                    result0 = null;
                                    pos = clone(pos1);
                                }
                            } else {
                                result0 = null;
                                pos = clone(pos1);
                            }
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, url, js) {
                        return {
                            service: url,
                            type: 'mock',
                            source: js
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0], result0[4]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_DropyService() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_Url();
                if (result0 !== null) {
                    result1 = parse_insig();
                    if (result1 !== null) {
                        if (input.substr(pos.offset, 4) === "drop") {
                            result2 = "drop";
                            advance(pos, 4);
                        } else {
                            result2 = null;
                            if (reportFailures === 0) {
                                matchFailed("\"drop\"");
                            }
                        }
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, url) {
                        return {
                            service: url,
                            type: 'drop'
                        }
                    })(pos0.offset, pos0.line, pos0.column, result0[0]);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_Url() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                if (/^[a-zA-Z_0-9\/.]/.test(input.charAt(pos.offset))) {
                    result1 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[a-zA-Z_0-9\\/.]");
                    }
                }
                if (result1 !== null) {
                    result0 = [];
                    while (result1 !== null) {
                        result0.push(result1);
                        if (/^[a-zA-Z_0-9\/.]/.test(input.charAt(pos.offset))) {
                            result1 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[a-zA-Z_0-9\\/.]");
                            }
                        }
                    }
                } else {
                    result0 = null;
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, str) {
                        return str.join("");
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_integer() {
                var result0, result1;
                var pos0;

                reportFailures++;
                pos0 = clone(pos);
                if (/^[0-9]/.test(input.charAt(pos.offset))) {
                    result1 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[0-9]");
                    }
                }
                if (result1 !== null) {
                    result0 = [];
                    while (result1 !== null) {
                        result0.push(result1);
                        if (/^[0-9]/.test(input.charAt(pos.offset))) {
                            result1 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[0-9]");
                            }
                        }
                    }
                } else {
                    result0 = null;
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, digits) { return parseInt(digits.join(""), 10); })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                reportFailures--;
                if (reportFailures === 0 && result0 === null) {
                    matchFailed("integer");
                }
                return result0;
            }

            function parse_insig() {
                var result0, result1, result2;
                var pos0, pos1;

                pos0 = clone(pos);
                pos1 = clone(pos);
                result0 = parse_sp();
                if (result0 !== null) {
                    result1 = [];
                    result2 = parse_crlf();
                    while (result2 !== null) {
                        result1.push(result2);
                        result2 = parse_crlf();
                    }
                    if (result1 !== null) {
                        result2 = parse_sp();
                        if (result2 !== null) {
                            result0 = [result0, result1, result2];
                        } else {
                            result0 = null;
                            pos = clone(pos1);
                        }
                    } else {
                        result0 = null;
                        pos = clone(pos1);
                    }
                } else {
                    result0 = null;
                    pos = clone(pos1);
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) { return ''})(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_sp() {
                var result0, result1;
                var pos0;

                pos0 = clone(pos);
                result0 = [];
                if (/^[\t]/.test(input.charAt(pos.offset))) {
                    result1 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result1 = null;
                    if (reportFailures === 0) {
                        matchFailed("[\\t]");
                    }
                }
                if (result1 === null) {
                    if (/^[ ]/.test(input.charAt(pos.offset))) {
                        result1 = input.charAt(pos.offset);
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[ ]");
                        }
                    }
                }
                while (result1 !== null) {
                    result0.push(result1);
                    if (/^[\t]/.test(input.charAt(pos.offset))) {
                        result1 = input.charAt(pos.offset);
                        advance(pos, 1);
                    } else {
                        result1 = null;
                        if (reportFailures === 0) {
                            matchFailed("[\\t]");
                        }
                    }
                    if (result1 === null) {
                        if (/^[ ]/.test(input.charAt(pos.offset))) {
                            result1 = input.charAt(pos.offset);
                            advance(pos, 1);
                        } else {
                            result1 = null;
                            if (reportFailures === 0) {
                                matchFailed("[ ]");
                            }
                        }
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column) {
                        return ''
                    })(pos0.offset, pos0.line, pos0.column);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }

            function parse_crlf() {
                var result0;
                var pos0;

                pos0 = clone(pos);
                if (/^[\r\n]/.test(input.charAt(pos.offset))) {
                    result0 = input.charAt(pos.offset);
                    advance(pos, 1);
                } else {
                    result0 = null;
                    if (reportFailures === 0) {
                        matchFailed("[\\r\\n]");
                    }
                }
                if (result0 !== null) {
                    result0 = (function(offset, line, column, c) {
                        return c;
                    })(pos0.offset, pos0.line, pos0.column, result0);
                }
                if (result0 === null) {
                    pos = clone(pos0);
                }
                return result0;
            }


            function cleanupExpected(expected) {
                expected.sort();

                var lastExpected = null;
                var cleanExpected = [];
                for (var i = 0; i < expected.length; i++) {
                    if (expected[i] !== lastExpected) {
                        cleanExpected.push(expected[i]);
                        lastExpected = expected[i];
                    }
                }
                return cleanExpected;
            }



            var result = parseFunctions[startRule]();

            /*
             * The parser is now in one of the following three states:
             *
             * 1. The parser successfully parsed the whole input.
             *
             *    - |result !== null|
             *    - |pos.offset === input.length|
             *    - |rightmostFailuresExpected| may or may not contain something
             *
             * 2. The parser successfully parsed only a part of the input.
             *
             *    - |result !== null|
             *    - |pos.offset < input.length|
             *    - |rightmostFailuresExpected| may or may not contain something
             *
             * 3. The parser did not successfully parse any part of the input.
             *
             *   - |result === null|
             *   - |pos.offset === 0|
             *   - |rightmostFailuresExpected| contains at least one failure
             *
             * All code following this comment (including called functions) must
             * handle these states.
             */
            if (result === null || pos.offset !== input.length) {
                var offset = Math.max(pos.offset, rightmostFailuresPos.offset);
                var found = offset < input.length ? input.charAt(offset) : null;
                var errorPosition = pos.offset > rightmostFailuresPos.offset ? pos : rightmostFailuresPos;

                throw new this.SyntaxError(
                    cleanupExpected(rightmostFailuresExpected),
                    found,
                    offset,
                    errorPosition.line,
                    errorPosition.column
                );
            }

            return result;
        },

        /* Returns the parser source code. */
        toSource: function() { return this._source; }
    };

    /* Thrown when a parser encounters a syntax error. */

    result.SyntaxError = function(expected, found, offset, line, column) {
        function buildMessage(expected, found) {
            var expectedHumanized, foundHumanized;

            switch (expected.length) {
                case 0:
                    expectedHumanized = "end of input";
                    break;
                case 1:
                    expectedHumanized = expected[0];
                    break;
                default:
                    expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
                        + " or "
                        + expected[expected.length - 1];
            }

            foundHumanized = found ? quote(found) : "end of input";

            return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
        }

        this.name = "SyntaxError";
        this.expected = expected;
        this.found = found;
        this.message = buildMessage(expected, found);
        this.offset = offset;
        this.line = line;
        this.column = column;
    };

    result.SyntaxError.prototype = Error.prototype;

    return result;
})();