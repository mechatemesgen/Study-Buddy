const CountUp = ({ value, suffix = "" }) => {
    return <span>{value.toLocaleString()}{suffix}</span>;
  };
  
  export default CountUp;
  