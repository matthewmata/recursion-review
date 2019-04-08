// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className, node) {
  
  node = node || document;
  let matched = [];

  // check to see if classname matches classname passed in
  if (node.className && node.className.split(' ').includes(className)){
    //if it does then we want to push into our array
    matched.push(node);
  }
  
  // iterate through all the child nodes
  for(let i = 0; i < node.childNodes.length; i++){
    matched = matched.concat(getElementsByClassName(className, node.childNodes[i])); 
  }
  //return array
  return matched; 
  

};
