const classCompactor = (classArray: Array<string>) =>
  classArray.filter((e) => e !== null && e !== '').join(' ');

export default classCompactor;
