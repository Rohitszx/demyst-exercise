document.addEventListener("DOMContentLoaded", () => {
    const requestBalanceSheetBtn = document.getElementById("requestBalanceSheet");
    const balanceSheetContainer = document.getElementById("balanceSheetContainer");
    const applicationForm = document.getElementById("applicationForm");
  
    requestBalanceSheetBtn.addEventListener("click", async () => {
      const accountingProvider = document.getElementById("accountingProvider").value;
  
      try {
        const response = await fetch("/fetch_balance_sheet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ accountingProvider })
        });
        const balanceSheet = await response.json();
  
        displayBalanceSheet(balanceSheet);
      } catch (error) {
        console.error("Error fetching balance sheet:", error);
      }
    });
  
    applicationForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const businessName = document.getElementById("businessName").value;
      const loanAmount = parseFloat(document.getElementById("loanAmount").value);
      const accountingProvider = document.getElementById("accountingProvider").value;
  
      try {
        const response = await fetch("/submit_application", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ businessName, loanAmount, accountingProvider })
        });
        const applicationResult = await response.json();
  
        displayApplicationResult(applicationResult);
      } catch (error) {
        console.error("Error submitting application:", error);
      }
    });
  
    function displayBalanceSheet(balanceSheet) {
      balanceSheetContainer.innerHTML = "";
  
      const table = document.createElement("table");
      table.className = "table";
      table.innerHTML = `
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Profit/Loss</th>
            <th>Assets Value</th>
          </tr>
        </thead>
        <tbody>
          <!-- Balance sheet data rows will be added here -->
        </tbody>
      `;
  
      const tbody = table.querySelector("tbody");
      balanceSheet.forEach(entry => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${entry.year}</td>
          <td>${entry.month}</td>
          <td>${entry.profitOrLoss}</td>
          <td>${entry.assetsValue}</td>
        `;
        tbody.appendChild(row);
      });
  
      balanceSheetContainer.appendChild(table);
    }
  
    function displayApplicationResult(applicationResult) {
      const resultDiv = document.createElement("div");
      resultDiv.innerHTML = `
        <h3>Application Result</h3>
        <p>Business Name: ${applicationResult.businessDetails.name}</p>
        <p>Year Established: ${applicationResult.businessDetails.yearEstablished}</p>
        <p>Pre-assessment Value: ${applicationResult.preAssessment}</p>
      `;
  
      balanceSheetContainer.appendChild(resultDiv);
    }
  });
  