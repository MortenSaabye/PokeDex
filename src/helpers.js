export function formatHeight(height){
  let formattedHeight;
  let measure;
  if(height >= 10 ){
    formattedHeight = height / 10;
    measure = "M";
    return formattedHeight.toFixed(1) + measure;
  } else {
    formattedHeight = height * 10;
    measure = "CM";
    return formattedHeight + measure;
  }
}

export function formatWeight(weight) {
  let formattedWeight = weight / 10;
  return `${formattedWeight}KG`;
}