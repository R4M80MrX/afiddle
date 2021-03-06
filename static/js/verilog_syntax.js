// *****************************************************************************
// Argon Design Ltd. Project P8009 Alogic
// (c) Copyright 2017 Argon Design Ltd. All rights reserved.
//
// Module : afiddle
// Author : Steve Barlow
// $Id:$
//
// DESCRIPTION:
// Verilog language syntax definition for Monaco code highlighting editor.
// *****************************************************************************

// Useful websites:
// https://microsoft.github.io/monaco-editor/monarch.html
// https://www.textpad.com/add-ons/files/syntax/verilog.zip
// http://sutherland-hdl.com/pdfs/verilog_2001_ref_guide.pdf
// http://ee.sut.ac.ir/People/Courses/142/Summary%20of%20Verilog%20Syntax.pdf

// Some things to check !!!
// 1. Is _ allowed in non-tick numbers, e.g. 123_456
// 2. Are escapes allowed in strings. e.g. \x1234

// Tell Standard about globals so it doesn't give lint errors
/* global define */

define({

  monarchDefinition: {
    // Set defaultToken to invalid to see what you do not tokenize yet
    // defaultToken: 'invalid',

    preprocessorKeywords: [
      '`resetall', '`define', '`timescale', '`ifdef', '`else', '`endif',
      '`include', '`signed', '`unsigned', '`celldefine', '`endcelldefine',
      '`default_nettype', '`unconnected_drive', '`nounconnected_drive',
      '`accelerate', '`noaccelerate', '`protect', '`endprotect',
      '`protected', '`endprotected', '`expand_vectornets', '`noexpand_vectornets',
      '`autoexpand_vectornets', '`remove_gatenames', '`noremove_gatenames',
      '`remove_netnames', '`noremove_netnames'
    ],

    keywords: [
      'always', 'and', 'assign', 'attribute', 'begin', 'buf', 'bufif0', 'bufif1',
      'case', 'casex', 'casez', 'cmos', 'deassign', 'default', 'defparam',
      'disable', 'edge', 'else', 'end', 'endattribute', 'endcase', 'endmodule',
      'endfunction', 'endprimitive', 'endspecify', 'endtable', 'endtask',
      'event', 'for', 'force', 'forever', 'fork', 'function', 'highz0', 'highz1',
      'if', 'initial', 'inout', 'input', 'integer', 'join', 'large', 'macromodule',
      'medium', 'module', 'nand', 'negedge', 'nmos', 'nor', 'not', 'notif0',
      'notif1', 'or', 'output', 'parameter', 'pmos', 'posedge', 'primitive',
      'pull0', 'pull1', 'pullup', 'pulldown', 'rcmos', 'reg', 'release', 'repeat',
      'rnmos', 'rpmos', 'rtran', 'rtranif0', 'rtranif1', 'scalared', 'small',
      'specify', 'specparam', 'strength', 'strong0', 'strong1', 'supply0',
      'supply1', 'table', 'task', 'time', 'tran', 'tranif0', 'tranif1', 'tri',
      'tri0', 'tri1', 'triand', 'trior', 'trireg', 'use', 'vectored', 'wait',
      'wand', 'weak0', 'weak1', 'while', 'wire', 'wor', 'xnor', 'xor'
    ],

    builtinFunctionKeywords: [
      '$bitstoreal', '$countdrivers', '$display', '$dumpall', '$dumpfile',
      '$dumpflush', '$dumpoff', '$dumpon', '$dumpvars', '$fclose', '$fdisplay',
      '$finish', '$fmonitor', '$fopen', '$fstrobe', '$fwrite', '$getpattern',
      '$history', '$hold', '$incsave', '$input', '$itor', '$key', '$list',
      '$log', '$monitor', '$monitoroff', '$monitoron', '$nokey', '$nolog',
      '$period', '$printtimescale', '$readmemb', '$readmemh', '$realtime',
      '$realtobits', '$recovery', '$reset', '$reset_count', '$reset_value',
      '$restart', '$rtoi', '$save', '$scale', '$scope', '$setup', '$setuphold',
      '$showscopes', '$showvariables', '$showvars', '$skew', '$sreadmemb',
      '$sreadmemh', '$stime', '$stop', '$strobe', '$time', '$timeformat',
      '$width', '$write', '$fgetc', '$ungetc', '$fgets', '$fscanf',
      '$fread', '$ftell', '$fseek', '$rewind', 'ferror', 'fflush'
    ],

    operators: [
      '!', '~', '&', '|', '^', '~&', '~|', '~^', '+', '-', '*', '/', '%',
      '<<', '>>', '<', '<=', '>', '>=', '==', '!=', '===', '!==', '&&', '||',
      ':', '?', '@', '->', '^~'
    ],

    // define our own brackets as '<' and '>' do not match in Verilog
    brackets: [
      [ '(', ')', 'bracket.parenthesis' ],
      [ '{', '}', 'bracket.curly' ],
      [ '[', ']', 'bracket.square' ]
    ],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*/^%@]+/,

    // C style strings
    escapes: /\\(?:[abfnrtv\\"'?]|[0-7]{1,3}|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for Verilog
    tokenizer: {
      root: [
        // identifiers and keywords
        [ /[A-Za-z_$][A-Za-z0-9_$]*/, { cases: { '@preprocessorKeywords': 'type',
          '@keywords': 'keyword',
          '@builtinFunctionKeywords': 'predefined',
          '@default': 'identifier' } } ],

        // whitespace
        { include: '@whitespace' },

        // delimiters and operators
        [ /[{}()[\]]/, '@brackets' ],
        [ /@symbols/, { cases: { '@operators': 'operator',
          '@default': '' } } ],

        // numbers
        [ /[0-9]*'[sS]?[bodhBODH][0-9a-fA-F_]+/, 'number' ],
        [ /[0-9][0-9_]*/, 'number' ],
        [ /\d*\.\d+([eE][-+]?\d+)?/, 'number.float' ],

        // delimiter: after number because of .\d floats
        [ /[;,.]/, 'delimiter' ],

        // strings
        [ /"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
        [ /"/, { token: 'string.quote', bracket: '@open', next: '@string' } ],

        // attributes
        [ /\(\*/, { token: 'attribute.open', bracket: '@open', next: '@attribute' } ]
      ],

      comment: [
        [ /[^/*]+/, 'comment' ],
        [ /\/\*/, 'comment', '@push' ],    // nested comment
        [ '\\*/', 'comment', '@pop' ],
        [ /[/*]/, 'comment' ]
      ],

      attribute: [
        [ /.+/, 'attribute' ],
        [ /\*\)/, { token: 'attribute.close', bracket: '@close', next: '@pop' } ]
      ],

      string: [
        [ /[^\\"]+/, 'string' ],
        [ /@escapes/, 'string.escape' ],
        [ /\\./, 'string.escape.invalid' ],
        [ /"/, { token: 'string.quote', bracket: '@close', next: '@pop' } ]
      ],

      whitespace: [
        [ /[ \t\r\n]+/, 'white' ],
        [ /\/\*/, 'comment', '@comment' ],
        [ /\/\/.*$/, 'comment' ]
      ]
    }

  } // monarchDefinition

})
