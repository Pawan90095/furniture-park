
async function testLogin() {
    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'pjat95105@gmail.com',
                password: 'pawan900@'
            })
        });

        const data = await response.json();

        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('SUCCESS: Login API returned 200 OK');
        } else {
            console.log('FAILURE: Login API returned error');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testLogin();
