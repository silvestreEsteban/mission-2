// // Define risk levels
let rating = 0; // here I declared rating globally, so that I can use it again - I don't know if I will need to yet, but my function was failing whn I only declared the risk levels

const lowRiskDriver = rating <= 1;
const lowModerateRiskDriver = rating > 1 && rating <= 2;
const moderateRiskDriver = rating === 3;
const moderateHighRiskDriver = rating > 3 && rating <= 4;
const highRiskDriver = rating >= 5;

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

// Annual insurance premium based on the rating from my first function
const lowRiskPremium = 1000;
const lowModerateRiskPremium = 1250;
const moderateRiskPremium = 1500;
const moderateHighRiskPremium = 2000;
const highRiskPremium = 2500;

// Function to get the insurance premium based on the driver's risk rating
function getInsurancePremium(rating) {
  if (rating <= 1) {
    return lowRiskPremium;
  } else if (rating > 1 && rating <= 2) {
    return lowModerateRiskPremium;
  } else if (rating === 3) {
    return moderateRiskPremium;
  } else if (rating > 3 && rating <= 4) {
    return moderateHighRiskPremium;
  } else if (rating >= 5) {
    return highRiskPremium;
  } else {
    return "Invalid rating"; // Return an error message for invalid ratings
  }
}

// Example usage
rating = 3; // Set the rating for testing
const premium = getInsurancePremium(rating); // Get the insurance premium based on the rating
console.log(`The annual insurance premium is $${premium}`); // Output the result

(module.exports = rateTheDriver), getInsurancePremium;

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
