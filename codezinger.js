function diff(arr){
  let abs
  if(arr[0]>arr[arr.length-1]){
    abs = arr[0]-arr[arr.length-1]
  }else{
    abs = arr[arr.length-1]-arr[0]
  }
  return abs
}
console.log(diff([5,4,3,2,1]))