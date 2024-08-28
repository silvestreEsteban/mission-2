const { convertTextToNum,getCarValue } = require('./Server');

// === unit test case for the function convertTextToNum === //

describe('convertTextToNum', () => {
  test('should convert "model" to the correct number', () => {
    const result = convertTextToNum('model');
    expect(result).toBe(49); // m=13, o=15, d=4, e=5, l=12 => 13+15+4+5+12=49
  });

  test('should convert "car" to the correct number', () => {
    const result = convertTextToNum('car');
    expect(result).toBe(22); // c=3, a=1, r=18 => 3+1+18=22
  });

  test('should convert "abc" to the correct number', () => {
    const result = convertTextToNum('abc');
    expect(result).toBe(); // a=1, b=2, c=3 => 1+2+3=6
  });

  test('should handle empty string', () => {
    const result = convertTextToNum('');
    expect(result).toBe(0); // empty string should return 0
  });

  test('should handle uppercase letters', () => {
    const result = convertTextToNum('MODEL');
    expect(result).toBe(49); // should be case insensitive
  });

  test('should handle mixed case letters', () => {
    const result = convertTextToNum('MoDeL');
    expect(result).toBe(49); // should be case insensitive
  });
});


// ===== Unit test case for function getCarValue ====//




test('Basic functionality', () => {
  expect(GetCarValue('model', 2020)).toBe(13520); // 'model'== 13+15+4+5+12 = 49, 49*100 + 2020 = 13520
});

test('Case insensitivity', () => {
  expect(GetCarValue('Model', 2020)).toBe(13520); // 'Model'== should be treated the same as 'model'
});

test('Non-alphabetic characters', () => {
  expect(GetCarValue('m0d3l', 2020)).toBe(1320); // 'm0d3l'== 13+0+4+3+12 = 32, 32*100 + 2020 = 1320
});

test('Empty car model', () => {
  expect(GetCarValue('', 2020)).toBe(2020); // '' -> 0== 0*100 + 2020 = 2020
});

test('Future year', () => {
  expect(GetCarValue('model', 3000)).toBe(14900); // 'model' == 49, 49*100 + 3000 = 14900
});

test('Very old year', () => {
  expect(GetCarValue('model', 1900)).toBe(5100); // 'model' ==
   49, 49*100 + 1900 = 5100
});

