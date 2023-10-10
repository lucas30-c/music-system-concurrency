const axios = require('axios');

async function testCase1() {
  try {
    await axios.post('http://localhost:5000/login', { username: 'invalid', password: 'invalid' });
    console.log('Testcase 1: Invalid credentials - N');
  } catch (error) {
    if (error.response) {
      console.log('Testcase 1: Invalid credentials - Y');
    } else {
      console.log('Testcase 1: Invalid credentials - N');
    }
  }
}

async function testCase2() {
  try {
    const response = await axios.post('http://localhost:5000/login', { username: 'finn', password: '1234' });
    if (response.status === 200) {
      console.log('Testcase 2: Valid credentials - Y');
    } else {
      console.log('Testcase 2: Valid credentials - N');
    }
  } catch (error) {
    console.log('Testcase 2: Valid credentials - N');
  }
}

async function main() {
  await testCase1();
  await testCase2();
}

main();
