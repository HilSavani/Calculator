import React, { useState } from 'react';
import './App.css';

function App() {
  // DEFAULTS: only placeholders, Etsy checked, Metal type 'All' checked
  const [metalType, setMetalType] = useState('All');
  const [metalWeight, setMetalWeight] = useState('');
  const [weightError, setWeightError] = useState('');
  const [centerStonePrice, setCenterStonePrice] = useState('');
  const [centerStoneError, setCenterStoneError] = useState('');
  const [sideStoneWeight, setSideStoneWeight] = useState('');
  const [sideStoneError, setSideStoneError] = useState('');
  const [platforms, setPlatforms] = useState({ Etsy: true, Shopify: false });
  const [platformError, setPlatformError] = useState('');
  const [additionalDiscount, setAdditionalDiscount] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [showOutput, setShowOutput] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showAllPricing, setShowAllPricing] = useState(false);

  // Price calculation logic (move this OUTSIDE JSX)
  const parsedWeight = parseFloat(metalWeight);
  const isValidWeight = !isNaN(parsedWeight) && parsedWeight > 0;
  const price10Kt = isValidWeight ? (2 * 5200 * parsedWeight / 85).toFixed(2) : '--';
  const price14Kt = isValidWeight ? (2 * 7000 * parsedWeight / 85).toFixed(2) : '--';
  const price18Kt = isValidWeight ? (2 * 8500 * parsedWeight / 85).toFixed(2) : '--';
  const pricePlatinum = isValidWeight ? (2 * 9000 * parsedWeight / 85).toFixed(2) : '--';

  // Helper: Calculate actual center stone price based on input
  function new_price(price) {
    if (price <= 100) return price * 3;
    if (price <= 200) return price * 2.95;
    if (price <= 300) return price * 2.90;
    if (price <= 400) return price * 2.85;
    if (price <= 500) return price * 2.80;
    if (price <= 600) return price * 2.75;
    if (price <= 700) return price * 2.70;
    if (price <= 800) return price * 2.65;
    if (price <= 900) return price * 2.60;
    if (price <= 1000) return price * 2.55;
    if (price <= 1100) return price * 2.50;
    if (price <= 1200) return price * 2.45;
    if (price <= 1300) return price * 2.40;
    if (price <= 1400) return price * 2.35;
    if (price <= 1500) return price * 2.30;
    if (price <= 1600) return price * 2.25;
    if (price <= 1700) return price * 2.20;
    if (price <= 1800) return price * 2.15;
    if (price <= 1900) return price * 2.10;
    if (price <= 2000) return price * 2.05;
    if (price <= 2500) return price * 2.00;
    if (price <= 3000) return price * 1.97;
    if (price <= 3500) return price * 1.94;
    if (price <= 4000) return price * 1.91;
    if (price <= 4500) return price * 1.88;
    if (price <= 5000) return price * 1.85;
    if (price <= 5500) return price * 1.82;
    if (price <= 6000) return price * 1.78;
    if (price <= 6500) return price * 1.75;
    if (price <= 7000) return price * 1.72;
    if (price <= 7500) return price * 1.69;
    if (price <= 8000) return price * 1.66;
    if (price <= 8500) return price * 1.63;
    if (price <= 9000) return price * 1.60;
    if (price <= 9500) return price * 1.57;
    if (price <= 10000) return price * 1.54;
    return price * 1.5;
  }

  // Helper: Calculate actual center stone price for output
  const centerStoneInput = parseFloat(centerStonePrice);
  const actualCenterStonePrice = (!isNaN(centerStoneInput) && centerStoneInput > 0)
    ? new_price(centerStoneInput).toFixed(2)
    : '--';

  // Calculate side stone price
  const sideStoneInput = parseFloat(sideStoneWeight);
  const sideStonePrice = (!isNaN(sideStoneInput) && sideStoneInput > 0)
    ? (sideStoneInput * 250).toFixed(2)
    : '--';

  // Metal weight: only numbers, up to 2 decimals
  const handleWeightChange = (e) => {
    const value = e.target.value;
    if (/^\d*(\.\d{0,2})?$/.test(value)) {
      setMetalWeight(value);
      if (value === '' || parseFloat(value) <= 0) {
        setWeightError('Please enter a value greater than 0');
      } else {
        setWeightError('');
      }
    }
  };
  const handleWeightBlur = () => {
    if (metalWeight === '' || parseFloat(metalWeight) <= 0) {
      setWeightError('Please enter a value greater than 0');
    } else {
      setWeightError('');
    }
  };

  // Center stone price: integer only
  const handleCenterStoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCenterStonePrice(value);
      if (value === '' || parseInt(value, 10) <= 0) {
        setCenterStoneError('Please enter a valid price');
      } else {
        setCenterStoneError('');
      }
    }
  };
  const handleCenterStoneBlur = () => {
    if (centerStonePrice === '' || parseInt(centerStonePrice, 10) <= 0) {
      setCenterStoneError('Please enter a valid price');
    } else {
      setCenterStoneError('');
    }
  };

  // Side stone weight: only numbers, up to 2 decimals
  const handleSideStoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*(\.\d{0,2})?$/.test(value)) {
      setSideStoneWeight(value);
      if (value === '' || parseFloat(value) <= 0) {
        setSideStoneError('Please enter a value greater than 0');
      } else {
        setSideStoneError('');
      }
    }
  };
  const handleSideStoneBlur = () => {
    if (sideStoneWeight === '' || parseFloat(sideStoneWeight, 10) <= 0) {
      setSideStoneError('Please enter a value greater than 0');
    } else {
      setSideStoneError('');
    }
  };

  // Platform checkboxes
  const handlePlatformChange = (e) => {
    const { name, checked } = e.target;
    const updated = { ...platforms, [name]: checked };
    // At least one must be checked
    if (!updated.Etsy && !updated.Shopify) {
      setPlatformError('Select at least one platform');
    } else {
      setPlatformError('');
    }
    setPlatforms(updated);
  };

  // Additional discount: integer only
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAdditionalDiscount(value);
      if (value && parseInt(value, 10) < 0) {
        setDiscountError('Discount cannot be negative');
      } else {
        setDiscountError('');
      }
    }
  };
  const handleDiscountBlur = () => {
    if (additionalDiscount && parseInt(additionalDiscount, 10) < 0) {
      setDiscountError('Discount cannot be negative');
    } else {
      setDiscountError('');
    }
  };

  // Submit handler (mocked)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate required fields
    let valid = true;
    if (metalWeight === '' || isNaN(Number(metalWeight)) || parseFloat(metalWeight) <= 0) {
      setWeightError('Please enter a value greater than 0');
      valid = false;
    }
    if (centerStonePrice === '' || isNaN(Number(centerStonePrice)) || parseInt(centerStonePrice, 10) <= 0) {
      setCenterStoneError('Please enter a valid price');
      valid = false;
    }
    if (sideStoneWeight === '' || isNaN(Number(sideStoneWeight)) || parseFloat(sideStoneWeight) <= 0) {
      setSideStoneError('Please enter a value greater than 0');
      valid = false;
    }
    if (!platforms.Etsy && !platforms.Shopify) {
      setPlatformError('Select at least one platform');
      valid = false;
    }
    if (!valid) return;
    setShowOutput(true);
    // Mocked submit
    // const data = { ... };
    // alert('Submitted!\n' + JSON.stringify(data, null, 2));
  };

  // Helper for red star
  const RequiredStar = () => <span className="required-star">*</span>;

  // Calculate total prices for each metal type, applying discount if present
  function getTotalPrice(metalPrice) {
    const metal = parseFloat(metalPrice);
    const center = parseFloat(actualCenterStonePrice);
    const side = parseFloat(sideStonePrice);
    if (isNaN(metal) || isNaN(center) || isNaN(side)) return '--';
    let total = metal + center + side;
    const discount = parseInt(additionalDiscount, 10);
    if (!isNaN(discount) && discount > 0 && discount < 100) {
      total = (total / (100 - discount)) * 100;
    }
    return total.toFixed(2);
  }

  // Responsive: for mobile, render all left sections, then all right sections, then submit
  return (
    <div className="app-container">
      <h1>Price Calculator</h1>
      <form className="main-content" onSubmit={handleSubmit} id="main-content">
        {/* Left container: Form sections */}
        <div className="left-container">
          <div className="continuous-form">
            {/* Section 1: Metal type - HIDDEN */}
            <section className="form-section hidden-section">
              <div className="section-title">Metal type</div>
              <div className="radio-group inline">
                <label>
                  <input
                    type="radio"
                    name="metalType"
                    value="All"
                    checked={metalType === 'All'}
                    onChange={() => setMetalType('All')}
                  />
                  All
                </label>
                <label>
                  <input
                    type="radio"
                    name="metalType"
                    value="10Kt"
                    checked={metalType === '10Kt'}
                    onChange={() => setMetalType('10Kt')}
                  />
                  10Kt
                </label>
                <label>
                  <input
                    type="radio"
                    name="metalType"
                    value="14Kt"
                    checked={metalType === '14Kt'}
                    onChange={() => setMetalType('14Kt')}
                  />
                  14Kt
                </label>
                <label>
                  <input
                    type="radio"
                    name="metalType"
                    value="18Kt"
                    checked={metalType === '18Kt'}
                    onChange={() => setMetalType('18Kt')}
                  />
                  18Kt
                </label>
                <label>
                  <input
                    type="radio"
                    name="metalType"
                    value="950 Platinum"
                    checked={metalType === '950 Platinum'}
                    onChange={() => setMetalType('950 Platinum')}
                  />
                  950 Platinum
                </label>
              </div>
            </section>
            {/* Section 2: Metal weight */}
            <section className="form-section">
              <div className="section-title">Metal weight <RequiredStar /></div>
              <input
                className={`input-box${weightError ? ' error' : ''}`}
                type="text"
                inputMode="decimal"
                placeholder="in grams"
                value={metalWeight}
                onChange={handleWeightChange}
                onBlur={handleWeightBlur}
                autoComplete="off"
              />
              {weightError && <div className="error-message">{weightError}</div>}
            </section>
            {/* Section 3: Center stone price */}
            <section className="form-section">
              <div className="section-title">Center stone price <RequiredStar /></div>
              <input
                className={`input-box${centerStoneError ? ' error' : ''}`}
                type="text"
                inputMode="numeric"
                placeholder="Enter price from VDB"
                value={centerStonePrice}
                onChange={handleCenterStoneChange}
                onBlur={handleCenterStoneBlur}
                autoComplete="off"
              />
              {centerStoneError && <div className="error-message">{centerStoneError}</div>}
            </section>
            {/* Section 4: Side stone weight */}
            <section className="form-section">
              <div className="section-title">Side stone weight <RequiredStar /></div>
              <input
                className={`input-box${sideStoneError ? ' error' : ''}`}
                type="text"
                inputMode="decimal"
                placeholder="(In carats - e.g. : 0.5)"
                value={sideStoneWeight}
                onChange={handleSideStoneChange}
                onBlur={handleSideStoneBlur}
                autoComplete="off"
              />
              {sideStoneError && <div className="error-message">{sideStoneError}</div>}
            </section>
            {/* Section 5: Platform */}
            <section className="form-section">
              <div className="section-title">Platform <RequiredStar /></div>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="Etsy"
                    checked={platforms.Etsy}
                    onChange={handlePlatformChange}
                  />
                  Etsy
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Shopify"
                    checked={platforms.Shopify}
                    onChange={handlePlatformChange}
                  />
                  Shopify
                </label>
              </div>
              {platformError && <div className="error-message">{platformError}</div>}
            </section>
            {/* Section 6: Additional discount */}
            <section className="form-section">
              <div className="section-title">Additional discount (If applicable)</div>
              <input
                className={`input-box${discountError ? ' error' : ''}`}
                type="text"
                inputMode="numeric"
                placeholder="Discount in % - like 20"
                value={additionalDiscount}
                onChange={handleDiscountChange}
                onBlur={handleDiscountBlur}
                autoComplete="off"
              />
              {discountError && <div className="error-message">{discountError}</div>}
            </section>
            {/* Section 7: Documentation */}
            <section className="form-section">
              <div className="section-title">
                Pricing methodology
                <button 
                  type="button"
                  className="info-button"
                  onClick={() => setShowDocumentation(true)}
                  aria-label="Open pricing documentation"
                >
                  i
                </button>
              </div>
            </section>
          </div>
        </div>
        {/* Right container: Output only */}
        <div className="right-container">
          {/* Section 3: Price breakdown (output) */}
          {showOutput && (
            <section className="form-section">
              <div className="section-title">Price breakdown:</div>
              <div className="output-box">
                <table className="price-table final-product-table">
                  <thead>
                    <tr>
                      <th>Metal</th>
                      <th>Final Product Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10Kt</td>
                      <td>{getTotalPrice(price10Kt) !== '--' ? `$${getTotalPrice(price10Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>14Kt</td>
                      <td>{getTotalPrice(price14Kt) !== '--' ? `$${getTotalPrice(price14Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>18Kt</td>
                      <td>{getTotalPrice(price18Kt) !== '--' ? `$${getTotalPrice(price18Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>Platinum</td>
                      <td>{getTotalPrice(pricePlatinum) !== '--' ? `$${getTotalPrice(pricePlatinum)} USD` : '--'}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="stone-prices-list">
                  <div className="actual-center-stone">Actual center stone price: {actualCenterStonePrice !== '--' ? `$${actualCenterStonePrice} USD` : '--'}</div>
                  <div className="side-stone-price">Side stone price: {sideStonePrice !== '--' ? `$${sideStonePrice} USD` : '--'}</div>
                </div>
                <div className="metal-prices-list">
                  <div className="metal-price-item">10Kt metal price: {price10Kt !== '--' ? `$${price10Kt} USD` : '--'}</div>
                  <div className="metal-price-item">14Kt metal price: {price14Kt !== '--' ? `$${price14Kt} USD` : '--'}</div>
                  <div className="metal-price-item">18Kt metal price: {price18Kt !== '--' ? `$${price18Kt} USD` : '--'}</div>
                  <div className="metal-price-item">Platinum metal price: {pricePlatinum !== '--' ? `$${pricePlatinum} USD` : '--'}</div>
                </div>
              </div>
            </section>
          )}
        </div>
      </form>
      {/* Submit button at the bottom of the page */}
      <label htmlFor="main-content" className="visually-hidden">Submit form</label>
      <button className="submit-btn" type="submit" form="main-content">Submit</button>

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="modal-overlay" onClick={() => setShowDocumentation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Pricing Methodology Documentation</h2>
              <button 
                className="modal-close"
                onClick={() => setShowDocumentation(false)}
                aria-label="Close documentation"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <section className="doc-section">
                <h3>🏗️ Metal Pricing Formula</h3>
                <div className="formula-box">
                  <strong>Metal Price = 2 × (Metal Rate per Gram) × (Weight in Grams) ÷ 85</strong>
                </div>
                <div className="metal-rates">
                  <h4>Current Metal Rates (INR):</h4>
                  <ul>
                    <li><strong>10Kt Gold:</strong> ₹5,200 per gram</li>
                    <li><strong>14Kt Gold:</strong> ₹7,000 per gram</li>
                    <li><strong>18Kt Gold:</strong> ₹8,500 per gram</li>
                    <li><strong>950 Platinum:</strong> ₹9,000 per gram</li>
                  </ul>
                </div>
                <p className="note">Note: The division by 85 converts the INR price to USD for final pricing.</p>
              </section>

              <section className="doc-section">
                <h3>💎 Center Stone Pricing</h3>
                <p>We apply a multiplier to the VDB (Virtual Diamond Bank) price based on the price range:</p>
                <div className="pricing-table-container">
                  <table className="pricing-table">
                    <thead>
                      <tr>
                        <th>VDB Price Range</th>
                        <th>Multiplier</th>
                        <th>Example</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td>$1 - $100</td><td>3.0x</td><td>$50 → $150</td></tr>
                      <tr><td>$101 - $200</td><td>2.95x</td><td>$150 → $442.50</td></tr>
                      <tr><td>$201 - $300</td><td>2.90x</td><td>$250 → $725</td></tr>
                      <tr><td>$301 - $400</td><td>2.85x</td><td>$350 → $997.50</td></tr>
                      <tr><td>$401 - $500</td><td>2.80x</td><td>$450 → $1,260</td></tr>
                      {showAllPricing && (
                        <>
                          <tr><td>$501 - $600</td><td>2.75x</td><td>$550 → $1,512.50</td></tr>
                          <tr><td>$601 - $700</td><td>2.70x</td><td>$650 → $1,755</td></tr>
                          <tr><td>$701 - $800</td><td>2.65x</td><td>$750 → $1,987.50</td></tr>
                          <tr><td>$801 - $900</td><td>2.60x</td><td>$850 → $2,210</td></tr>
                          <tr><td>$901 - $1,000</td><td>2.55x</td><td>$950 → $2,422.50</td></tr>
                          <tr><td>$1,001 - $1,100</td><td>2.50x</td><td>$1,050 → $2,625</td></tr>
                          <tr><td>$1,101 - $1,200</td><td>2.45x</td><td>$1,150 → $2,817.50</td></tr>
                          <tr><td>$1,201 - $1,300</td><td>2.40x</td><td>$1,250 → $3,000</td></tr>
                          <tr><td>$1,301 - $1,400</td><td>2.35x</td><td>$1,350 → $3,172.50</td></tr>
                          <tr><td>$1,401 - $1,500</td><td>2.30x</td><td>$1,450 → $3,335</td></tr>
                          <tr><td>$1,501 - $1,600</td><td>2.25x</td><td>$1,550 → $3,487.50</td></tr>
                          <tr><td>$1,601 - $1,700</td><td>2.20x</td><td>$1,650 → $3,630</td></tr>
                          <tr><td>$1,701 - $1,800</td><td>2.15x</td><td>$1,750 → $3,762.50</td></tr>
                          <tr><td>$1,801 - $1,900</td><td>2.10x</td><td>$1,850 → $3,885</td></tr>
                          <tr><td>$1,901 - $2,000</td><td>2.05x</td><td>$1,950 → $3,997.50</td></tr>
                          <tr><td>$2,001 - $2,500</td><td>2.00x</td><td>$2,250 → $4,500</td></tr>
                          <tr><td>$2,501 - $3,000</td><td>1.97x</td><td>$2,750 → $5,417.50</td></tr>
                          <tr><td>$3,001 - $3,500</td><td>1.94x</td><td>$3,250 → $6,305</td></tr>
                          <tr><td>$3,501 - $4,000</td><td>1.91x</td><td>$3,750 → $7,162.50</td></tr>
                          <tr><td>$4,001 - $4,500</td><td>1.88x</td><td>$4,250 → $7,990</td></tr>
                          <tr><td>$4,501 - $5,000</td><td>1.85x</td><td>$4,750 → $8,787.50</td></tr>
                          <tr><td>$5,001 - $5,500</td><td>1.82x</td><td>$5,250 → $9,555</td></tr>
                          <tr><td>$5,501 - $6,000</td><td>1.78x</td><td>$5,750 → $10,235</td></tr>
                          <tr><td>$6,001 - $6,500</td><td>1.75x</td><td>$6,250 → $10,937.50</td></tr>
                          <tr><td>$6,501 - $7,000</td><td>1.72x</td><td>$6,750 → $11,610</td></tr>
                          <tr><td>$7,001 - $7,500</td><td>1.69x</td><td>$7,250 → $12,252.50</td></tr>
                          <tr><td>$7,501 - $8,000</td><td>1.66x</td><td>$7,750 → $12,865</td></tr>
                          <tr><td>$8,001 - $8,500</td><td>1.63x</td><td>$8,250 → $13,447.50</td></tr>
                          <tr><td>$8,501 - $9,000</td><td>1.60x</td><td>$8,750 → $14,000</td></tr>
                          <tr><td>$9,001 - $9,500</td><td>1.57x</td><td>$9,250 → $14,522.50</td></tr>
                          <tr><td>$9,501 - $10,000</td><td>1.54x</td><td>$9,750 → $15,015</td></tr>
                          <tr><td>$10,000+</td><td>1.50x</td><td>$15,000 → $22,500</td></tr>
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="load-more-container">
                    <button 
                      className="load-more-btn"
                      onClick={() => setShowAllPricing(!showAllPricing)}
                    >
                      {showAllPricing ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                </div>
                <p className="note">Higher value stones have lower multipliers to maintain competitive pricing.</p>
              </section>

              <section className="doc-section">
                <h3>✨ Side Stone Pricing</h3>
                <div className="formula-box">
                  <strong>Side Stone Price = Weight in Carats × $250</strong>
                </div>
                <p>Example: 0.5 carats of side stones = 0.5 × $250 = $125</p>
              </section>

              <section className="doc-section">
                <h3>💰 Final Price Calculation</h3>
                <div className="formula-box">
                  <strong>Total Price = Metal Price + Center Stone Price + Side Stone Price</strong>
                </div>
                <p>If a discount is applied:</p>
                <div className="formula-box">
                  <strong>Final Price = Total Price ÷ (100 - Discount%) × 100</strong>
                </div>
                <p>Example: 20% discount on $1,000 = $1,000 ÷ 80 × 100 = $1,250</p>
              </section>

              <section className="doc-section">
                <h3>📋 Example Calculation</h3>
                <div className="example-calculation">
                  <p><strong>Inputs:</strong></p>
                  <ul>
                    <li>14Kt Gold, 2.5 grams</li>
                    <li>Center stone: $800 VDB price</li>
                    <li>Side stones: 0.3 carats</li>
                    <li>No discount</li>
                  </ul>
                  <p><strong>Calculation:</strong></p>
                  <ul>
                    <li>Metal: 2 × ₹7,000 × 2.5 ÷ 85 = $411.76</li>
                    <li>Center stone: $800 × 2.65 = $2,120</li>
                    <li>Side stones: 0.3 × $250 = $75</li>
                    <li><strong>Total: $411.76 + $2,120 + $75 = $2,606.76</strong></li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 