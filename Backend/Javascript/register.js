document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("registerForm");
    const errorBox = document.getElementById("errorBox");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;

        errorBox.innerText = "";

        const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            errorBox.style.color = "red";
            errorBox.innerText = "Weak password";
            return;
        }

        fetch("backend/api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        })
        .then(res => res.json())
        .then(data => {

            if (data.status === "success") {
                errorBox.style.color = "green";
                errorBox.innerText = data.message;

                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);

            } else {
                errorBox.style.color = "red";
                errorBox.innerText = data.message;
            }

        });

    });

});