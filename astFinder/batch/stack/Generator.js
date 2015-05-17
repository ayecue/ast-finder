/*
 * ast-finder
 * https://github.com/ayecue/ast-finder
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

var Klass = require('node-klass'),
    CONSTANTS = require('../../constants');

module.exports = Klass.define('AstFinder.Batch.Stack.Generator',{
    singleton: true,
    constructor : function(){
        this.callParent([CONSTANTS.GENERATOR.STACK]);
    },
    constructor : function(prefix,index){
		this.extend({
			prefix : CONSTANTS.GENERATOR.STACK,
			index : CONSTANTS.GENERATOR.DEFAULT
		});
	},
	get : function(){
		return this.prefix + (this.index++);
	},
	reset : function(){
		this.index = CONSTANTS.GENERATOR.DEFAULT;
	}
});