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
test.todo("test6");
test.todo("test7");
test.todo("test8");
test.todo("test9");
test.todo("test10");

const object = {
  car_value: 6614,
  risk_rating: 2,
};

console.log(object);
