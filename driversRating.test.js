const rateTheDriver = require("./driversRating");

console.log("Running driver rating tests");

describe("The Driver rating", () => {
  it("should return a rating of 5 for high risk drivers", () => {
    const claimHistory =
      "in the last 3 years, the driver has had 5 accidents and 3 claims.";
    const result = rateTheDriver({ claimHistory });
    expect(result.rating).toBe(5);
  });

  it("should return a rating of 1 for low-risk drivers", () => {
    const claimHistory =
      "In the last 3 years, the driver had no accidents and no claims.";
    const result = rateTheDriver({ claimHistory });
    expect(result.rating).toBe(1);
  });

  it("should return a rating of 2 for low/moderate-risk drivers", () => {
    const claimHistory =
      "In the last 3 years, the driver had 1 accidents and 1 claims.";
    const result = rateTheDriver({ claimHistory });
    expect(result.rating).toBe(2);
  });
  it("should return a rating of 3 for moderate-risk drivers", () => {
    const claimHistory =
      "In the last 3 years, the driver had 2 accidents and 1 claims.";
    const result = rateTheDriver({ claimHistory });
    expect(result.rating).toBe(3);
  });
});

// const getInsurancePremium = require("./driversRating");
// describe("Getting the drivers insurance premium", () => {
//   it("should return a rating of low risk premium for a rating of 1", () => {
//     const rating = 1;
//     const expectedPremium = 1000;
//     const result = getInsurancePremium(rating);
//     expect(result).toBe(expectedPremium);
//   });
// });

// This API takes 1 parameters as input in JSON format that has a text field describing the claim history in the last 3 years of a driver requesting for a quote.  The output is a JSON format with the suggested rating of the driver from 1 to 5, 5 being a high risk driver and 1 being a low risk driver.  Here are the example specifications and business rules of conversion:

//should return a rating of 5 for high risk drivers
//should return a rating of 1 for low risk drivers
//should return a rating of 3 for moderate risk drivers

// const insertDriver = require("./driversRating");

// console.log(" checking new user data updates")

// describe("insertDriver data", () => {
//   it("should post the new information to the db", () => {
//     const insertDriver = (userData, callBack)
//     expect(insertID).toBe(1)
//   } )
// })
