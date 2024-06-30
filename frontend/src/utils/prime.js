// get prime number pairs between interval a and b
// https://stackoverflow.com/questions/61700358/generating-random-prime-number

const getRandomNumber = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1) + a);
};

const getPrimeNumbers = (a, b) => {
  const result = Array(b + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 2; i <= Math.sqrt(b + 1); i++) {
    for (let j = i ** 2; j < b + 1; j += i) delete result[j];
  }
  return Object.values(result.slice(Math.max(a, 2)));
};

const getRandomPrimes = (a, b) => {
  const primes = getPrimeNumbers(a, b);
  const rand = getRandomNumber(0, primes.length - 1);
  return [primes[rand], primes[primes.length - rand]];
};

export default getRandomPrimes;
