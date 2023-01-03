const getTimeDifference = (time) => {
  const now = new Date(Date.now());
  const deadline = new Date(time);
  const diffTime = Math.abs(now - deadline);
  return diffTime;
};

module.exports = {getTimeDifference};
