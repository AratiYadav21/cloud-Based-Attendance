<?php
session_start();
header("Content-Type: application/json");
include "../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {

    $user = $result->fetch_assoc();

    if ($password == $user['password']) {

        $_SESSION['user'] = $user;

        echo json_encode([
            "status" => "success",
            "message" => "Login successful",
            "user" => $user
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Wrong password"
        ]);
    }

} else {

    echo json_encode([
        "status" => "error",
        "message" => "User not found"
    ]);
}
?>