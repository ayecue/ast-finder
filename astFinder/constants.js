/*
 * ast-finder
 * https://github.com/ayecue/ast-finder
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

exports.SELECTOR = {
	SINGLE : 4,
	MULTIPLE : 8
};

exports.AST_TYPES = {
	FUNCTION : "Function",
	VAR : "Var",
	VAR_DEF : "VarDef",
	ASSIGN : "Assign",
	CALL : "Call",
	SIMPLE_STATEMENT : "SimpleStatement",
	TOPLEVEL : "Toplevel",
	OBJECT : "Object",
	OBJECT_KEY_VAL : "ObjectKeyVal",
	IF : "If",
	BLOCK_STATEMENT : "BlockStatement",
	SYMBOL_REF : "SymbolRef",
	RETURN : "Return",
	DEFUN: "Defun"
};

exports.GENERATOR = {
	STACK : "node#",
	DEFAULT: 0
};