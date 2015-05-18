/*
 * ast-finder
 * https://github.com/ayecue/ast-finder
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

var Klass = require('node-klass'),
	uglifyjs = require('uglify-js'),
	typeOf = Klass.typeOf,
	toArray = Klass.toArray,
	CONSTANTS = require('./astFinder/constants');

module.exports = Klass.setSource(__filename).setScope(GLOBAL).define('AstFinder',{

	singleton : true,

	AST_TYPES: CONSTANTS.AST_TYPES,
	SELECTOR: CONSTANTS.SELECTOR,

	requires: [
		'AstFinder.Batch',
		'AstFinder.Processor'
	],

	constructor: function(){
		var me = this,
			$class = this.getKlass(),
			opts = $class.opts = {};

		opts[me.AST_TYPES.FUNCTION] = new AstFinder.Processor('multi',['body']).get();
		opts[me.AST_TYPES.VAR] = new AstFinder.Processor('multi',['definitions']).get();
		opts[me.AST_TYPES.VAR_DEF] = new AstFinder.Processor('single',['value']).get();
		opts[me.AST_TYPES.ASSIGN] = new AstFinder.Processor('single',['right']).get();
		opts[me.AST_TYPES.CALL] = new AstFinder.Processor('advanced',['expression',['args','expression']]).get();
		opts[me.AST_TYPES.SIMPLE_STATEMENT] = new AstFinder.Processor('single',['body']).get();
		opts[me.AST_TYPES.TOPLEVEL] = new AstFinder.Processor('multi',['body']).get();
		opts[me.AST_TYPES.OBJECT] = new AstFinder.Processor('multi',['properties']).get();
		opts[me.AST_TYPES.OBJECT_KEY_VAL] = new AstFinder.Processor('single',['value']).get();
		opts[me.AST_TYPES.IF] = new AstFinder.Processor('single',['body']).get();
		opts[me.AST_TYPES.BLOCK_STATEMENT] = new AstFinder.Processor('multi',['body']).get();
		opts[me.AST_TYPES.RETURN] = new AstFinder.Processor('single',['value']).get();
		opts[me.AST_TYPES.DEFUN] = new AstFinder.Processor('multi',['body']).get();
	},

	findQueue: function(node,batch){
		var me = this,
			$class = me.getKlass();

        if (node instanceof uglifyjs.AST_Node) {
            if (node.TYPE in $class.opts) {
				var idx = batch.getStack().add(node);
                $class.opts[node.TYPE].apply(me,arguments);
                batch.getStack().remove(idx);
            }
        }
	},

	find: function(node,selectors,processor,condition){
		var me = this,
			batch = new AstFinder.Batch(selectors,processor,condition);

		if (typeOf(node) === 'string') {
			node = me.parse(node);
		}

		me.findQueue(node,batch);

		return batch;
	},

	get: function(prop){
		return uglifyjs[prop];
	},

	execute: function(){
		var args = toArray(arguments),
			fn = args.shift();

		return this.get(fn).apply(uglifyjs,args);
	},

	factory: function(){
		var args = toArray(arguments),
			fn = args.shift(),
			prop = this.get(fn),
			newHandle;

		newHandle = function(){
			return prop.apply(this,args);
		};
		newHandle.prototype = prop.prototype;

		return new newHandle();
	},

	parse: function(code){
		var parsed = this.execute('parse',code);

		parsed.figure_out_scope();

		return parsed;
	},

	toString: function(parsed,optimizer){
		var stream = this.execute('OutputStream',optimizer || {});

		parsed.print(stream);

		return stream.toString();
	}
});