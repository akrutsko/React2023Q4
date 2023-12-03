export function getPasswordStrength(password: string) {
  let strength = 0;
  let unique = 0;
  let rules = 0;
  if (password.length >= 8) {
    strength += 10;
    rules += 1;
  }
  if (/[a-z]/.test(password)) {
    strength += 5;
    unique++;
    rules += 1;
  }
  if (/[A-Z]/.test(password)) {
    strength += 5;
    unique++;
    rules += 1;
  }
  if (/\d/.test(password)) {
    strength += 5;
    unique++;
    rules += 1;
  }
  if (/[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~ \\-]/.test(password)) {
    strength += 10;
    unique++;
    rules += 1;
  }
  if (unique >= 5) strength += 5;
  return strength + rules * 10;
}
