curl -X GET "http://localhost:8080/newUser?username=dani&password=qwerty123"
autocannon -c 100 -d 15 'http://localhost:8080/auth-no-bloq?username=dani&password=qwerty123'