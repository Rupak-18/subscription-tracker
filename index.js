import bcrypt from 'bcryptjs';

const hashed = await bcrypt.hash("admin@2003", 10);
console.log(hashed);