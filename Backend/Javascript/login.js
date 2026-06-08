document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");
    const errorBox = document.getElementById("errorBox");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        errorBox.innerText = "";

        const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            errorBox.style.color = "red";
            errorBox.innerText = "Weak password format";
            return;
        }

        fetch("backend/api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.json())
        .then(data => {

            if (data.status === "success") {
                alert("Login Successful");

                if (data.user.role === "admin") {
                    window.location.href = "admin-dashboard.html";
                } else if (data.user.role === "teacher") {
                    window.location.href = "teacher-dashboard.html";
                } else {
                    window.location.href = "student-dashboard.html";
                }

            } else {
                errorBox.style.color = "red";
                errorBox.innerText = data.message;
            }

        });

    });

});