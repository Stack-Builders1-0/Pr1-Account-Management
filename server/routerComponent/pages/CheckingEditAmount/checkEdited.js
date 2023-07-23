const { compareSync } = require("bcrypt");

class CheckEdited {
  constructor(
    billAmount,
    oldBillAmount,
    discount,
    oldDiscount,
    balance,
    advanceAmount,
    OldAdvanceAmount
  ) {
    this.billAmount = billAmount;
    this.oldBillAmount = oldBillAmount;
    this.discount = discount;
    this.oldDiscount = oldDiscount;
    this.advanceAmount = advanceAmount;
    this.OldAdvanceAmount = OldAdvanceAmount;
    this.balance = balance;
    this.settleAmount = oldBillAmount - oldDiscount - OldAdvanceAmount-balance;

    // console.log(billAmount," ", oldBillAmount," ", discount," ",oldDiscount," ", balance," ", advanceAmount," ", OldAdvanceAmount)
  }

  



  isChangeBillAmount() {
    if (this.billAmount == this.oldBillAmount) return false;
    else return true;
  }

  isChangeDiscount() {
    if (this.discount == this.oldDiscount) return false;
    else return true;
  }

  isChangeAdvanceAmount() {
    if (this.advanceAmount == this.OldAdvanceAmount) return false;
    else return true;
  }

  updateBillAmount() {
    if (this.isChangeBillAmount()) return this.billAmount;
    else return this.oldBillAmount;
  }

  updateDiscount() {
    if (this.isChangeDiscount()) return this.discount;
    else return this.oldDiscount;
  }

  updateAdvanceAmount() {
    if (this.isChangeAdvanceAmount()) return this.advanceAmount;
    else return this.OldAdvanceAmount;
  }

  updateBalance() {
    if (this.isChangeBillAmount) {
      if (this.isChangeDiscount) {
        if (this.isChangeAdvanceAmount) {
            // console.log(this.settleAmount);
          return (
            this.billAmount - this.discount - this.advanceAmount - this.settleAmount
          );
        } else {
          return (
            this.billAmount -
            this.discount -
            this.OldAdvanceAmount -
            this.settleAmount
          );
        }
      } else {
        // discount not change
        if (this.isChangeAdvanceAmount) {
          return (
            this.billAmount -
            this.oldDiscount -
            this.advanceAmount -
            this.settleAmount
          );
        } else {
          return (
            this.billAmount -
            this.oldDiscount -
            this.OldAdvanceAmount -
            this.settleAmount
          );
        }
      }
    } else {
      // Bill amount not change
      if (this.isChangeDiscount) {
        if (this.isChangeAdvanceAmount) {
          return (
            this.oldBillAmount -
            this.discount -
            this.advanceAmount -
            this.settleAmount
          );
        } else {
          return (
            this.oldBillAmount -
            this.discount -
            this.OldAdvanceAmount -
            this.settleAmount
          );
        }
      } else {
        // discount not change
        if (this.isChangeAdvanceAmount) {
          return (
            this.oldBillAmount -
            this.oldDiscount -
            this.advanceAmount -
            this.settleAmount
          );
        } else {
          return (
            this.oldBillAmount -
            this.oldDiscount -
            this.OldAdvanceAmount -
            this.settleAmount
          );
        }
      }
    }
  }
}

module.exports = CheckEdited;

// const obj = new CheckEdited(150500, 100000, 500,0, 80000, 20000, 10000)

// console.log(obj.isChangeBillAmount());
// console.log(obj.isChangeDiscount());
// console.log(obj.isChangeAdvanceAmount());
// console.log(obj.updateBillAmount())
// console.log(obj.updateDiscount());
// console.log(obj.updateAdvanceAmount());
// console.log(obj.updateBalance());