function rateTheDriver({ claimHistory }) {
  let rating = 5;
  if (
    claimHistory.includes("5 accidents") &&
    claimHistory.includes("3 claims")
  ) {
    rating = 5;
  } else if (
    claimHistory.includes("no accidents") &&
    claimHistory.includes("no claims")
  ) {
    rating = 1;
  } else if (
    claimHistory.includes("1 accidents") &&
    claimHistory.includes("1 claims")
  ) {
    rating = 2;
  } else if (
    claimHistory.includes("2 accidents") &&
    claimHistory.includes("1 claims")
  ) {
    rating = 3;
  }

  return { rating };
}

module.exports = rateTheDriver;

// ********************************************************************************
// This portion is refactoring that has not worked

// const claimsCount = (claimHistory.match(/numberOfAccidents/g) || []).length;
// const accidentsCount = (claimHistory.match(/numberOfClaims/g) || []).length;
/*Count occurrences:
- match(/accident/g): Finds all occurrences of the word "accident" in the claim history.
- || []: Ensures it defaults to an empty array if no matches are found.
- length: Counts the number of occurrences. */

// if (claimsCount == 0 && accidentsCount == 0) return { rating: 1 };
// if (claimsCount <= 1 && accidentsCount <= 1) return { rating: 2 };
// if (
//   claimsCount <= 1 &&
//   claimsCount > 3 &&
//   accidentsCount <= 1 &&
//   accidentsCount > 3
// )
//   return { rating: 3 };
// if (claimsCount)
//   if (claimsCount >= 5 || accidentsCount >= 3) return { rating: 5 };
//********************************************************************************
// ** In the portion commented out between the stars I was trying to post data
// to my db. This was too much/outside the scope of the project at this point
//I did not run it but it did fail the test I wrote for it.

// const NumberOfAccidents = {NumberOfAccidents: 2}
// const NumberOfClaims = {NumberOfClaims: 2}

// const claimHistory = NumberOfAccidents + NumberOfClaims;

// function insertDriver(userData, callBack) {
//   const query =
//     "INSERT INTO selector_table (CustomerFirstName, CustomerLastName, NumberOfAccidents, NumberOfClaims VALUES (?, ?, ?, ?)";
//   const values = [
//     userData.CustomerFirstName,
//     userData.CustomerLastName,
//     userData.NumberOfAccidents,
//     userData.NumberOfClaims,
//   ];

//   app.query(query, values, (error, results, fields) => {
//     if (error) {
//       return callBack(error, null);
//     }
//     callBack(null, results.insertId);
//   });
// }
// const newUser = { name: "John Doe", email: "john.doe@example.com", age: 30 };

// insertDriver(newUser, (error, insertId) => {
//   if (error) {
//     return console.error("An error occurred while inserting data:", error);
//   }

//   console.log("Inserted row ID:", insertId);
// });
//************************************************************************** */
