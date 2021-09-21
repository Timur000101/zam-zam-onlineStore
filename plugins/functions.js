export default (ctx, inject) => {
  const numberWithCommas = function(x) {
    if (x) {
      var parts = x.toString().split(" ");
      parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g," ");
      return parts.join(",") + ' тг';
    } else {
      return;
    }
  }
  inject('numberWithCommas', numberWithCommas)
  ctx.$numberWithCommas = numberWithCommas
}