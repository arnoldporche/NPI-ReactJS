import React, { Component } from "react";

document.body.style = "background: #eee;";

export default class Home extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="card">
          <div className="card-header">
            National Provider Identifier Standard (NPI)
          </div>
          <div className="card-body">
            <p>
              The National Provider Identifier (NPI) is a Health Insurance
              Portability and Accountability Act (HIPAA) Administrative
              Simplification Standard. The NPI is a unique identification number
              for covered health care providers. Covered health care providers
              and all health plans and health care clearinghouses must use the
              NPIs in the administrative and financial transactions adopted
              under HIPAA. The NPI is a 10-position, intelligence-free numeric
              identifier (10-digit number). This means that the numbers do not
              carry other information about healthcare providers, such as the
              state in which they live or their medical specialty. The NPI must
              be used in lieu of legacy provider identifiers in the HIPAA
              standards transactions.
            </p>
            <p>
              As outlined in the Federal Regulation, The Health Insurance
              Portability and Accountability Act of 1996 (HIPAA), covered
              providers must also share their NPI with other providers, health
              plans, clearinghouses, and any entity that may need it for billing
              purposes.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
