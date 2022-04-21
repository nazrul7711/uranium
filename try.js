function sth(arr){
  let res=0
  for(let i=0;i<arr.length;i++){
    let sum = 0
    for(let j=0;j<arr.length;j++){
      if(arr[i]!=arr[j]){
        sum += arr[j]
      }
    }
    console.log(arr[i],sum)
    if(sum%arr[i]==0){
      res+=1
    }
  }
  return res
  
}
console.log(sth([3,10,4,6,7]))
// console.log(57%2)