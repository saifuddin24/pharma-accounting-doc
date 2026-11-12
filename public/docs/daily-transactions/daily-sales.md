# 📘 Daily Sales Module — User & Developer Guide

The **Daily Sales** page (`DailySalesPage.jsx`) allows accountants and pharmacy managers to record aggregated daily sales, allocate received amounts across payment accounts, account for transaction fees/charges, assign customer dues (credit sales), calculate profit/loss in real-time, and post balanced double-entry accounting journals alongside Cost of Goods Sold (COGS).

---

## 📌 Table of Contents
1. [Core Accounting Principles](#1-core-accounting-principles)
2. [Interface Overview](#2-interface-overview)
3. [Step-by-Step Data Entry Guide](#3-step-by-step-data-entry-guide)
   - [Step 1: Verify Date & Basic Figures](#step-1-verify-date--basic-figures)
   - [Step 2: Add Collections (Cash / Bank / MFS)](#step-2-add-collections-cash--bank--mfs)
   - [Step 3: Add Payment Gateway / POS Charges](#step-3-add-payment-gateway--pos-charges)
   - [Step 4: Record Customer Dues (Credit Sales)](#step-4-record-customer-dues-credit-sales)
   - [Step 5: Verify Balancing and Preview](#step-5-verify-balancing-and-preview)
   - [Step 6: Post Daily Sales](#step-6-post-daily-sales)
4. [Double-Entry Journal Preview](#4-double-entry-journal-preview)
5. [Viewing Posted Daily Sales History](#5-viewing-posted-daily-sales-history)
6. [Validation & Submission Rules](#6-validation--submission-rules)
7. [Developer & Architecture Reference](#7-developer--architecture-reference)

---

## 1. Core Accounting Principles

The Daily Sales form enforces strict double-entry balance before allowing submission:

$$\text{Net Sales} = \text{Gross Sales} - \text{Discount}$$
$$\text{Collected} + \text{Transaction Charges} = \text{Net Sales}$$
$$\text{Net Profit} = \text{Gross Sales} - \text{Discount} - \text{COGS}$$

- **Credits**: `Sales Revenue` (Credit Gross), `Inventory` (Credit COGS).
- **Debits**: `Payment Accounts` (Cash/Bank/MFS), `Gateway/Charge Accounts`, `Accounts Receivable (AR)` (Customer Dues), `Sales Discount` (Debit), and `Cost of Goods Sold (COGS)` (Debit).

---

## 2. Interface Overview

The layout consists of three primary areas:

1. **Left / Center Column — Data Entry Form**:
   - **Sales & Cost Inputs**: Gross Sales, Discount (if enabled), COGS, and real-time Net Profit / Margin badge.
   - **Collections Section**: Line items for received payments per payment account.
   - **Charges Section**: Line items for payment gateway/POS transaction charges.
   - **Due Payments Section**: Credit sales attributed to specific registered customers.
   - **Narration**: Free-form summary notes for the daily entry.
   - **Status Bar & Submit**: Real-time balance calculator (`Balanced` vs. `Off by X`) and action button.

2. **Right Column — Live Journal Preview**:
   - Dynamic real-time preview showing generated **Debit (Dr)** and **Credit (Cr)** entries for:
     - **Sales Journal**: Breakdown of Sales, Discounts, Payment accounts, Charges, and AR lines.
     - **COGS Journal**: Debit COGS / Credit Inventory.
   - Live **Profit/Loss** indicator with margin percentage.

3. **Bottom Section — Daily Sales History Table**:
   - Tabular list of previously posted sales for the selected date.
   - Click rows to expand details such as customer breakdown and gross profit.

---

## 3. Step-by-Step Data Entry Guide

### Step 1: Verify Date & Basic Figures
1. Ensure the active working date is set via the top navigation / daily operation bar (`useDailyOperation`).
2. In the **Gross Sales** field, enter total pharmacy sales before discounts and deductions.
3. In the **COGS** field, enter the total Cost of Goods Sold for items sold that day.
4. Observe the **Net Profit** and profit percentage badge recalculating dynamically.

### Step 2: Add Collections (Cash / Bank / MFS)
1. Under the **Collections** section, select a payment account from the dropdown (e.g., *Petty Cash*, *Cash in Hand*, *City Bank*, *bKash Merchant*).
2. Enter the exact collected amount into the amount field.
3. To split collections across multiple channels (e.g., part Cash, part Card/MFS), click **+ Add collection** and add additional rows.

### Step 3: Add Payment Gateway / POS Charges
> *Use this if payment channels deduct merchant commission fees (e.g., 1.5% POS charge or bKash fee).*
1. If applicable, click **+ Add transaction charge** under the **Charges** section.
2. Select the designated charge account (e.g., *Bank Charges / Gateway Fees*).
3. Input the fee amount.

### Step 4: Record Customer Dues (Credit Sales)
> *If portions of the sales were issued on credit/due to customers.*
1. Under **Due Payments**, click **+ Add old Customer Due**.
2. Select an existing customer from the search dropdown.
3. Enter the credit amount.
4. If the customer does not exist:
   - Click **+ Add new customer due**.
   - Fill in customer details inside the quick-add popup modal and click save. The new customer will automatically populate as a due line.

### Step 5: Verify Balancing and Preview
1. Check the footer balance status badge:
   - 🟢 **Balanced**: `Collected + Charges + Dues` matches `Gross Sales - Discount`.
   - 🔴 **Off by X.XX**: Sum of receipts does not reconcile with Net Sales. Adjust figures until balanced.
2. Review the right-hand **Sales Journal** and **COGS Journal** preview tables to verify accounts and debit/credit amounts.

### Step 6: Post Daily Sales
1. Ensure the **Post Daily Sales** button is enabled (solid green).
2. Click **Post Daily Sales**.
3. Upon success:
   - A success notification panel (`PostedJournalPanel`) displays the generated journal voucher numbers.
   - The form resets and clears cached inputs.
   - The bottom history list automatically refreshes with the new entry.

---

## 4. Double-Entry Journal Preview

Below is how the system automatically structures the posted vouchers:

### Voucher 1: Sales Journal
| Account / Description | Type | Debit (BDT) | Credit (BDT) |
|---|---|---|---|
| **Cash / Bank Accounts** (from Collections) | Asset (Debit) | Amount | — |
| **Transaction Charges** (from Charges) | Expense (Debit) | Fee | — |
| **Accounts Receivable — Customer** (from Dues) | Asset (Debit) | Due Amount | — |
| **Sales Discount** (if applicable) | Contra Revenue (Debit) | Disc Amount | — |
| **Sales Revenue** | Revenue (Credit) | — | Gross Amount |

### Voucher 2: COGS & Inventory Journal
| Account / Description | Type | Debit (BDT) | Credit (BDT) |
|---|---|---|---|
| **Cost of Goods Sold (COGS)** | Expense (Debit) | COGS Amount | — |
| **Inventory Asset** | Asset (Credit) | — | COGS Amount |

---

## 5. Viewing Posted Daily Sales History

1. Scroll to the **Daily sales on [Selected Date]** table at the bottom of the page.
2. Columns shown:
   - **Journal No.**: The voucher reference code.
   - **Gross, Discount, Net, Due, COGS**: Monetary summary.
   - **Status**: Posting state (e.g., `posted`).
3. **Expand Row Details**:
   - Click any row to expand customer breakdown and calculated gross profit.

---

## 6. Validation & Submission Rules

The **Post Daily Sales** button remains disabled until **all** conditions are met:
1. `gross_sales > 0`.
2. `cogs_amount > 0`.
3. `difference === 0` (Total Collections + Total Charges + Total Dues == Net Sales).
4. No incomplete lines (every row must have both account/contact selected AND a valid amount).
5. At least one valid collection or customer due row exists.
6. Form is not currently in a submitting state (`isSaving === false`).

---

## 7. Developer & Architecture Reference

- **File Path**: `frontend-soulpharma-accounting/src/pages/daily-sales/DailySalesPage.jsx`
- **Key Hooks & State**:
  - `useDailyOperation()`: Provides global date synchronization and spinner control.
  - `useStorageData(key, fallback)`: Caches in-progress draft inputs in session storage so accidental page refreshes do not lose data.
  - `useDailyJournalList()`: Fetches, caches, and handles accordion toggle state for the bottom history table.
- **Backend Endpoints**:
  - `POST /api/daily-sales` via `createDailySale()` in `src/api/dailySales.js`.
  - `GET /api/sales?from_date=...&to_date=...` via `listSales()` in `src/api/sales.js`.
  - `GET /api/chart-of-accounts` via `listChartOfAccounts()`.
  - `GET /api/contacts?type=customer` via `listContacts()`.