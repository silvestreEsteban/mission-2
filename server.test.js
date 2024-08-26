const {
  calculateInsuranceQuote,
  fetchData,
  fetchedData,
  monthlyInsuranceQuote,
} = require("./server");

test("risk rating can`t be less than 1", () => {
  const mockCarValue = 10000;
  let mockRiskRating = 0;
  let result = calculateInsuranceQuote(mockCarValue, mockRiskRating);
  expect(result).toBe("incorrect input");
});

test("risk rating can't be greater than 5", () => {
  const mockCarValue = 10000;
  let mockRiskRating = 6;
  let result = calculateInsuranceQuote(mockCarValue, mockRiskRating);
  expect(result).toBe("incorrect input");
});

test("risk rating is between 1 and 5", () => {
  const mockCarValue = 10000;
  let mockRiskRating = 5;
  let result = calculateInsuranceQuote(mockCarValue, mockRiskRating);
  expect(result).toBe((mockCarValue * mockRiskRating) / 100);
});
test("input should be two values, otherwise return error", () => {
  const mockCarValue = 10000;
  let mockRiskRating = 4;
  let result = calculateInsuranceQuote(mockCarValue, mockRiskRating);
  expect(result).toBe((mockCarValue * mockRiskRating) / 100);

  // Testing now with undefined in either input

  result = calculateInsuranceQuote(undefined, mockRiskRating);
  expect(result).toBe("incorrect input");

  result = calculateInsuranceQuote(mockCarValue, undefined);
  expect(result).toBe("incorrect input");
});

test("value of car_value/risk_rating has to be a number", () => {
  let result = calculateInsuranceQuote(5000, 3);
  expect(result).toBe((5000 * 3) / 100);
  result = calculateInsuranceQuote("String", 3);
  expect(result).toBe("incorrect input");
  result = calculateInsuranceQuote(5000, "3");
  expect(result).toBe("incorrect input");
  result = calculateInsuranceQuote("5000", "3");
  expect(result).toBe("incorrect input");
});
test("yearly quote of honda should equal 264.56", () => {
  let hondaQuote = {
    car_value: 6614,
    risk_rating: 4,
  };
  expect(
    calculateInsuranceQuote(hondaQuote.car_value, hondaQuote.risk_rating)
  ).toEqual(264.56);
});
test("reward of evo should be 1119.75", () => {
  let evoQuote = {
    car_value: 22395,
    risk_rating: 5,
  };
  expect(
    calculateInsuranceQuote(evoQuote.car_value, evoQuote.risk_rating)
  ).toEqual(1119.75);
});
test("if input a negative value in either option return null", () => {
  expect(calculateInsuranceQuote(-1, 10)).toBe("incorrect input");
  expect(calculateInsuranceQuote(-1, -1)).toBe("incorrect input");
  expect(calculateInsuranceQuote(10, -1)).toBe("incorrect input");
  expect(calculateInsuranceQuote(1, 1)).not.toBe("incorrect input");
});
test("result of function should be a number", () => {
  expect(typeof calculateInsuranceQuote(5000, 4)).toBe("number");
});

test("input of monthly insurance quote should be a number", () => {
  let mockValue = 144;
  let mockString = "hello";
  let mockBoolean = true;
  let mockNull = null;
  let mockUndefined = undefined;
  expect(monthlyInsuranceQuote(mockValue)).toBe(12);
  expect(monthlyInsuranceQuote(mockString)).toBe("error");
  expect(monthlyInsuranceQuote(mockBoolean)).toBe("error");
  expect(monthlyInsuranceQuote(mockNull)).toBe("error");
  expect(monthlyInsuranceQuote(mockUndefined)).toBe("error");
});

test("input should be divided by 12", () => {
  expect(monthlyInsuranceQuote(120)).toBe(10);
  expect(monthlyInsuranceQuote(12)).toBe(1);
  expect(monthlyInsuranceQuote(264.56)).toBe(22.046666666666667);
});
