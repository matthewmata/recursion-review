// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  json = removeSpace(json); 
  //arrays
  if (json[0]==='[' && json[json.length-1] === ']'){
    let splitUp = json.substring(1, json.length - 1); // '0,true,one'
    let result = [];
    if (splitUp.length !== 0) {
      splitUp = splitUp.split(','); 
      for (let i = 0; i < splitUp.length; i++){
        result.push(parseJSON(splitUp[i]));
      }
    }
    return result; 
  } 

  //'{"foo": ""}'
  // "foo": ""
  //'{"a": "b", "c": "d"}'
  //objects
  if (json[0]==='{' && json[json.length-1] === '}'){
    let splitUp = json.substring(1, json.length - 1);
    let keyPair = []; 
    let result = {};
    if (splitUp.length !== 0){
      splitUp = splitUp.split(','); 
      for (let i = 0; i < splitUp.length; i++){
        splitUp[i] = removeSpace(splitUp[i]);
        keyPair.push(splitUp[i].split(':'));
        keyPair[i][1] = parseJSON(keyPair[i][1]);
        result[keyPair[i][0]] = keyPair[i][1];
      }
    }
    return result;
  }
  
  //booleans
  let booleans = {
    true: true,
    false: false,
    null: null
  }

  if (json in booleans) {
    return booleans[json]; 
  }

  //strings
  if (json[0]==='"' && json[json.length-1] === '"') {
    return json.substring(1, json.length-1);
  }

  //numbers
  return numbers(json);

};

//'123'
//'1a2'

// numbers
const numbers = function (str) {
  let integers = ['0','1','2','3','4','5','6','7','8','9'];
  let number = '';
  if (str.length === 0){
    return number;
  } else if (integers.includes(str[0])) {
    number += str[0];
    str = str.slice(1);
    if (str.length !== 0) {
      number += numbers(str);
    }
  } else {
    throw SyntaxError;
  }
  return Number(number);
}

// remove white space
const removeSpace = function (str){
  let result = str;
  if (str[0]===' '){
    result = str.slice(1);
    removeSpace(result);
  }
  return result; 
}

// throw errors
const checkArr = function (str){
  let result = str.split(''); 
  if (result[0] === '['){
    result = result.slice(1);
    if (result[0] === '{'){
      return;
    }
    if (result[0] === ':'){
      throw SyntaxError; 
    }
    if (result[0]){
      return str; 
    }

  }
}
