const ApplyCoupon = (couponCode, currentTotal) => {
    // Your coupon validation and application logic here
  
    // Example: Check if the coupon code is 'DISCOUNT20'
    if (couponCode === 'DISCOUNT20') {
      const discountPercentage = 20;
      const discountAmount = (currentTotal * discountPercentage) / 100;
      const discountedTotal = currentTotal - discountAmount;
  
      return {
        valid: true,
        discountPercentage,
        discountAmount,
        discountedTotal,
      };
    }
  
    // Invalid coupon
    return {
      valid: false,
    };
  };
  