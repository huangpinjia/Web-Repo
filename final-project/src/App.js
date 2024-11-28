// App.js
import React from 'react';
import LanguageTranslator from './LanguageTranslator';
import CurrencyConverter from './CurrencyConverter';
import InvoiceGenerator from './InvoiceGenerator';

function App() {
  return (
    <div>
      <LanguageTranslator />
      <CurrencyConverter />
      <InvoiceGenerator />
    </div>
  );
}

export default App;
