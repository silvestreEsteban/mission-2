test("risk rating can`t be less than 1 or greater than 5", () => {
  expect(risk_rating).toBeGreaterThanOrEqualTo(1);
  expect(risk_rating).toBeLessThanOrEqualTo(5);
});
test("input can only be car_value and risk_rating, otherwise return error", () => {
  expect(input).toContain("car_value" && "risk_rating");
});
test("value of car_value/risk_rating has to be a number", () => {
  expect(typeof car_value).toBe("number");
  expect(typeof risk_rating).toBe("number");
});
test("reward of honda should equal 264.56", () => {
  expect(honda_quote).toEqual(264.56);
});
test("reward of evo should be 1119.75", () => {
  expect(evo_quote).toEqual(1119.75);
});
test("if input a negative value in either option return null", () => {
  expect(carQuote(-1, 10)).toBeNull();
  expect(carQuote(-1, -1)).toBeNull();
  expect(carQuote(10, -1)).toBeNull();
  expect(carQuote(1, 1)).not.toBeNull();
});
test("result of function should be a number", () => {
  expect(typeof carQuote()).toBe("number");
});

const object = {
  car_value: 6614,
  risk_rating: 2,
};

console.log(object);
