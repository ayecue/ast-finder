```
var myFunction = function(){
    var foo = true;

    module.exports = foo;  
};

var parsed = AstFinder.parse(myFunction.toString()); //parse to ast

var batch = AstFinder.find(parsed,[{
    conditions : {
        'body.operator' : '=',
        'body.left.expression.name' : 'exports'
    },
    type : AstFinder.AST_TYPES.SIMPLE_STATEMENT,
    resultType : AstFinder.SELECTOR.MULTIPLE
}]); // search through ast for exports =


batch.get(0).each(function(node){
    node.$prev.body[key] = new AstFinder.uglify('AST_Return',{
        value : node.body.right
    });
}); //loop through results of the first search requirements and transform if needed

console.log(AstFinder.toString(parsed)); //convert ast back to code string
```