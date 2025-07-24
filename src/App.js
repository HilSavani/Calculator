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

  // Price calculation logic (move this OUTSIDE JSX)
  const parsedWeight = parseFloat(metalWeight);
  const isValidWeight = !isNaN(parsedWeight) && parsedWeight > 0;
  const price10Kt = isValidWeight ? (2 * 5200 * parsedWeight / 90).toFixed(2) : '--';
  const price14Kt = isValidWeight ? (2 * 7000 * parsedWeight / 90).toFixed(2) : '--';
  const price18Kt = isValidWeight ? (2 * 8500 * parsedWeight / 90).toFixed(2) : '--';
  const pricePlatinum = isValidWeight ? (2 * 9000 * parsedWeight / 90).toFixed(2) : '--';

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
            {/* Section 1: Metal type */}
            <section className="form-section">
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
          </div>
        </div>
        {/* Right container: Platform and Discount */}
        <div className="right-container">
          {/* Section 1: Platform */}
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
          {/* Section 2: Additional discount */}
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
          {/* Section 3: Price breakdown (output) */}
          {showOutput && (
            <section className="form-section">
              <div className="section-title">Price breakdown:</div>
              <div className="output-box">
                <table className="price-table">
                  <thead>
                    <tr>
                      <th>Metal</th>
                      <th>Price</th>
                      <th>Total (Metal + Center + Side)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>10Kt</td>
                      <td>{price10Kt !== '--' ? `$${price10Kt} USD` : '--'}</td>
                      <td>{getTotalPrice(price10Kt) !== '--' ? `$${getTotalPrice(price10Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>14Kt</td>
                      <td>{price14Kt !== '--' ? `$${price14Kt} USD` : '--'}</td>
                      <td>{getTotalPrice(price14Kt) !== '--' ? `$${getTotalPrice(price14Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>18Kt</td>
                      <td>{price18Kt !== '--' ? `$${price18Kt} USD` : '--'}</td>
                      <td>{getTotalPrice(price18Kt) !== '--' ? `$${getTotalPrice(price18Kt)} USD` : '--'}</td>
                    </tr>
                    <tr>
                      <td>Platinum</td>
                      <td>{pricePlatinum !== '--' ? `$${pricePlatinum} USD` : '--'}</td>
                      <td>{getTotalPrice(pricePlatinum) !== '--' ? `$${getTotalPrice(pricePlatinum)} USD` : '--'}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="actual-center-stone">
                  Actual center stone price: {actualCenterStonePrice !== '--' ? `$${actualCenterStonePrice} USD` : '--'}
                </div>
                <div className="side-stone-price">
                  Side stone price: {sideStonePrice !== '--' ? `$${sideStonePrice} USD` : '--'}
                </div>
              </div>
            </section>
          )}
        </div>
      </form>
      {/* Submit button at the bottom of the page */}
      <label htmlFor="main-content" className="visually-hidden">Submit form</label>
      <button className="submit-btn" type="submit" form="main-content">Submit</button>
    </div>
  );
}

export default App; 