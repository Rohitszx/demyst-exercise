const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("static"));

const sampleBalanceSheet = [
  {
    "year": 2020,
    "month": 12,
    "profitOrLoss": 250000,
    "assetsValue": 1234
  },
  {
    "year": 2020,
    "month": 11,
    "profitOrLoss": 1150,
    "assetsValue": 5789
  },
  {
    "year": 2020,
    "month": 10,
    "profitOrLoss": 2500,
    "assetsValue": 22345
  },
  {
    "year": 2020,
    "month": 9,
    "profitOrLoss": -187000,
    "assetsValue": 223452
  }
];

app.post("/submit_application", (req, res) => {
  const { businessName, loanAmount, accountingProvider } = req.body;

  const preAssessment = applyRulesAndSendToDecisionEngine(sampleBalanceSheet, loanAmount);

  const businessDetails = {
    name: businessName,
    yearEstablished: 2020 
  };

  const decisionPayload = {
    businessDetails,
    preAssessment
  };

  setTimeout(() => {
    res.json(decisionPayload);
  }, 1000); 
});

app.post("/fetch_balance_sheet", (req, res) => {
  const accountingProvider = req.body.accountingProvider;
  const balanceSheet = sampleBalanceSheet; 
  res.json(balanceSheet);
});

function applyRulesAndSendToDecisionEngine(balanceSheet, loanAmount) {
  const profitMonths = balanceSheet.filter(entry => entry.profitOrLoss > 0).length;
  const averageAssets = balanceSheet.reduce((total, entry) => total + entry.assetsValue, 0) / balanceSheet.length;

  if (profitMonths >= 12) {
    return "60";
  } else if (averageAssets > loanAmount) {
    return "100";
  } else {
    return "20";
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
