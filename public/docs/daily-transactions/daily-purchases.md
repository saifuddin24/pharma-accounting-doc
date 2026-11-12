# Daily Purchases Entry — User Guide

A step-by-step guide for pharmacy store managers, procurement staff, and accountants to record daily medicine/inventory purchases, purchase benefits (discounts/commissions), cash/bank payments, and vendor credit dues (Accounts Payable).

---

## 📌 Page Overview

The **Daily Purchases** page is divided into three sections:

1. **Left Side — Purchase Entry Form**: Where you enter gross purchase amounts, vendor benefits/discounts, payment disbursements, and vendor dues.
2. **Right Side — Live Journal Preview**: Shows real-time accounting entries for both the **Purchase Journal** and **Inventory Journal** before posting.
3. **Bottom — Daily Purchase History**: Lists all purchase entries recorded for the active date with quick reverse options.

---

## 💡 How the Math Works

The system balances your entries automatically using this rule:

$$\text{Net Purchase} = \text{Gross Purchase} - \text{Total Benefits}$$
$$\text{Settled Amount} = \text{Payments (Cash/Bank)} + \text{Vendor Dues}$$
$$\text{Status is Balanced when: } \text{Settled Amount} = \text{Net Purchase}$$

---

## 📝 Step-by-Step Instructions

### Step 1: Verify Date & Enter Gross Purchase

1. **Check Date**: Verify that the active working date at the top of your screen matches the date of the purchase bill/challan.
2. **Gross Purchase**: Enter the total invoice amount before any trade discounts or benefits (e.g. `50000.00`).
3. Notice that **Total Benefit** and **Net Purchase** calculate and update instantly.

---

### Step 2: Add Purchase Benefits (Discounts / Special Commissions)

If the supplier or pharmaceutical company gave you trade benefits, volume discounts, or cash discounts:

1. Under **Purchase Benefits**, click **+ Add benefit**.
2. Click **Select benefit account** and pick the appropriate benefit/discount ledger (e.g., *Purchase Discount*, *Trade Benefit*, or *Special Commission*).
3. Enter the benefit amount.
4. If there are multiple types of benefits, click **+ Add benefit** to add more lines.

> ℹ️ *If you received no benefits or discounts on this purchase, leave this section empty.*

---

### Step 3: Record Payments (How was the bill paid?)

Under the **Payments** section, record the cash, cheque, or bank transfer made to suppliers:

1. In the payment row, click **Select account** and choose where the money was paid from (e.g., *Cash in Hand*, *Petty Cash*, *IBBL Bank*, or *bKash Merchant*).
2. Enter the amount paid from that account.
3. If payment was made from multiple accounts (e.g., part in cash, part via bank transfer):
   - Click **+ Add payment**.
   - Select the second account and enter the corresponding amount.

---

### Step 4: Record Vendor Dues (Credit Purchases / Accounts Payable)

If any part of the purchase was taken on credit (baki) to be paid to the supplier later:

#### A. For an Existing Vendor:
1. Under **Vendor Dues**, click **+ Add row**.
2. Select the vendor from the dropdown (e.g., *Square Pharmaceuticals*, *Beximco*, *Incepta*).
3. Enter the due amount for that vendor.

#### B. For a New Vendor:
1. Click the green button: **+ Add vendor**.
2. A popup window will open. Enter the vendor's name and contact information.
3. Click save. The new vendor is created and automatically placed into your dues list.

> ℹ️ *If the purchase was paid completely in cash/bank with zero credit, leave this section empty.*

---

### Step 5: Add a Narration (Optional)

In the **Narration** box, enter any invoice references or supplier challan numbers (e.g., *"Invoice #SQ-49821 Beximco & Square delivery"*).

---

### Step 6: Verify Balance and Post

Check the status line at the bottom left of the form:

- 🟢 **Balanced**: `Paid + Due` exactly equals `Net Purchase`. You are ready to save!
- 🔴 **Off by [Amount]**: The paid and due amounts do not match the net purchase amount.
  - Review your payments, vendor dues, and benefits to reconcile the difference.

Once balanced:
1. Click the green **Post Daily Purchase** button.
2. A green confirmation banner will appear confirming both the **Purchase Voucher** and **Inventory Movement** have been posted.
3. The form resets automatically, and the new record appears in the history list below.

---

## 🔎 Real-Time Journal Preview

As you type, the right sidebar displays the exact accounting entries that will be posted:

1. **Purchase Journal**:
   - **Debits**: `Purchase` (Gross amount)
   - **Credits**: `Purchase Benefit Accounts`, `Payment Accounts` (Cash/Bank disbursed), `Accounts Payable (AP)` (Vendor Dues).
2. **Inventory Journal**:
   - **Debits**: `Inventory` (Increases stock asset value).
   - **Credits**: `Purchase` (Clears intermediate purchase ledger).

---

## 📋 Daily Purchases History & Actions

At the bottom of the page, view all purchases recorded for the active date:

- Shows vendor breakdowns, paid vs. due amounts, and posting status.
- If a mistake was made on a posted entry, authorized users can click the **Reverse** action on the entry row to safely void/reverse the journal voucher.

---

## ❓ Frequently Asked Questions

### 1. Why is the "Post Daily Purchase" button disabled?
The button will stay gray/disabled if:
- **Gross Purchase** is empty or `0`.
- The status is not **Balanced** (Settled amount does not equal Net Purchase).
- A row has an account/vendor selected but no amount (or amount entered without an account).
- Neither a payment nor a vendor due has been entered.

### 2. What happens if I accidentally refresh the page?
Your inputs (Gross Purchase, Benefits, Payments, Vendor Dues, Narration) are saved automatically in your browser draft storage. Your work will not be lost.

### 3. How do I delete an accidental line?
Click the trash/delete icon on the far right of any benefit, payment, or vendor due row.