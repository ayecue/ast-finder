```
var parsed = AstFinder.parse('function(){var foo = true;}'); //parse to ast

var batch = AstFinder.find(parsed,[{
    type : AstFinder.AST_TYPES.CALL,
    resultType : AstFinder.SELECTOR.SINGLE
},{
    type : AstFinder.AST_TYPES.FUNCTION,
    resultType : AstFinder.SELECTOR.MULTIPLE
},{
    conditions : {
        'start.value' : 'require'
    },
    type : AstFinder.AST_TYPES.CALL,
    resultType : AstFinder.SELECTOR.MULTIPLE
},{
    conditions : {
        'body.left.property' : 'exports',
        'body.operator' : '=',
        'body.left.expression.name' : 'module'
    },
    type : AstFinder.AST_TYPES.SIMPLE_STATEMENT,
    resultType : AstFinder.SELECTOR.MULTIPLE
},{
    conditions : {
        'body.operator' : '=',
        'body.left.expression.name' : 'exports'
    },
    type : AstFinder.AST_TYPES.SIMPLE_STATEMENT,
    resultType : AstFinder.SELECTOR.MULTIPLE
}]); // search through ast


batch.get(0).each(function(node){
    console.log(node);
}); //loop through results of the first search requirements and transform if needed

console.log(AstFinder.toString(parsed)); //convert ast back to code string
```