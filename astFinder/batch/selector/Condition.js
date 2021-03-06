/*
 * ast-finder
 * https://github.com/ayecue/ast-finder
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

var Klass = require('node-klass'),
    forEach = Klass.forEach;

module.exports = Klass.define('AstFinder.Batch.Selector.Condition',{
    statics : {
        factory: function(conditions){
            return forEach(conditions,function(namespace,value){
                var klass = Klass.get('AstFinder.Batch.Selector.Condition');
                this.result.push(new klass(namespace,value));
            },[]);
        }
    },
    constructor: function(namespace,value){
        this.extend({
            namespace : namespace,
            value : value
        });
    }
});