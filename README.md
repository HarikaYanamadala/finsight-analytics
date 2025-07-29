# FinSight

FinSight is a modern personal finance tracker and analytics dashboard, built with ReactJS and modular components. Visualize and manage your income, spending, and transaction history with a clean, responsive UI and attractive charts.

## Features

* User authentication (login/signup)
* Add, edit, and delete transactions
* Monthly balance calculation and analytics
* Category-wise and time-based spend analysis
* Beautiful charts and responsive dark mode UI
* Modular code structure for easy maintenance

## Tech Stack

* React.js (with functional components and hooks)
* Tailwind CSS for styling and dark mode
* recharts for data visualization
* React Context for authentication state
* (Optional) MongoDB/Express backend for persistent storage

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/finsight.git
   ```

2. Navigate to the project directory:

   ```
   cd finsight/client
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

```
/client
  /src
    /auth
      AuthContext.js
      AuthForm.js
    /components
      Sidebar.js
      MonthSelector.js
      BalanceCard.js
      TransactionTable.js
      AddTransactionModal.js
      SpendingCharts.js
    App.js
    index.js
    index.css
  tailwind.config.js
  postcss.config.js
  package.json
```

## Deployment

You can deploy the app to Netlify, Vercel, or any static site hosting service.

## License

This project is open source and available under the MIT License.
