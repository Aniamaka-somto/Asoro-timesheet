import React from "react";

const SignatureSection = ({ onSubmit }) => {
  return (
    <div className="signature-section">
      <div className="signature-area">
        <label>Signature</label>
        <div className="signature-box">
          <canvas className="signature-canvas"></canvas>
          <button type="button" className="clear-signature">
            Clear
          </button>
        </div>
      </div>

      <p className="signature-note">Sign above to confirm your timesheet</p>

      <button className="submit-btn" onClick={onSubmit}>
        Submit Timesheet
      </button>
    </div>
  );
};

export default SignatureSection;
