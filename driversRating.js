function rateTheDriver({ claimHistory }) {
  let rating = 2;

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
  }

  return { rating };
}

module.exports = rateTheDriver;
