```
require('ast-finder');

function myFunction(module){
    var foo = true;
 
    module.exports = foo;  
};

var myFunctionString = myFunction.toString(); // function body to string
 
var parsed = AstFinder.parse(myFunctionString); //parse to ast
 
var batch = AstFinder.find(parsed,[{
    conditions : {
        'body.operator' : '=',
        'body.left.expression.name' : 'module',
        'body.left.property': 'exports'
    },
    type : AstFinder.AST_TYPES.SIMPLE_STATEMENT,
    resultType : AstFinder.SELECTOR.MULTIPLE
}]); // search through ast for exports =
 
batch.get(0).each(function(node){
    var $scope = node.$prev; // parent function scope

    //replace module.exports with a return
    $scope.body[1] = AstFinder.factory('AST_Return',{
        value : node.body.right
    });
}); //loop through results of the first search requirements and transform if needed
 
console.log(AstFinder.toString(parsed)); //convert ast back to code string
```