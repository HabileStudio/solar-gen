const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// const rgbaInterval = (r, g, b, a) => {
//   let code = 'rgba(';
//   code += r;
//   code += ', ';
//   code += g;
//   code += ', ';
//   code += b;
//   code += ', ';
//   code += a;
//   code += ')';
//   return code;
// };

const rgbaInterval = (start, end, prop) => {
  let r = parseInt( start[0] + prop * ( (end[0] - start[0]) / 100 ) );
  let g = parseInt( start[1] + prop * ( (end[1] - start[1]) / 100 ) );
  let b = parseInt( start[2] + prop * ( (end[2] - start[2]) / 100 ) );
  let a = start[3] + prop * ( (end[3] - start[3]) / 100 );
  let code = 'rgba(';
  code += r;
  code += ', ';
  code += g;
  code += ', ';
  code += b;
  code += ', ';
  code += a;
  code += ')';
  return code;
}

// let example[start] = [100, 0, 100, 0];
// let example[end] = [255, 50, 255, 1];