/*
 * ast-finder
 * https://github.com/ayecue/ast-finder
 *
 * Copyright (c) 2015 "AyeCue" Sören Wehmeier, contributors
 * Licensed under the MIT license.
 */
'use strict';

var Klass = require('node-klass'),
    forEach = Klass.forEach,
    from = Klass.from;

module.exports = Klass.define('AstFinder.Batch',{
    requires: [
        'AstFinder.Batch.Stack',
        'AstFinder.Batch.Selector'
    ],
    constructor : function(selectors){
        this.extend({
            selectors : AstFinder.Batch.Selector.factory(from(selectors)),
            stack : new AstFinder.Batch.Stack()
        });
    },
    evaluate : function(node,property){
        var me = this;

        forEach(me.selectors,function(_,selector){
            if (node.TYPE === selector.getType() && !selector.isComplete() && selector.evaluate(node)) {
                selector.add(node);
            }
        });
    },
    get : function(idx){
        return this.selectors[idx];
    },
    any : function(type){
        var me = this;

        return forEach(me.selectors,function(index,selector){
            if (type === selector.getType()) {
                this.result.push(selector);
            }
        },[]);
    },
    first : function(type){
        return this.any(type).shift();
    },
    last : function(type){
        return this.any(type).pop();
    }
});