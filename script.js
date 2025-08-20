document.getElementById('registerForm').addEventListener('submit', async function(e) {
e.preventDefault();
const data = {
name: document.getElementById('name').value,
email: document.getElementById('email').value,
password: document.getElementById('password').value,
gender: document.getElementById('gender').value,
address: document.getElementById('address').value
};


const response = await fetch('http://localhost:5000/register', {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(data)
});
const res = await response.json();
alert(res.message);
});