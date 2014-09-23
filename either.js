if(typeof PointFree == undefined) { PointFree = {} }
  
PointFree.Either = (function() {

  var EitherType = Constructor(function(left, right) {
    this.left = left;
    this.right = right;
  });

  //+ notThere :: a -> Bool
  var notThere = function(val) {
    return (val === undefined || val === null);
  }

  // manual curry
  var Either = curry(function(left, right) {
    return (arguments.length < 2) ? function(r) { EitherType(left, r) } : EitherType(left, right);
  });

  EitherType.prototype.map = function(f) {
    if(notThere(this.right)) return Either(this.left, this.right);
    return Either(this.left, f(this.right));
  }

  EitherType.prototype.ap = function(other) {
    if(notThere(this.right)) return Either(this.left, this.right);
    return other.map(this.right);
  }

  var inspect = function(x) {
    if(x==null || x==undefined) return "null";
    return x.inspect ? x.inspect() : x;
  }

  EitherType.prototype.inspect = function() {
    if(notThere(this.right)) return 'Left('+inspect(this.left)+')';
    return 'Right('+inspect(this.right)+')';
  }

  return Either
})();
